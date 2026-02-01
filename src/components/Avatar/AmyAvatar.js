// src/components/Avatar/AmyAvatar.js
import React, { useEffect, useRef } from "react";
import Lottie from "lottie-react";
import amyAnimation from "./animations/amy.json"; // corrected path

export default function AmyAvatar({ isSpeaking }) {
  const lottieRef = useRef(null);

  useEffect(() => {
    if (!lottieRef.current) return;

    if (isSpeaking) {
      lottieRef.current.play();
    } else {
      lottieRef.current.goToAndStop(0, true);
    }
  }, [isSpeaking]);

  return (
    <Lottie
      lottieRef={lottieRef}
      animationData={amyAnimation}
      autoplay={false}
      loop={isSpeaking}
      style={{ width: "100%", height: "100%", objectFit: "contain" }}
    />
  );
}