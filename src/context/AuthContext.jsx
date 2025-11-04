import React, { createContext, useContext, useEffect, useState } from "react";
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as fbSignOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { auth, googleProvider } from "../firebase";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [username, setUsernameState] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
    const res = await signInWithPopup(auth, googleProvider);
    // after sign in, username will be loaded from storage in onAuthStateChanged
    return res;
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
