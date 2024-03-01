import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import User from "../models/user.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";


export const getConversation = async (req,res)=>{
    try {
        const {id:userToChatId} = req.params
        const senderId = req.user._id

        const conversation = await Conversation.findOne({
            participants: {$all:[senderId,userToChatId]}
        })

        if(!conversation) return res.status(200).json("")

        const conversationId = conversation._id
        res.status(200).json(conversationId)

    } catch (error) {
        console.log("Error in getConversation controller",error.message)
        res.status(500).json({error:"Internal Server Error"})
    }
}