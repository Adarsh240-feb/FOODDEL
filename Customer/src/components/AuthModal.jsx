import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import Logo from "./Logo";

const AuthModal = ({ open, onClose }) => {
  const { user, username, loading, signInWithGoogle, signUpWithEmail, signInWithEmail, signOut, setUsername } = useAuth();
  const [mode, setMode] = useState("login"); // login or signup
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!open) {
      setEmail("");
      setPassword("");
      setName("");
      setError("");
      setMode("login");
    }
  }, [open]);

  if (!open) return null;

  const mapError = (e) => {
    if (!e) return "";
    const code = e.code || "";
    if (code === "auth/configuration-not-found") {
      return (
        "Firebase configuration error: OAuth configuration not found.\n" +
        "Enable Google sign-in in Firebase Console and add your domain (e.g. localhost) under Authorized domains."
      );
    }
    if (code === "auth/popup-blocked") {
      return "Popup blocked. Allow popups or use the email sign-in option.";
    }
    if (e.message) return e.message;
    return String(e);
  };

  const handleGoogle = async () => {
    try {
      await signInWithGoogle();
      onClose();
    } catch (e) {
      setError(mapError(e));
    }
  };

  const handleSignup = async () => {
    setError("");
    if (!email || !password || !name) return setError("Please fill all fields");
    try {
      await signUpWithEmail(email, password, name);
      onClose();
    } catch (e) {
      setError(mapError(e));
    }
  };

  const handleLogin = async () => {
    setError("");
    if (!email || !password) return setError("Please fill email and password");
    try {
      await signInWithEmail(email, password);
      onClose();
    } catch (e) {
      setError(mapError(e));
    }
  };

  const handleSetUsername = () => {
    if (!name) return setError("Please enter a username");
    setUsername(name);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      className="fixed inset-0 z-40 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md bg-gray-900 rounded-2xl shadow-2xl p-8 text-white"
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 text-gray-400 hover:text-white"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="flex flex-col items-center gap-4">
          <div className="p-1 rounded-full bg-gradient-to-br from-orange-400 to-orange-600">
            <div className="bg-gray-900 p-3 rounded-full">
              <Logo />
            </div>
          </div>

          <h2 className="text-2xl font-semibold">{mode === "login" ? "Log In to your account" : "Create your account"}</h2>
        </div>

        <div className="mt-6">
          {user && !username ? (
            <div>
              <p className="mb-3 text-gray-300">Welcome! Choose a username to finish setup.</p>
              <input
                className="w-full mb-3 px-4 py-3 bg-gray-800 border border-gray-700 rounded-md placeholder-gray-400 text-white"
                placeholder="Username"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <div className="flex justify-end">
                <button onClick={handleSetUsername} className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg">Save</button>
              </div>
            </div>
          ) : (
            <div>
              <label className="block text-sm text-gray-300 mb-1">Email</label>
              <input
                className="w-full mb-4 px-4 py-3 bg-gray-800 border border-gray-700 rounded-md placeholder-gray-400 text-white"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <label className="block text-sm text-gray-300 mb-1">Password</label>
              <input
                type="password"
                className="w-full mb-4 px-4 py-3 bg-gray-800 border border-gray-700 rounded-md placeholder-gray-400 text-white"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              {mode === "signup" && (
                <input
                  className="w-full mb-4 px-4 py-3 bg-gray-800 border border-gray-700 rounded-md placeholder-gray-400 text-white"
                  placeholder="Choose a username"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              )}

              <div className="mt-2">
                {mode === "login" ? (
                  <button onClick={handleLogin} className="w-full bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-600 hover:to-orange-500 text-white py-3 rounded-lg font-medium">Log In</button>
                ) : (
                  <button onClick={handleSignup} className="w-full bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-600 hover:to-orange-500 text-white py-3 rounded-lg font-medium">Sign Up</button>
                )}
              </div>

              <div className="flex items-center gap-4 my-5">
                <div className="flex-1 h-px bg-gray-700" />
                <div className="text-xs text-gray-400">OR</div>
                <div className="flex-1 h-px bg-gray-700" />
              </div>

              <button onClick={handleGoogle} className="w-full bg-gray-800 border border-gray-700 text-white py-3 rounded-lg flex items-center justify-center gap-3">
                <svg width="18" height="18" viewBox="0 0 533.5 544.3" xmlns="http://www.w3.org/2000/svg">
                  <path d="M533.5 278.4c0-17.4-1.6-34.1-4.6-50.3H272v95.1h147.4c-6.4 34.7-25.1 64.1-53.6 83.7v69.8h86.6c50.6-46.6 81.1-115.3 81.1-193.3z" fill="#4285F4"/>
                  <path d="M272 544.3c73.7 0 135.5-24.3 180.7-66.2l-86.6-69.8c-24.1 16.1-54.9 25.6-94.1 25.6-72 0-133-48.6-154.8-113.9H28.6v71.5C73.7 493.9 166.4 544.3 272 544.3z" fill="#34A853"/>
                  <path d="M117.2 325.9c-10.5-31-10.5-64.8 0-95.8V158.6H28.6c-40.6 80.4-40.6 175.9 0 256.3l88.6-69z" fill="#FBBC05"/>
                  <path d="M272 107.7c39 0 74 13.5 101.6 39.9l76.1-76.1C407.3 24.8 345.5 0 272 0 166.4 0 73.7 50.4 28.6 126.1l88.6 71.6C139 156.3 200 107.7 272 107.7z" fill="#EA4335"/>
                </svg>
                <span>Log In with Google</span>
              </button>

              <div className="mt-5 text-center text-sm text-gray-400">
                {mode === "login" ? (
                  <>
                    Don't have an account? <button onClick={() => setMode("signup")} className="text-white underline ml-1">Sign up</button>
                  </>
                ) : (
                  <>
                    Already have an account? <button onClick={() => setMode("login")} className="text-white underline ml-1">Log in</button>
                  </>
                )}
              </div>

              {error && <p className="mt-4 text-sm text-red-400 whitespace-pre-line">{error}</p>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
