import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";
import notificationSound from "../assets/notification.mp3";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useListenMessages = () => {
  const { socket } = useSocketContext();
  const { messages, setMessages, selectedConversation } = useConversation();
  const { authUser } = useAuthContext();
  useEffect(() => {
    socket?.on("newMessage", (res) => {
      console.log(
        selectedConversation?.conversationId,
        res.conversationId,
        res.receiverId,
        authUser._id
      );
      if (
        selectedConversation?.conversationId == res.conversationId &&
        res.receiverId == authUser._id
      ) {
        res.newMessage.shouldShake = true;
        const sound = new Audio(notificationSound);
        sound.play();
        setMessages([...messages, res.newMessage]);
      } else {
        console.log(res);
        toast(res.senderName.fullName + " sent you a message");
        // toast((t) => (
        //   <span>
        //     {res.senderName.fullName} sent you a message
        //     <button onClick={() => toast.dismiss(t.id)}>Dismiss</button>
        //   </span>
        // ));
      }
    });

    return () => socket?.off("newMessage");
  }, [socket, setMessages, messages]);
};

export default useListenMessages;
