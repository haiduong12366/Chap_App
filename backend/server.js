import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
import path from "path";

import authRoutes from "./routes/auth.routes.js"
import messageRoutes from "./routes/message.routes.js"
import userRoutes from "./routes/user.routes.js"
import conversationRoutes from "./routes/conversation.routes.js"

import {app, server} from "./socket/socket.js"

import connectToMongoDB from "./db/connectToMongoDB.js";

dotenv.config(); // run file env
const PORT= process.env.PORT || 5000
const __dirname = path.resolve() // to get url link




// app.get("/",(req,res)=>{
//     //root route http://localhost:5000/
//     res.send("Hello World!")
// })
app.use(express.json()) //tp parse the income req w JSON payloads
app.use(cookieParser())

app.use("/api/auth",authRoutes)
app.use("/api/messages",messageRoutes)
app.use("/api/users",userRoutes)
app.use("/api/conversations",conversationRoutes)

app.use(express.static(path.join(__dirname,"/frontend/dist"))) // use to serve midleware express.static, pathjoin to connect link from dirname with "/frontend/dist"

app.get("*",(req,res)=>{//run frontend in this port 5000
    res.sendFile(path.join(__dirname,"/frontend/dist/index.html")) // send index.html to client when have any change 
})

server.listen(PORT, ()=> {
    connectToMongoDB();
    console.log(`Server running on port ${PORT}`)
})

