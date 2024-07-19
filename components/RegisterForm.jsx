"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
const RegisterForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router=useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setError("Please fill all fields");
      return;
    }
    try {
      const res = await fetch("api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });
      if (res.ok) {
        const form = e.target;
        form.reset();
        router.push("/login");
      } else {
        console.log("User registration faild");
      }
    } catch (error) {
      console.log("Error occured during registration", error);
    }
  };

  return (
    <div className="grid place-items-center h-screen">
      <div className="shadow-lg rounded-lg p-6 border-t-4 border-slate-900">
        <h2 className="text-black font-bold text-center">
          Enter Registration Details
        </h2>
        <form className="flex flex-col gap-5 pt-5" onSubmit={handleSubmit}>
          <input
            className="w-[380px] border border-gray-400 px-5 py-3 bg-slate-100"
            type="text"
            placeholder="Full Name"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="w-[380px] border border-gray-400 px-5 py-3 bg-slate-100"
            type="text"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="w-[380px] border border-gray-400 px-5 py-3 bg-slate-100"
            type="password"
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="bg-slate-900 py-2 text-white font-bold hover:bg-slate-800">
            Register
          </button>
          {error && <div className="text-red-500">{error}</div>}
          <Link className="text-end" href="\login">
            Already have an account?{" "}
            <span className="underline">Login here</span>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
