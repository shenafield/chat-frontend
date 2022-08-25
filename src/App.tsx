import { useState, useEffect } from 'react'
import './App.sass'
import { Message } from './utils/chat';
import ChatComponent from './components/chat';
import { generateUsername } from "unique-username-generator";
import { io } from "socket.io-client";

const url = import.meta.env.VITE_WEBSOCKET_URL;
const socket = io(url);

function App() {
  const [connected, setConnected]: [boolean, any] = useState(false);
  const [messages, setMessages]: [Message[], any] = useState([]);
  const [message, setMessage]: [string, any] = useState("");
  const [author, setAuthor]: [string, any] = useState(generateUsername("-", 0, 25));

  useEffect(() => {
    socket.on("connect", () => setConnected(true));
    socket.on("disconnect", () => setConnected(false));
  }, [url]);
  socket.off("message");
  socket.on("message", (data) => setMessages([...messages, new Message(data)]));

  const send = () => {
    if (connected) {
      socket.emit("message", { content: message, author });
      setMessage("");
    }
  };

  return (
    <div className="App">
      <h1>Chat thing</h1>
      <ChatComponent messages={messages} />
      <div className="field">
        <input type="text" className="author-input" value={author} onChange={(evt) => setAuthor(evt.target.value)} />
        <input type="text" className="message-input" autoFocus={true} value={message} onChange={(evt) => setMessage(evt.target.value)} onKeyDown={(evt) => {if (evt.key === "Enter") {send()}}} />
        <div className="send">
          <button onClick={send}>Send</button>
          <label className={connected ? "connected" : "disconnected"}>{connected ? "Connected" : "Disconnected"}</label>
        </div>
      </div>
    </div>
  )
}

export default App
