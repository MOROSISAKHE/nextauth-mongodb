"use client";
import React from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { useSession } from 'next-auth/react';
import { FaHome } from "react-icons/fa";
const Navbar = () => {
  const {data:session}=useSession();
  return (
    <div className="mb-2 px-4 shadow">
  <div className="relative mx-auto flex max-w-screen-lg flex-col py-4 sm:flex-row sm:items-center sm:justify-between">
    <Link className="flex items-center text-xl font-black" href="/">
      <span className="mr-2 text-3xl text-blue-600"><FaHome /></span>
      <span>Home</span>
    </Link>
    <input className="peer hidden" type="checkbox" id="navbar-open" />
    <label className="absolute right-0 mt-1 cursor-pointer text-xl sm:hidden" htmlFor="navbar-open">
      <span className="sr-only">Toggle Navigation</span>
      <svg xmlns="http://www.w3.org/2000/svg" width="0.88em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 448 512"><path fill="currentColor" d="M0 96c0-17.7 14.3-32 32-32h384c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zm0 160c0-17.7 14.3-32 32-32h384c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zm448 160c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32h384c17.7 0 32 14.3 32 32z" /></svg>
    </label>
    <nav aria-label="Header Navigation" className="peer-checked:block hidden pl-2 py-6 sm:block sm:py-0">
      <ul className="flex flex-col gap-y-4 sm:flex-row sm:gap-x-8">
        <li className=""><Link className="text-gray-600 hover:text-blue-600" href="/dashboard">Dashboard</Link></li>
        <li className=""><Link className="text-gray-600 hover:text-blue-600" href="/logTicket">Log a Ticket</Link></li>
        <li className=""><Link className="text-gray-600 hover:text-blue-600" href="/support">Support</Link></li>
        
        <li>
          { !session && (
            <Link className="rounded-xl border-2 border-blue-600 px-6 py-2 font-medium text-blue-600 hover:bg-blue-600 hover:text-white" href="/login">Login</Link>
          )}
          { session && (
            <button onClick={()=>signOut({callbackUrl: "/"})} className="bg-red-500 px-4 py-2 rounded">Logout</button>
          )}
        </li>
      </ul>
    </nav>
  </div>
</div>
  )
}

export default Navbar
