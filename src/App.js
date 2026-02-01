import React, { useState, useEffect } from "react";
import InitMessagePlayer from "./components/InitMessagePlayer";
import VoiceRecorder from "./components/VoiceRecorder";
import AvatarPanel from "./components/Avatar/AvatarPanel";
import ChatTranscript from "./components/Chat/ChatTranscript";

function App() {
  const [isAvatarSpeaking, setIsAvatarSpeaking] = useState(false);
  const [chatStarted, setChatStarted] = useState(false);
  const [messages, setMessages] = useState([]);

  // NEW: Prevent InitMessagePlayer from running twice
  const [initMessageLoaded, setInitMessageLoaded] = useState(false);

  // Controls visibility of the chat panel
  const [showChatPanel, setShowChatPanel] = useState(false);

  // Controls the "Start speaking with Amy" button
  const [showStartButton, setShowStartButton] = useState(true);

  // Store init message (no autoplay here)
  const handleInitMessage = (msg) => {
    setMessages((prev) => [...prev, msg]);
  };

  // Play init message audio AFTER user clicks Start
  const playInitMessage = () => {
    const last = messages[messages.length - 1];

    if (last?.sender === "amy" && last.audioUrl) {
      const audio = new Audio(last.audioUrl);
      setIsAvatarSpeaking(true);

      audio.play().catch((err) => {
        console.error("Init audio playback failed:", err);
      });

      audio.onended = () => setIsAvatarSpeaking(false);
    }
  };

  // Threshold logic: trigger init message again after 5 messages
  useEffect(() => {
    if (messages.length === 5) {
      console.log("Threshold reached — trigger init message again");
      setChatStarted(false);
      setShowStartButton(true);
      setShowChatPanel(false);
      setInitMessageLoaded(false); // allow init message again
    }
  }, [messages]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FDE8AD] via-[#FFA3BF] to-[#79C9F6] p-4">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden">

        {/* Header */}
        <div className="bg-gradient-to-r from-[#3D1164] to-[#572584] p-6 text-white">
          <h1 className="text-4xl font-bold mb-2">Speakia</h1>
          <p className="text-sm opacity-90">Practice English with Amy</p>
        </div>

        {/* Auto Init Message Fetcher */}
        {!chatStarted && !initMessageLoaded && (
          <InitMessagePlayer
            setChatStarted={setChatStarted}
            onInitMessage={(msg) => {
              handleInitMessage(msg);
              setInitMessageLoaded(true); // 🔥 prevents double init message
            }}
          />
        )}

        {/* Main Layout */}
        <div className="p-6 flex flex-col md:flex-row gap-6">

          {/* LEFT — Avatar */}
          <AvatarPanel
            isSpeaking={isAvatarSpeaking}
            chatStarted={chatStarted}
          />

          {/* RIGHT — Chat Panel (hidden until Start is clicked) */}
          {showChatPanel && (
            <ChatTranscript messages={messages} />
          )}
        </div>

        {/* Bottom Controls */}
        <div className="p-6 flex flex-col items-center gap-4">

          {/* Speaking Indicator */}
          {isAvatarSpeaking && (
            <div className="px-4 py-2 bg-[#79C9F6] text-[#3D1164] font-semibold rounded-xl shadow animate-pulse">
              Amy is speaking...
            </div>
          )}

          {/* Start Button */}
          {showStartButton && messages.length > 0 && (
            <button
              className="bg-[#3D1164] text-white px-6 py-3 rounded-xl shadow font-semibold hover:bg-[#572584] transition"
              onClick={() => {
                setShowStartButton(false);
                setShowChatPanel(true);
                setChatStarted(true);
                setInitMessageLoaded(true); // 🔥 ensures InitMessagePlayer never runs again
                playInitMessage();
              }}
            >
              Start speaking with Amy
            </button>
          )}

          {/* Voice Recorder */}
          <VoiceRecorder setIsAvatarSpeaking={setIsAvatarSpeaking} />
        </div>

      </div>
    </div>
  );
}

export default App;