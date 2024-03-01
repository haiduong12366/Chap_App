import { useEffect, useRef } from "react";
import useGetMessage from "../../hooks/useGetMessages";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import Message from "./Message";
import useListenMessages from "../../hooks/useListenMessages";

const Messages = () => {
  const { messages, loading } = useGetMessage();
  useListenMessages();
  const lastMessageRef = useRef();
  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  }, [messages]);
  var hideScrollbarTimeout;
  function show(){
    clearTimeout(hideScrollbarTimeout);
    var scrollableContent = document.getElementById('scrollableMessage');
    scrollableContent.classList.remove("hidden-scrollbar")
    scrollableContent.classList.add("scrollbar")
    
  }
  
  function hide(){
    hideScrollbarTimeout = setTimeout(function() {
      var scrollableContent = document.getElementById('scrollableMessage');
      scrollableContent.classList.remove("scrollbar")
      scrollableContent.classList.add('hidden-scrollbar'); // Hide the scrollbar after a delay
    }, 1000);
  }

  return (
    <div className="px-4 flex-1 overflow-auto" onMouseEnter={show}
    onMouseLeave={hide} id="scrollableMessage">
      {loading && [...Array(4)].map((_, idx) => <MessageSkeleton key={idx} />)}
      {!loading &&
        messages.length > 0 &&
        messages.map((message) => (
          <div key={message._id} ref={lastMessageRef}>
            <Message message={message} />
          </div>
        ))}

      {!loading && messages.length === 0 && (
        <p className="text-center text-stone-300">
          Send message to start conversation
        </p>
      )}
    </div>
  );
};
export default Messages;
