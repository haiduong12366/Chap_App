// STARTER CODE SNIPPET
import useGetConversations from "../../hooks/useGetConversation";
import Conversation from "./Conversation";
import { getRandomEmoji } from "../../utils/emojis";
//import useGetConversationId from "../../hooks/useGetConversationId";
import toast from "react-hot-toast";
const Conversations = () => {
  const { loading, conversations } = useGetConversations();
  for (let i = 0; i < conversations.length; i++) {
    const use = async () => {
      try {
        const res = await fetch(`/api/conversations/${conversations[i]._id}`);
        const data = await res.json();
        //console.log("ConversationID",data);
        if (data.error) {
          throw new Error(data.error);
        }
        // console.log("useGetConversationId là", data);
        conversations[i].conversationId = data;
      } catch (error) {
        toast.error(error.message);
      }
    };
    use();
    // console.log("useGetConversations", conversationId);
    
  }

    console.log("conversations", conversations);

  return (
    <div className="py-2 flex flex-col overflow-auto">
      {conversations.map((conversation, idx) => (
        <Conversation
          key={conversations._id}
          conversation={conversation}
          emoji={getRandomEmoji()}
          lastIdx={idx === conversations.length - 1}
        />
      ))}

      {loading ? (
        <span className="loading loading-spinner mx-auto"></span>
      ) : null}
    </div>
  );
};
export default Conversations;
