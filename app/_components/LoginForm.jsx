"use client";
import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const session=useSession();
  if(session.status==="authenticated"){
    router.push('/dashboard');
  }
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res.error) {
        setError("Invalid Credentials");
        return;
      }

      router.replace("dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="grid place-items-center h-screen">
      <div className="shadow-lg rounded-lg p-6 border-t-4 border-slate-900">
        <h2 className="text-black font-bold text-center">
          Enter Login Credintials
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5 pt-5">
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
          <button className="bg-slate-900 py-2 text-white font-bold hover:bg-slate-800" type="submit">
            Login
          </button>
          {error && <div className="text-red-500">{error}</div>}
        </form>
        <div className="flex justify-center m-3">
          <p>--OR--</p>
        </div>
        <div className="flex justify-center">
          <button className="flex bg-black rounded-lg px-2 py-2 text-yellow-50 mb-6 text-sm hover:bg-gray-800 items-center gap-1" onClick={()=>signIn("github", {callbackUrl: "/dashboard"})}><span className="size-"><FaGithub /></span> SignIn with GitHub</button>
        </div>
        <div className="flex justify-center">
          <button className="flex bg-blue-500 rounded-lg px-2 py-2 text-yellow-50 mb-6 text-sm hover:bg-blue-800 items-center gap-1" onClick={()=>signIn("google", {callbackUrl: "/dashboard"})}><span className="size-"><FcGoogle /></span> SignIn with Google</button>
        </div>
        <div className="flex justify-end">
        <Link className="text-end text-sm" href="\register">
            Dont have an account ?  <span className="underline hover:cursor-pointer">Register here</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
