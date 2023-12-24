import connectDB from "./db/index.js";
import dotenv from 'dotenv'
import { app } from "./app.js";

dotenv.config()


connectDB()
    .then(() => {
        app.on("error", (error) => {
            console.log("Error ", error)
            throw error
        })

        app.listen(process.env.PORT || 8000, () => {
            console.log(`server is running at port ${process.env.PORT}`)

        })



    })
    .catch((error) => {
        console.log("Can't be connected due to ", error)
    })

