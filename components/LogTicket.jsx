"use client";
import React from "react";
import { useState } from "react";
import TicketMessage from "./TicketSuccess";
import TicketSuccess from "./TicketSuccess";
import { useRouter } from "next/navigation";

const LogTicket = () => {
  const router=useRouter()
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [error, setError] = useState("");

  //Creating A handlwSubmit Function
  const handleSubmit = async (e) => {
    e.preventDefault();
    //Calling my LogTicketAPI
    const response = await fetch("http://localhost:3000/api/ticketCrud", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        location,
        description,
        category,
      }),
    });
    if (response.status == 200) {
      const form = e.target;
      form.reset();
      return <TicketSuccess redirectUrl="/dashboard" message="Your Ticket is Submitted Successfully" delay="6000"/>

    }
    <TicketSuccess redirectUrl="/logTicket" message="Error Occured while creating ticket, Please try again" delay="6000"/>
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 sm:px-6 lg:px-8 mt">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full mt-2">
        <h2 className="text-2xl sm:text-2xl font-bold text-gray-800 mb-6 text-center">
          Submit Your Ticket
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-gray-700 font-medium mb-2"
            >
              Title
            </label>
            <input
            onChange={(e) => setTitle(e.target.value)}
              type="text"
              id="title"
              name="title"
              placeholder="Enter the title"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="category"
              className="block text-gray-700 font-medium mb-2"
            >
              Category
            </label>
            <select
            onChange={(e) => setCategory(e.target.value)}
              id="category"
              name="category"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            >
              <option selected>Please select category</option>
              <option value="General">General</option>
              <option value="Body Shop">Body Shop</option>
              <option value="Paint Shop">Paint Shop</option>
              <option value="SFM">SFM</option>
              <option value="Operational">Operational</option>
            </select>
          </div>

          {/* Location Input */}
          <div className="mb-4">
            <label
              htmlFor="location"
              className="block text-gray-700 font-medium mb-2"
            >
              Location
            </label>
            <input
            onChange={(e) => setLocation(e.target.value)}
              type="text"
              id="location"
              name="location"
              placeholder="Enter the location"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Text Area */}
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-gray-700 font-medium mb-2"
            >
              Description
            </label>
            <textarea
            onChange={(e) => setDescription(e.target.value)}
              id="description"
              name="description"
              placeholder="Enter the description"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="5"
            ></textarea>
          </div>
          {error && <div className="text-green-500">{error}</div>}

          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300 w-full sm:w-auto"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LogTicket;
