"use client";
import React from "react";
import Message from "@/components/Message";
import useSessionStore from "@/store/sessionStore";
// import type React from "react";
// Memoize Message to avoid unnecessary re-renders
const MemoizedMessage = React.memo(Message);

import useGeneratorStore from "@/store/generatorStore";
import useUserStore from "@/store/userStore";
import { useEffect, useState, useRef, use } from "react";
import { FaArrowUp } from "react-icons/fa6";
import NotLoggedIn from "@/components/NotLoggedIn";
import Sidebar from "@/components/Sidebar";

function Homepage() {
  const { authUser, getUser } = useUserStore();
  const [prompt, setPrompt] = useState("");
  const { isGenerating, sendPrompt } = useGeneratorStore();
  const { sessionId, currentSession, getSessionById, addChatToSession } =
    useSessionStore();

  useEffect(() => {
    const fetchUser = async () => {
      await getUser();
    };
    fetchUser();
  }, [getUser]);

  useEffect(() => {
    if (sessionId) {
      getSessionById(sessionId);
    }
  }, [sessionId]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [currentSession?.chats]);

  if (!authUser) {
    return <NotLoggedIn />;
  }

  const handleSubmit = async () => {
    if (prompt.trim() === "") return;
    // sendPrompt returns the created chat object
    type Chat = { _id: string; message: string; generatedCode: string };
    const chat = (await sendPrompt(prompt)) as Chat | undefined;
    if (chat && sessionId) {
      await addChatToSession(sessionId, chat._id);
      // Optimistically update currentSession for real-time UI
      useSessionStore.setState((state: any) => {
        if (!state.currentSession) return {};
        return {
          currentSession: {
            ...state.currentSession,
            chats: [...state.currentSession.chats, chat],
          },
        };
      });
    }
    setPrompt("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white flex">
      {/* Sidebar */}
      <Sidebar />
      {/* Main Content */}
      <div className="flex-1">
        {/* Background Pattern */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/5 via-purple-900/5 to-pink-900/5"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]"></div>
        </div>

        <div className="relative pt-22 w-full px-4 sm:px-8 items-center flex flex-col pb-32">
          {/* Header */}
          {(currentSession === null || currentSession?.chats.length === 0) && (
            <div className="text-center mb-12 space-y-4">
              <div className="w-20 h-20 mx-auto bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6 shadow-2xl">
                <svg
                  className="w-10 h-10 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
                Start a Conversation
              </h1>
              <p className="text-gray-400 text-lg max-w-md mx-auto">
                Ask me anything and I&apos;ll help you create amazing content
              </p>
            </div>
          )}

          {/* Messages Container */}
          <div className="flex w-full max-w-4xl flex-col gap-6 mb-10">
            {currentSession?.chats.map((chat) => (
              <MemoizedMessage key={chat._id} chat={chat} />
            ))}

            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>

      {/* Input Container */}
      {currentSession && (
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 w-full max-w-6xl px-4 sm:px-8 rounded-full ml-20">
          <div className="relative">
            {/* Backdrop blur effect */}
            <div className="absolute inset-0 bg-gray-800/80 backdrop-blur-xl rounded-2xl border border-gray-700/50"></div>

            {/* Input */}
            <div className="relative flex items-center gap-4 p-4 rounded-full">
              <div className="flex-grow relative">
                <input
                  type="text"
                  placeholder="Create Something..."
                  className="w-full max-w-5xl px-8 py-4 bg-transparent text-white placeholder-gray-400 outline-none text-lg resize-none rounded-full  transition-all duration-200"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  onKeyPress={handleKeyPress}
                  disabled={isGenerating}
                />
              </div>

              {/* Send Button */}
              <div className="flex-shrink-0">
                {isGenerating ? (
                  <div className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                    <svg
                      className="animate-spin h-7 w-7 text-white"
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
                  <button
                    onClick={handleSubmit}
                    disabled={prompt.trim() === "" || isGenerating}
                    className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-700 flex items-center justify-center transition-all duration-200 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                  >
                    <FaArrowUp className="text-white text-xl" />
                  </button>
                )}
              </div>
            </div>

            {/* Bottom gradient line */}
            <div className="absolute bottom-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
          </div>

          {/* Keyboard shortcut hint */}
          <div className="text-center mt-3">
            <p className="text-gray-500 text-sm">
              Press{" "}
              <kbd className="px-2 py-1 bg-gray-700 rounded text-xs">Enter</kbd>{" "}
              to send
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Homepage;
