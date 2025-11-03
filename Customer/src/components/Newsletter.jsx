import React, { useState, useRef } from "react";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // "idle" | "loading" | "success" | "error"
  const [message, setMessage] = useState("");
  const timeoutRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setStatus("error");
      setMessage("Please enter an email address.");
      return;
    }
    setStatus("loading");
    setMessage("");
    try {
      // Replace with real API call
      await new Promise((res) => setTimeout(res, 1000));
      setStatus("success");
      setMessage("Thanks for subscribing!");
      setEmail("");
    } catch (err) {
      setStatus("error");
      setMessage("Subscription failed. Please try again.");
    } finally {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setStatus("idle");
        setMessage("");
      }, 4000);
    }
  };

  return (
    <section className="dark:bg-black py-10 transition-colors duration-300">
      <div className="bg-orange-100 dark:bg-[#1F1D2B] py-16 px-6 lg:px-20 mx-4 lg:mx-16 rounded-3xl">
        <div className="max-w-2xl mx-auto text-center">
          <h4 className="text-orange-500 font-semibold uppercase mb-2">
            Newsletter
          </h4>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Get the Latest Updates
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            Subscribe to our newsletter and never miss any update or special offer!
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full sm:flex-1 px-4 py-3 rounded-full border border-gray-300 dark:border-gray-600 outline-none dark:bg-zinc-800 dark:text-white"
              aria-label="Email address"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white font-medium px-6 py-3 rounded-full transition"
            >
              {status === "loading" ? "Subscribing..." : "Subscribe"}
            </button>
          </form>

          <div className="mt-4 text-sm" role="status" aria-live="polite">
            {message && (
              <span className={status === "success" ? "text-green-600" : "text-red-600"}>{message}</span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;