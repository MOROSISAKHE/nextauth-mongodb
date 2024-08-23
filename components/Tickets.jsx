import React from "react";
import RemoveButton from "./RemoveButton";
import MarkDone from "./MarkDone";
import { FaLocationDot } from "react-icons/fa6";
import { BsFillCalendar2DateFill } from "react-icons/bs";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

//Calling the ticketCrud API to get tickets
const getTickets = async () => {
  const response = await fetch("http://localhost:3000/api/ticketCrud", {
    cache: "no-store",
  });
  if (response.ok) {
    return response.json();
  }
  console.log("Error fetching tickets");
};

export default async function Tickets() {
  const session = await getServerSession(authOptions);
  const tickets = await getTickets();
  const uniqueCategories = [
    ...new Set(tickets?.map(({ category }) => category)),
  ];
  console.log(uniqueCategories);
  console.log("My other Session", session.user.role);
  // Checking Button State
  var isDisabled = "";
  if (session.user.role == "user") {
    isDisabled = "true";
  }
  return (
    <div>
      {tickets &&
        uniqueCategories?.map((uniqueCategory, categoryId) => (
          <div
            className="relative border-2 border-gray-300 p-3 rounded-md mb-4"
            key={categoryId}
          >
            <h2 className="text-xl font-extrabold mb-4 underline">
              {uniqueCategory}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 ">
              {tickets
                .filter((ticket) => ticket.category === uniqueCategory)
                .map((filterdTickets, filterdTicketsId) => (
                  <div
                    key={filterdTicketsId}
                    className="flex flex-col justify-between bg-slate-100 px-6 pb-5 pt-3 rounded-lg shadow-lg hover:scale-110"
                  >
                    <div>
                      <p className="font-bold pb-3 text-center">
                        {filterdTickets.title}
                      </p>
                      <hr className="border border-gray-400" />
                      <p className="pt-3">{filterdTickets.description}</p>

                      <p className="flex pt-3 italic">
                        <FaLocationDot size={20} />: {filterdTickets.location}
                      </p>
                      <p className="flex pt-3 gap-1 italic">
                        <BsFillCalendar2DateFill size={20} /> :{" "}
                        {filterdTickets.createdAt}
                      </p>
                    </div>
                    <div className="flex lg:gap-8 md:gap-10 sm:justify-between justify-between items-end">
                      <RemoveButton
                        ticketID={filterdTickets._id}
                        isBtnDisabled={isDisabled}
                      />
                      <MarkDone />
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
    </div>
  );
}
