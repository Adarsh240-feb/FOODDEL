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
} from "firebase/auth";
import { auth, googleProvider } from "../firebase";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [username, setUsernameState] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // If the app returned from a signInWithRedirect flow, getRedirectResult will
    // resolve with the result or an error. We call it here to surface redirect
    // errors in environments (mobile browsers / in-app browsers) where popups
    // are unreliable.
    try {
      getRedirectResult(auth).catch((err) => {
        // sensible to log; the UI can show errors via modal if needed
        console.warn("getRedirectResult error:", err);
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
    // Proactively use redirect when popup-based flows are likely to fail:
    // - inside iframes (window.self !== window.top)
    // - on mobile browsers (popup blockers / UX)
    const isInIframe = typeof window !== "undefined" && window.self !== window.top;
    const isMobile = typeof navigator !== "undefined" && /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    if (isInIframe || isMobile) {
      // Redirect flow is more reliable in these environments
      try {
        await signInWithRedirect(auth, googleProvider);
        return null;
      } catch (err) {
        console.error("signInWithRedirect failed:", err);
        throw err;
      }
    }

    // Otherwise try popup first and fall back to redirect on failure
    try {
      const res = await signInWithPopup(auth, googleProvider);
      return res;
    } catch (err) {
      console.warn("Google popup sign-in failed, falling back to redirect:", err);
      try {
        await signInWithRedirect(auth, googleProvider);
        return null;
      } catch (err2) {
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
    <AuthContext.Provider value={{ user, username, loading, signInWithGoogle, signUpWithEmail, signInWithEmail, signOut, setUsername }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);