// frontend/src/components/InitMessagePlayer.js
import { useEffect } from "react";

const CHAT_API_BASE = "http://127.0.0.1:8000/chat/api";

export default function InitMessagePlayer({
  setChatStarted,
  onInitMessage,
}) {

  useEffect(() => {
    async function fetchInitMessage() {
      try {
        const res = await fetch(`${CHAT_API_BASE}/init-message/`);
        const data = await res.json();

        console.log("Init message JSON:", data);

        onInitMessage({
          type: "init",
          sender: "amy",
          text: data.bot_response,
          audioUrl: data.audio_url,
        });

        setChatStarted(false);

      } catch (err) {
        console.error("Init message failed:", err);
      }
    }

    fetchInitMessage();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}