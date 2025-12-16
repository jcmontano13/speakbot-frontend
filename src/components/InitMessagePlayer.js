// frontend/src/components/InitMessagePlayer.js
import React, { useEffect, useState } from "react";
import axios from "axios";

// Split bases to avoid mixing responsibilities
const CHAT_API_BASE = "http://127.0.0.1:8000/chat/api";
const VOICE_API_BASE = "http://127.0.0.1:8000/voice";

const InitMessagePlayer = () => {
  const [audioUrl, setAudioUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch init message once on mount
  useEffect(() => {
    const fetchInitMessage = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${CHAT_API_BASE}/init-message/`, {
          responseType: "blob",
        });
        const url = URL.createObjectURL(res.data);
        setAudioUrl(url);
      } catch (err) {
        console.error("Init message failed:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchInitMessage();
  }, []);

  // Play init message
  const handlePlayInit = () => {
    if (audioUrl) {
      const audio = new Audio(audioUrl);
      audio.play().catch((err) => console.error("Playback failed:", err));
    }
  };

  // Send voice file to Voice Chat Router (correct path)
  const sendVoiceMessage = async (file) => {
    const formData = new FormData();

    // Preserve extension for flexibility
    const extension = file.name.split(".").pop().toLowerCase();
    formData.append("audio", file, `upload.${extension}`);

    try {
      setLoading(true);
      const res = await axios.post(`${VOICE_API_BASE}/chatrouter/`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        responseType: "blob", // expecting audio back
      });

      const url = URL.createObjectURL(res.data);
      const botAudio = new Audio(url);
      botAudio.play().catch((err) =>
        console.error("Bot reply playback failed:", err)
      );
    } catch (err) {
      console.error("Voice message failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Init Message Test</h2>
      {loading && <p>Loading...</p>}
      {audioUrl && (
        <button onClick={handlePlayInit}>▶️ Play Init Message</button>
      )}

      <h3>Send Voice Message</h3>
      <input
        type="file"
        accept="audio/*"
        onChange={(e) => {
          if (e.target.files[0]) {
            sendVoiceMessage(e.target.files[0]);
            // Reset input so same file can be re-uploaded
            e.target.value = null;
          }
        }}
      />
    </div>
  );
};

export default InitMessagePlayer;