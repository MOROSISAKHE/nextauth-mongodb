import mongoose from 'mongoose'
import React from 'react'

const mongodbConnection = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected Succesfully!");   
    } catch (error) {
       console.log("Failed to connect to the database", error);
    }
}
export default mongodbConnection;

