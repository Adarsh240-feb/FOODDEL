import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { collection, query, where, orderBy, onSnapshot } from "firebase/firestore";
import { formatCurrency } from "../utils/format";

const OrderHistory = ({ open, onClose }) => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [indexRequired, setIndexRequired] = useState(false);

  useEffect(() => {
    if (!open) return;
    if (!user) return;

    let unsub = () => {};
    // primary query: uid equality + orderBy createdAt desc (may require a composite index)
    const primary = query(collection(db, "orders"), where("uid", "==", user.uid), orderBy("createdAt", "desc"));
    const fallback = query(collection(db, "orders"), where("uid", "==", user.uid));

    const setupPrimary = () => {
      unsub = onSnapshot(
        primary,
        (snap) => {
          const arr = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
          setOrders(arr);
        },
        (err) => {
          console.error("Order history listener error:", err);
          // If Firestore complains about missing index, fallback to where-only query
          if (String(err).toLowerCase().includes("requires an index") || String(err).toLowerCase().includes("missing or insufficient permissions") === false) {
            setIndexRequired(true);
            // teardown and attach fallback
            try {
              unsub && unsub();
            } catch (e) {}
            // fallback: query without orderBy and sort client-side
            unsub = onSnapshot(fallback, (snap2) => {
              const arr2 = snap2.docs.map((d) => ({ id: d.id, ...d.data() }));
              // client-side sort by createdAt if present
              arr2.sort((a, b) => {
                const ta = a.createdAt && a.createdAt.toDate ? a.createdAt.toDate().getTime() : 0;
                const tb = b.createdAt && b.createdAt.toDate ? b.createdAt.toDate().getTime() : 0;
                return tb - ta;
              });
              setOrders(arr2);
            }, (err2) => {
              console.error("Fallback order listener error:", err2);
              setOrders([]);
            });
          } else {
            setOrders([]);
          }
        }
      );
    };

    setupPrimary();

    return () => {
      try { unsub && unsub(); } catch (e) {}
    };
  }, [open, user]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-60 flex">
      <div className="flex-1" onClick={onClose} />
      <aside className="w-[720px] max-w-full bg-white dark:bg-[#0b1220] text-black dark:text-white p-6 shadow-2xl overflow-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold">My Orders</h3>
          <button onClick={onClose} className="text-sm text-gray-500">Close</button>
        </div>
        {/* {indexRequired && (
          <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 text-yellow-800 rounded text-sm">
            Firestore index required for this query. Orders are shown using a fallback but may be unsorted.
            To fix this, create a composite index for collection <code>orders</code> with fields <strong>uid (ASC)</strong> and <strong>createdAt (DESC)</strong> in the Firebase Console &gt; Firestore &gt; Indexes.
            After the index builds (a minute or two) reload the page.
          </div>
        )} */}
        {!user && <div className="py-8 text-center text-gray-500">Please login to see your orders.</div>}
        {user && orders.length === 0 && <div className="py-8 text-center text-gray-500">You have no previous orders.</div>}
        {user && orders.length > 0 && (
          <div className="space-y-4">
            {orders.map((o) => (
              <div key={o.id} className="border rounded p-3">
                <div className="flex justify-between items-center mb-2">
                  <div className="font-medium">Order #{o.id}</div>
                  <div className="text-sm text-gray-500">{o.createdAt?.toDate ? new Date(o.createdAt.toDate()).toLocaleString() : "Pending"}</div>
                </div>
                <div className="text-sm text-gray-700 dark:text-gray-300 mb-2">Total: {formatCurrency(o.total)}</div>
                <ul className="text-sm space-y-1">
                  {o.items?.map((it, idx) => (
                    <li key={idx} className="flex justify-between">
                      <span>{it.name} × {it.quantity}</span>
                      <span>{formatCurrency((Number(it.price) || 0) * (Number(it.quantity) || 0))}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </aside>
    </div>
  );
};

export default OrderHistory;
