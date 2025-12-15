import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_BASE = 'http://127.0.0.1:8000/chat/api';

const InitMessagePlayer = () => {
  const [audioUrl, setAudioUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchInitMessage = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API_BASE}/init-message/`, {
          responseType: 'blob'
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

  const handlePlay = () => {
    if (audioUrl) {
      const audio = new Audio(audioUrl);
      audio.play().catch(err =>
        console.error("Playback failed:", err)
      );
    }
  };

  return (
    <div>
      <h2>Init Message Test</h2>
      {loading && <p>Loading init message...</p>}
      {audioUrl && (
        <button onClick={handlePlay}>▶️ Play Init Message</button>
      )}
    </div>
  );
};

export default InitMessagePlayer;