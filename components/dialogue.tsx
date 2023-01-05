import Layout from "../components/layout";
import { useState } from "react";
import axios from "axios";
import Header from "../components/header";

export default function Dialogue() {
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([
      {
        message: "Bonjour, Je suis votre assistant virtuel ! Que puis-je faire pour vous ?",
        from: "ai",
      },
    ]);
  
    const submitMessage = (event: any) => {
      event.preventDefault();
      setIsLoading(true);
      setMessages((messages) => [
        ...messages,
        { from: "user", message: message },
      ]);
      processMessage(message);
      setMessage("");
    };
  
    const processMessage = async (message: string) => {
      axios
        .post("/api/prompt", {
          message,
        })
        .then((res) => {
          setMessages((messages) => [
            ...messages,
            { from: "ai", message: res.data.message },
          ]);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    };
  
    return (
        <div className="flex flex-col h-screen ">
          <div
            id="messages"
            className="overflow-y-scroll h-screen mt-4 flex flex-col space-y-4 p-3 scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
          >
            {messages.map((message, index) => {
              return message.from === "ai" ? (
                <div key={index} id="ai" className="chat-message">
                      <div>
                        <span className="px-4 py-2 inline-block bg-gray-200 text-gray-600 text-lg">
                          {message.message}
                        </span>
                  </div>
                </div>
              ) : (
                <div key={index} id="user" className="chat-message">
                        <span className="px-4 py-2 inline-block bg-blue-400 text-white text-lg">
                          {message.message}
                        </span>
                </div>
              );
            })}
            {isLoading && (
                       <span className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600 text-lg">
                        Attendez ...
                      </span>
            )}
          </div>
            <form onSubmit={submitMessage} className="relative flex gap-2">
              <input
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                type="text"
                name="message"
                placeholder="Write your message !"
                className="w-full rounded-xl focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 bg-gray-200 py-3 pl-5 block"
              />
              
            </form>
        </div>
    );
}