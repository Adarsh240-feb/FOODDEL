import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { formatCurrency } from "../utils/format";

const Cart = () => {
  const {
    items,
    isOpen,
    toggleCart,
    removeItem,
    updateQuantity,
    subtotal,
    gst,
    total,
    clearCart,
  } = useCart();

  const [checkout, setCheckout] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", address: "", city: "Prayagraj", zip: "" });

  if (!isOpen) return null;

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    // Here you'd normally send data to server. For now just clear cart and show a simple message.
    console.log("Order placed", { form, items, subtotal, gst, total });
    clearCart();
    setCheckout(false);
    alert("Order placed successfully!\nThank you for your purchase.");
    toggleCart();
  };

  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="flex-1" onClick={toggleCart} />
      <aside className="w-96 bg-white dark:bg-[#111118] text-black dark:text-white p-6 shadow-2xl overflow-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold">Your Cart</h3>
          <button onClick={toggleCart} className="text-sm text-gray-500">Close</button>
        </div>

        {items.length === 0 ? (
          <div className="py-12 text-center text-gray-500">Your cart is empty</div>
        ) : (
          <div>
            <ul className="space-y-4">
              {items.map((it) => (
                <li key={it.id} className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">{it.name}</div>
                    <div className="text-sm text-gray-500">{formatCurrency(it.price)}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min="1"
                      value={it.quantity}
                      onChange={(e) => updateQuantity(it.id, Number(e.target.value))}
                      className="w-16 p-1 text-center border rounded"
                    />
                    <button onClick={() => removeItem(it.id)} className="text-sm text-red-500">Remove</button>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-6 border-t pt-4 space-y-2 text-right">
              <div className="flex justify-between"><span>Subtotal</span><span>{formatCurrency(subtotal)}</span></div>
              <div className="flex justify-between"><span>GST (18%)</span><span>{formatCurrency(gst)}</span></div>
              <div className="flex justify-between font-bold text-lg"><span>Total</span><span>{formatCurrency(total)}</span></div>
            </div>

            <div className="mt-4">
              <button onClick={() => setCheckout(true)} className="w-full bg-orange-500 text-white py-2 rounded">Proceed to Checkout</button>
            </div>
          </div>
        )}

        {checkout && (
          <form onSubmit={handlePlaceOrder} className="mt-6 space-y-3">
            <h4 className="font-semibold">Delivery details</h4>
            <div className="text-sm text-gray-500">Delivery location: Prayagraj, India</div>
            <input name="name" value={form.name} onChange={handleChange} required placeholder="Full name" className="w-full p-2 border rounded" />
            <input name="phone" value={form.phone} onChange={handleChange} required placeholder="Phone number" className="w-full p-2 border rounded" />
            <input name="address" value={form.address} onChange={handleChange} required placeholder="Address" className="w-full p-2 border rounded" />
            <div className="flex gap-2">
              <input name="city" value={form.city} onChange={handleChange} required placeholder="City" className="flex-1 p-2 border rounded" />
              <input name="zip" value={form.zip} onChange={handleChange} required placeholder="ZIP" className="w-24 p-2 border rounded" />
            </div>
            <div className="flex gap-2">
              <button type="submit" className="flex-1 bg-green-600 text-white py-2 rounded">Place Order</button>
              <button type="button" onClick={() => setCheckout(false)} className="flex-1 border py-2 rounded">Cancel</button>
            </div>
          </form>
        )}
      </aside>
    </div>
  );
};
export default Cart;
