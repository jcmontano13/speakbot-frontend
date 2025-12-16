import React from 'react';
import InitMessagePlayer from './components/InitMessagePlayer';
import VoiceRecorder from "./components/VoiceRecorder";

function App() {
  console.log("App component rendered");
  return (
    <div className="App">
      <InitMessagePlayer />
      <VoiceRecorder />
    </div>
  );
}

export default App;