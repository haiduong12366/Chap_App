import { Server } from "socket.io";
import http from "http"
import express from "express";
import { Socket } from "dgram";

const app = express()

const server = http.createServer(app);
const io = new Server(server,{
    cors:{
        origin:["https://chap-app-bh52.onrender.com"],
        methods:["GET","POST"]
    }
})

export const getReceiverSocketId = (receiverId)=>{
    return userSocketMap[receiverId]
}

const userSocketMap = {} //{userId:socketId}


io.on('connection',(socket)=>{
    console.log("A user connected",socket.id)

    const userId = socket.handshake.query.userId
    if(userId!="undefined") userSocketMap[userId] = socket.id
    //will send event to all connect user
    io.emit("getOnlineUsers",Object.keys(userSocketMap))


    //socket.on() is used to listen to the events. can be use both client and server side
    socket.on("disconnect",()=>{
        console.log("user disconnected",socket.id)
        delete userSocketMap[userId];
        io.emit("getOnlineUsers",Object.keys(userSocketMap))
    })
})

export  {app,io,server};