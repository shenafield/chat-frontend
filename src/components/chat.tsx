import MessageComponent from "./message";
import { Message } from "../utils/chat";


export default function ChatComponent({ messages }: { messages: Message[] }) {
    console.log(messages);
    return (
    <div className="chat">
        <div className="chat-content">
            {messages.map((message, index) => (
                <MessageComponent message={message} key={index} />
            ))}
        </div>
    </div>
    );
}