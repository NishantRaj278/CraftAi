"use client";

import Message from "@/components/Message";
import useGeneratorStore from "@/store/generatorStore";
import useUserStore from "@/store/userStore";
import { useEffect, useState, useRef } from "react";
import { FaArrowUp } from "react-icons/fa6";
function Homepage() {
  const { authUser, getUser } = useUserStore();
  const [prompt, setPrompt] = useState("");
  const { isGenerating, chats, getData, sendPrompt } = useGeneratorStore();
  useEffect(() => {
    const fetchUser = async () => {
      await getUser();
    };
    fetchUser();
  }, [getUser]);

  useEffect(() => {
    const fetchData = async () => {
      await getData();
    };
    fetchData();
  }, [getData]);

  const handleSubmit = async () => {
    if (prompt.trim() === "") return;
    await sendPrompt(prompt);
    setPrompt("");
  };

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chats]);

  if (!authUser) {
    return (
      <div className="pt-20 w-full h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold">Please log in to continue</h1>
      </div>
    );
  }
  return (
    <div className="pt-20 w-full px-8 items-center flex flex-col pb-20">
      <div className="flex items-center justify-between w-2/3 h-15 bg-gray-200 rounded-full shadow-md px-4 bottom-8 fixed">
        <input
          type="text"
          placeholder="Create..."
          className="px-8 py-4 flex-grow outline-none"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        {isGenerating ? (
          <div className="flex items-center justify-center">
            <svg
              className="animate-spin h-9 w-9 text-black"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              ></path>
            </svg>
          </div>
        ) : (
          <FaArrowUp
            size={35}
            className="text-white bg-black rounded-full p-2 cursor-pointer"
            onClick={handleSubmit}
            style={{
              opacity: isGenerating ? 0.5 : 1,
              pointerEvents: isGenerating ? "none" : "auto",
            }}
          />
        )}
      </div>
      <div className="flex w-2/3 flex-col gap-4 mb-10">
        {chats.map((chat, _id) => (
          <Message key={_id} chat={chat} />
        ))}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}

export default Homepage;
