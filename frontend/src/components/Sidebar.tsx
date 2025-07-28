"use client";
import useSessionStore from "@/store/sessionStore";
import { useEffect, useState } from "react";
import type React from "react";
import { FaPlus, FaComments } from "react-icons/fa";

function Sidebar() {
  const [title, setTitle] = useState("");
  const { sessions, getSessions, createSession, sessionId } = useSessionStore();

  useEffect(() => {
    const fetchSessions = async () => {
      await getSessions();
    };
    fetchSessions();
  }, [getSessions]);

  const handleChat = async () => {
    if (title.trim() === "") return;
    await createSession(title);
    setTitle("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && title.trim()) {
      handleChat();
    }
  };

  const handleSessionClick = (id: string) => {
    useSessionStore.setState({ sessionId: id });
  };

  return (
    <div className="pt-16 fixed h-screen w-80 bg-gray-900/95 backdrop-blur-xl border-r border-gray-700/50 z-40 flex flex-col">
      {/* Header Section */}
      <div className="p-6 border-b border-gray-700/50 flex-shrink-0">
        {/* Title Input */}
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Enter chat title..."
            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyPress={handleKeyPress}
          />
        </div>

        {/* New Chat Button */}
        <button
          disabled={!title.trim()}
          className="w-full flex items-center justify-center gap-3 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-700 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-[1.02] disabled:scale-100 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
          onClick={handleChat}
        >
          <FaPlus className="text-sm" />
          New Chat
        </button>
      </div>

      {/* Sessions Section */}
      <div className="flex-1 flex flex-col min-h-0">
        <div className="px-6 py-4 border-b border-gray-700/50 flex-shrink-0">
          <div className="flex items-center gap-2">
            <FaComments className="text-gray-400 text-sm" />
            <h2 className="text-lg font-semibold text-white">Recent Chats</h2>
            <span className="text-xs text-gray-400 bg-gray-700/50 px-2 py-1 rounded-full">
              {sessions.length}
            </span>
          </div>
        </div>

        {/* Sessions List - Scrollable */}
        <div className="flex-1 overflow-y-auto min-h-0">
          <style jsx>{`
            .custom-scrollbar::-webkit-scrollbar {
              width: 6px;
            }
            .custom-scrollbar::-webkit-scrollbar-track {
              background: rgba(31, 41, 55, 0.5);
              border-radius: 3px;
            }
            .custom-scrollbar::-webkit-scrollbar-thumb {
              background: rgba(75, 85, 99, 0.8);
              border-radius: 3px;
            }
            .custom-scrollbar::-webkit-scrollbar-thumb:hover {
              background: rgba(107, 114, 128, 1);
            }
          `}</style>

          <div className="custom-scrollbar h-full overflow-y-auto">
            {sessions.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                <div className="w-16 h-16 bg-gray-700/50 rounded-full flex items-center justify-center mb-4">
                  <FaComments className="text-gray-400 text-xl" />
                </div>
                <h3 className="text-gray-300 font-medium mb-2">No chats yet</h3>
                <p className="text-gray-500 text-sm">
                  Create your first chat to get started
                </p>
              </div>
            ) : (
              <div className="p-4 space-y-2">
                {sessions.map((session) => {
                  const isActive = sessionId === session._id;

                  return (
                    <div
                      key={session._id}
                      className={`group relative p-4 rounded-xl cursor-pointer transition-all duration-200 border ${
                        isActive
                          ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-blue-500/50 shadow-lg shadow-blue-500/10"
                          : "hover:bg-gray-800/50 border-transparent hover:border-gray-700/50"
                      }`}
                      onClick={() => handleSessionClick(session._id)}
                    >
                      {/* Session Content */}
                      <div className="flex-1 min-w-0">
                        <h3
                          className={`font-medium text-sm truncate mb-1 transition-colors duration-200 ${
                            isActive
                              ? "text-blue-300 font-semibold"
                              : "text-white group-hover:text-blue-300"
                          }`}
                        >
                          {session.title}
                        </h3>
                        <p
                          className={`text-xs truncate transition-colors duration-200 ${
                            isActive ? "text-blue-200/70" : "text-gray-400"
                          }`}
                        >
                          {isActive
                            ? "Currently active conversation"
                            : "Click to continue this conversation"}
                        </p>
                      </div>

                      {/* Active Indicator */}
                      <div
                        className={`absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-blue-500 to-purple-600 rounded-r-full transition-opacity duration-200 ${
                          isActive
                            ? "opacity-100"
                            : "opacity-0 group-hover:opacity-100"
                        }`}
                      ></div>

                      {/* Active Badge */}
                      {isActive && (
                        <div className="absolute top-2 right-2">
                          <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-pulse"></div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
