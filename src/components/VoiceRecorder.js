// frontend/src/components/VoiceRecorder.js
import React, { useState, useRef } from "react";
import axios from "axios";

const VOICE_API_BASE = "http://127.0.0.1:8000/voice";

const VoiceRecorder = () => {
  const [recording, setRecording] = useState(false);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      // Pick the best supported format
      const mimeType = MediaRecorder.isTypeSupported("audio/wav")
        ? "audio/wav"
        : MediaRecorder.isTypeSupported("audio/webm")
        ? "audio/webm"
        : "audio/ogg";

      const mediaRecorder = new MediaRecorder(stream, { mimeType });
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const blob = new Blob(chunksRef.current, { type: mimeType });
        await sendVoiceMessage(blob, mimeType);
      };

      mediaRecorder.start();
      setRecording(true);
      console.log(`Recording started with format: ${mimeType}`);
    } catch (err) {
      console.error("Mic access denied or error:", err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setRecording(false);
      console.log("Recording stopped");
    }
  };

  const sendVoiceMessage = async (blob, mimeType) => {
    const formData = new FormData();
    // Use a generic filename but keep extension consistent with mimeType
    const extension = mimeType.includes("wav")
      ? "wav"
      : mimeType.includes("ogg")
      ? "ogg"
      : "webm";
    formData.append("audio", blob, `recording.${extension}`);

    try {
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
    }
  };

  return (
    <div>
      <h3>Voice Recorder</h3>
      {!recording ? (
        <button onClick={startRecording}>🎙️ Start Recording</button>
      ) : (
        <button onClick={stopRecording}>⏹️ Stop Recording</button>
      )}
    </div>
  );
};

export default VoiceRecorder;