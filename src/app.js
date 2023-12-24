import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
const app = express()
// console.log(process.env.ACCESS_TOKEN_SECRET)

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credential: true
}))
console.log(process.env.CORS_ORIGIN)

app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(express.static("public"))
app.use(cookieParser())
export { app }