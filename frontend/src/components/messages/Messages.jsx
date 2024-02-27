import { useEffect , useRef} from "react";
import useGetMessage from "../../hooks/useGetMessages";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import Message from "./Message";
import useListenMessages from "../../hooks/useListenMessages";

const Messages = () => {
	const {messages,loading}= useGetMessage()
	useListenMessages();
	const lastMessageRef = useRef()
	useEffect (()=>{
		setTimeout(()=>{lastMessageRef.current?.scrollIntoView({behavior:"smooth"})},50)
		
	},[messages])
	return (
		<div className='px-4 flex-1 overflow-auto'>
			{loading && [...Array(4)].map((_, idx) => <MessageSkeleton key={idx} />)}
			{!loading && messages.length > 0 && 
			messages.map((message)=>(<div key={message._id} ref={lastMessageRef}>
				<Message message={message}/>
				</div>))}

			{!loading && messages.length === 0 && <p className="text-center text-stone-300">Send message to start conversation</p>}
		</div>
	);
};
export default Messages;