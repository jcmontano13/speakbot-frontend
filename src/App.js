import React, { useState } from "react";
import InitMessagePlayer from "./components/InitMessagePlayer";
import VoiceRecorder from "./components/VoiceRecorder";
import AvatarPanel from "./components/Avatar/AvatarPanel";

function App() {
  const [isAvatarSpeaking, setIsAvatarSpeaking] = useState(false);
  const [chatStarted, setChatStarted] = useState(false);

  console.log("App component rendered");

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FDE8AD] via-[#FFA3BF] to-[#79C9F6] p-4">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden">

        {/* Header */}
        <div className="bg-gradient-to-r from-[#3D1164] to-[#572584] p-6 text-white">
          <h1 className="text-4xl font-bold mb-2">Speakia</h1>
          <p className="text-sm opacity-90">Practice English with Amy</p>
        </div>

        {/* Main Layout */}
        <div className="p-6 flex flex-col md:flex-row gap-6">

          {/* LEFT — Avatar */}
          <AvatarPanel 
            isSpeaking={isAvatarSpeaking}
            chatStarted={chatStarted}
          />

          {/* RIGHT — Chat / Transcript */}
          <div className="flex-1 bg-[#F0ECD4] rounded-2xl p-4 max-h-[500px] overflow-y-auto">
            {/* Placeholder for now — will be replaced by ChatTranscript */}
            <InitMessagePlayer setChatStarted={setChatStarted} />
          </div>
        </div>

        {/* Bottom Controls */}
        <div className="p-6 flex justify-center">
          <VoiceRecorder setIsAvatarSpeaking={setIsAvatarSpeaking} />
        </div>

      </div>
    </div>
  );
}

export default App;