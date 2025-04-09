import React, { useEffect, useState } from "react";

export const PanicEmoji: React.FC = () => {

  const size = Math.random() * 40 + 20; // Random size between 20px and 60px
  const left = Math.random() * 100; // Random starting horizontal position
  const top = Math.random() * 100; // Random starting vertical position
  const duration = Math.random() * 5 + 4; // Animation duration: between 4 and 9 seconds
  const delay = Math.random() * 3; // Random delay
  const emojiList = ["😱", "😵‍💫", "🤯", "😰", "😬"];
  const emoji = emojiList[Math.floor(Math.random() * emojiList.length)];
  const spin = Math.random() > 0.5;
  const direction = Math.random() > 0.5 ? "left" : "right"; // Random direction for movement

  return (

      <div
        id="emoji" // Static ID for emoji
        className={`panic-emoji ${spin ? "spin" : ""} ${direction}`}
        style={{
          left: `${left}%`,
          top: `${top}%`,
          fontSize: `${size}px`,
          animationDuration: `${duration}s`,
          animationDelay: `${delay}s`,
        }}
      >
        {emoji}
      </div>

  );
};

export default PanicEmoji;
