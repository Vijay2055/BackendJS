import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {

    try {
        const conn = await mongoose.connect(`${process.env.DATABASE_URL}/${DB_NAME}`)

        if (conn) console.log(`Connected to database\n ${conn.connection.host}`)
    } catch (error) {
        console.log("Error in connection to MangoDB: ", error)
        process.exit(1)
    }

}

export default connectDB;
