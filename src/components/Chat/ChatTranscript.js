// frontend/src/components/Chat/ChatTranscript.js
import React, { useEffect, useRef } from "react";
import MiniAmyAvatar from "./MiniAmyAvatar";

export default function ChatTranscript({ messages }) {
  const scrollRef = useRef(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div
      ref={scrollRef}
      className="flex-1 bg-[#F0ECD4] rounded-2xl p-4 max-h-[500px] overflow-y-auto space-y-4"
    >
      {messages.map((msg, index) => {
        const isAmy = msg.sender === "amy";

        return (
          <div
            key={index}
            className={`flex items-start gap-2 ${
              isAmy ? "justify-start" : "justify-end"
            }`}
          >
            {/* Amy avatar on left */}
            {isAmy && <MiniAmyAvatar />}

            {/* Message bubble */}
            <div
              className={`p-3 rounded-xl shadow max-w-[75%] ${
                isAmy
                  ? "bg-white text-gray-800"
                  : "bg-[#D1F7C4] text-gray-900"
              }`}
            >
              {msg.text}
            </div>
          </div>
        );
      })}
    </div>
  );
}