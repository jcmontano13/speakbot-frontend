// src/components/Avatar/AvatarPanel.js
import React from "react";
import AmyAvatar from "./AmyAvatar";

export default function AvatarPanel({ isSpeaking, chatStarted }) {
  return (
    <div
      className={`
        w-full md:w-80 flex-shrink-0 flex justify-center md:justify-start
        ${chatStarted ? "hidden md:flex" : "flex"}
      `}
    >
      <div className="w-48 h-48 md:w-64 md:h-64">
        <AmyAvatar isSpeaking={isSpeaking} />
      </div>
    </div>
  );
}