import Link from "next/link";
import React from "react";

const LoginForm = () => {
  return (
    <div className="grid place-items-center h-screen">
      <div className="shadow-lg rounded-lg p-6 border-t-4 border-slate-900">
        <h2 className="text-black font-bold text-center">Enter Login Credintials</h2>
        <form className="flex flex-col gap-5 pt-5">
            <input className="w-[380px] border border-gray-400 px-5 py-3 bg-slate-100" type="text" placeholder="Email"/>
            <input className="w-[380px] border border-gray-400 px-5 py-3 bg-slate-100" type="password" placeholder="Enter Password"/>
            <button className="bg-slate-900 py-2 text-white font-bold hover:bg-slate-800">Login</button>
            <div className="text-red-500">
                Error Message
            </div>
            <Link className="text-end" href="\register">Create an acount <span className="underline">here</span></Link>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
