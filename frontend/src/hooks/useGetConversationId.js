import toast from "react-hot-toast";

const useGetConversationId = async (selectedConversation) => {
  let conversationId = ""
  try {
    const res = await fetch(`/api/conversations/${selectedConversation}`);
    const data = await res.json();
    //console.log("ConversationID",data);
    if (data.error) {
      throw new Error(data.error);
    }
    console.log("useGetConversationId là",data)
    conversationId = data
  } catch (error) {
    toast.error(error.message);
  }
  return conversationId
};

export default useGetConversationId;
