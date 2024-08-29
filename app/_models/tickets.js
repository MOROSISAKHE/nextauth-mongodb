import mongoose, { Schema } from "mongoose";
import React from "react";

const ticketsSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    location: {
      type: String,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required:true,
    }
  },
  { timestamps: true }
);
const Tickets = mongoose.models.Tickets || mongoose.model("Tickets", ticketsSchema);
export default Tickets;

