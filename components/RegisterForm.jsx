"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const RegisterForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error message

    if (!name || !email || !password) {
      setError("Please fill all fields");
      return;
    }

    if (!emailRegex.test(email)) {
      setError("Please enter a valid email");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (res.ok) {
        e.target.reset();
        router.push("/login");
      } else {
        const data = await res.json();
        setError(data.message);
      }
    } catch (error) {
      setError("An error occurred during registration. Please try again.");
      console.error("Registration error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid place-items-center h-screen">
      <div className="shadow-lg rounded-lg p-6 border-t-4 border-slate-900">
        <h2 className="text-black font-bold text-center">
          Enter Registration Details
        </h2>
        <form className="flex flex-col gap-5 pt-5" onSubmit={handleSubmit}>
          <label className="sr-only" htmlFor="name">
            Full Name
          </label>
          <input
            id="name"
            className="w-[380px] border border-gray-400 px-5 py-3 bg-slate-100"
            type="text"
            placeholder="Full Name"
            onChange={(e) => setName(e.target.value)}
            required
          />
          <label className="sr-only" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            className="w-[380px] border border-gray-400 px-5 py-3 bg-slate-100"
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label className="sr-only" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            className="w-[380px] border border-gray-400 px-5 py-3 bg-slate-100"
            type="password"
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            className="bg-slate-900 py-2 text-white font-bold hover:bg-slate-800"
            type="submit"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
          {error && <div className="text-red-500">{error}</div>}
          <Link className="text-end" href="/login">
            Already have an account? <span className="underline">Login here</span>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
