import { Message } from '../utils/chat';


export default function MessageComponent({ message } : {message: Message}) {
    return (
        <div className="message">
            <span className="message-author">{message.author}</span>
            <span className="message-content">{message.content}</span>
        </div>
    )
}