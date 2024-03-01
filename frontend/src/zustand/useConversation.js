//import { useState } from 'react';
import { create } from 'zustand'

const useConversation = create((set)=>({
    selectedConversation: null,
    setSelectedConversation:(selectedConversation)=> set({selectedConversation}),
    messages:[],
    setMessages:(messages)=>set({messages}),

}))


// const useConversation = () =>{


//     const [selectedConversation,setSelectedConversation] =  useState(null)
//     const [messages,setMessages] =  useState([])

//     return {messages,setMessages,selectedConversation,setSelectedConversation};
    
// }

export default useConversation