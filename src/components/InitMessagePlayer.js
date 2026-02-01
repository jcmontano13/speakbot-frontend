// frontend/src/components/InitMessagePlayer.js
import React, { useEffect } from "react";
import axios from "axios";

const CHAT_API_BASE = "http://127.0.0.1:8000/chat/api";

export default function InitMessagePlayer({
  setChatStarted,
  onInitMessage,
}) {

  useEffect(() => {
    async function fetchInitMessage() {
      try {
        const res = await axios.get(`${CHAT_API_BASE}/init-message/`, {
          responseType: "blob",
        });

        const audioUrl = URL.createObjectURL(res.data);

        const transcript = "Hello! Let's start practicing English together.";

        // Register init message with parent
        onInitMessage({
          sender: "amy",
          text: transcript,
          audioUrl,
        });

        setChatStarted(true);

      } catch (err) {
        console.error("Init message failed:", err);
      }
    }

    fetchInitMessage();
  }, []);

  return null;
}