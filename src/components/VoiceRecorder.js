// frontend/src/components/VoiceRecorder.js
import React, { useState, useRef } from "react";

const VOICE_API_BASE = "http://127.0.0.1:8000/voice";

function VoiceRecorder({ setIsAvatarSpeaking, onBackendResponse }) {
  const [recording, setRecording] = useState(false);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

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
        chunksRef.current = [];
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

    const extension = mimeType.includes("wav")
      ? "wav"
      : mimeType.includes("ogg")
      ? "ogg"
      : "webm";

    formData.append("audio", blob, `recording.${extension}`);

    try {
      const response = await fetch(`${VOICE_API_BASE}/chatrouter/`, {
        method: "POST",
        body: formData, // DO NOT set Content-Type manually
      });

      const data = await response.json();
      console.log("Backend JSON:", data);

      // Pass JSON to App.js
      onBackendResponse(data);
    } catch (err) {
      console.error("Voice message failed:", err);
    }
  };

  return (
    <div className="flex flex-col items-center">
      {!recording ? (
        <button
          className="bg-green-600 text-white px-6 py-3 rounded-xl shadow"
          onClick={startRecording}
        >
          Start Recording
        </button>
      ) : (
        <button
          className="bg-red-600 text-white px-6 py-3 rounded-xl shadow"
          onClick={stopRecording}
        >
          Stop Recording
        </button>
      )}
    </div>
  );
}

export default VoiceRecorder;