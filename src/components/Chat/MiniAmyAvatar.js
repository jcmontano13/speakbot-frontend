// frontend/src/components/Chat/MiniAmyAvatar.js
import React from "react";

export default function MiniAmyAvatar() {
  return (
    <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-[#79C9F6] flex-shrink-0 mt-1">
      <img
        src="https://raw.githubusercontent.com/InfoSpeakia/speakia-public-assets/d6c7145ddc03570906caac2e3bb21c9214ec2548/Amy.png"
        alt="Amy"
        className="w-full h-full object-cover"
      />
    </div>
  );
}