import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js"
import messageRoutes from "./routes/message.routes.js"
import userRoutes from "./routes/user.routes.js"


import connectToMongoDB from "../db/connectToMongoDB.js";

const app = express()
dotenv.config(); // run file env
const PORT= process.env.PORT || 5000

// app.get("/",(req,res)=>{
//     //root route http://localhost:5000/
//     res.send("Hello World!")
// })
app.use(express.json()) //tp parse the income req w JSON payloads
app.use(cookieParser())

app.use("/api/auth",authRoutes)
app.use("/api/messages",messageRoutes)
app.use("/api/users",userRoutes)

app.listen(PORT, ()=> {
    connectToMongoDB();
    console.log(`Server running on port ${PORT}`)
})
