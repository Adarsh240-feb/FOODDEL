import React, { createContext, useContext, useEffect, useState } from "react";
import {
  signInWithPopup,
  signInWithRedirect,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as fbSignOut,
  onAuthStateChanged,
  updateProfile,
  getRedirectResult,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import { auth, googleProvider } from "../firebase";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [username, setUsernameState] = useState(null);
  const [loading, setLoading] = useState(true);
  const [redirectError, setRedirectError] = useState(null);
  const [redirectResultSummary, setRedirectResultSummary] = useState(null);

  useEffect(() => {
    // If the app returned from a signInWithRedirect flow, getRedirectResult will
    // resolve with the result or an error. We call it here to surface redirect
    // errors in environments (mobile browsers / in-app browsers) where popups
    // are unreliable.
    // Try to ensure auth persistence is set to local storage (best effort).
    try {
      setPersistence(auth, browserLocalPersistence).catch((e) => {
        console.warn("setPersistence failed:", e);
      });
    } catch (e) {
      // ignore
    }

    try {
      // getRedirectResult resolves when a redirect sign-in completes.
      // Use the result to detect cases where user credentials are returned
      // but onAuthStateChanged hasn't updated yet (or storage is blocked).
      getRedirectResult(auth)
        .then((result) => {
          console.log("getRedirectResult result:", result);
          // summarize result for debugging in UI
          try {
            if (result) {
              const u = result.user;
              const summary = {
                timestamp: new Date().toISOString(),
                hasUser: !!u,
                uid: u?.uid || null,
                email: u?.email || null,
                displayName: u?.displayName || null,
                providerId: u?.providerData?.[0]?.providerId || null,
                credentialProviderId: result?.credential?.providerId || null,
              };
              setRedirectResultSummary(summary);
              // persist briefly so you can inspect after redirect if needed
              try { localStorage.setItem('ff_last_redirect_summary', JSON.stringify(summary)); } catch(e){}
            }
          } catch (e) {
            console.warn('error creating redirect summary', e);
          }

          if (result && result.user) {
            // set the user immediately as a best-effort so UI updates.
            try {
              setUser(result.user);
              const key = `ff_username_${result.user.uid}`;
              const stored = localStorage.getItem(key);
              setUsernameState(stored || result.user.displayName || null);
            } catch (e) {
              console.warn("error setting user from redirect result:", e);
            }
          } else {
            // if redirect returned no user, surface a message for debugging
            console.warn("getRedirectResult returned no user");
          }
        })
        .catch((err) => {
          // log and surface a user-friendly message for mobile redirect failures
          console.warn("getRedirectResult error:", err);
          try {
            setRedirectError(err?.message ? String(err.message) : String(err));
          } catch (e) {}
        });
    } catch (e) {
      // ignore
    }

    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      if (u) {
        const key = `ff_username_${u.uid}`;
        const stored = localStorage.getItem(key);
        setUsernameState(stored || u.displayName || null);
      } else {
        setUsernameState(null);
      }
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const signInWithGoogle = async () => {
    // Try popup first everywhere (including mobile/tablet). If popup is
    // blocked or fails (common in some in-app browsers), fall back to
    // signInWithRedirect.
    try {
      // Ensure persistence is set to local before starting sign-in (best-effort).
      try {
        await setPersistence(auth, browserLocalPersistence);
      } catch (e) {
        console.warn("setPersistence before sign-in failed:", e);
      }

      const res = await signInWithPopup(auth, googleProvider);
      return res;
    } catch (err) {
      // Common reasons: popup blocked, environment doesn't support popups
      console.warn("Google popup sign-in failed (will try redirect):", err);
      try {
        // Keep a brief debug note so UI can explain the fallback path
        try {
          setRedirectError?.(`Popup sign-in failed: ${err?.message || err}`);
        } catch (e) {}

        await signInWithRedirect(auth, googleProvider);
        return null;
      } catch (err2) {
        console.error("signInWithRedirect also failed:", err2);
        throw err2;
      }
    }
  };

  const signUpWithEmail = async (email, password, displayName) => {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    if (displayName) {
      await updateProfile(res.user, { displayName });
      const key = `ff_username_${res.user.uid}`;
      localStorage.setItem(key, displayName);
      setUsernameState(displayName);
    }
    return res;
  };

  const signInWithEmail = async (email, password) => {
    const res = await signInWithEmailAndPassword(auth, email, password);
    return res;
  };

  const signOut = async () => {
    await fbSignOut(auth);
    // local username remains in storage for next login
  };

  const setUsername = (name) => {
    if (!user) return;
    const key = `ff_username_${user.uid}`;
    localStorage.setItem(key, name);
    setUsernameState(name);
    // also update firebase profile displayName if possible
    try {
      updateProfile(user, { displayName: name });
    } catch (e) {
      // ignore
    }
  };

  return (
    <AuthContext.Provider value={{ user, username, loading, redirectError, setRedirectError, signInWithGoogle, signUpWithEmail, signInWithEmail, signOut, setUsername }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);