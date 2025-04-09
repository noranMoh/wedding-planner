import React, { useEffect, useState } from "react";

export const WeddingCountdown: React.FC = () => {
  const weddingDate = new Date("2025-05-03T10:00:00"); // set your date/time here
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());

  function getTimeLeft() {
    const now = new Date();
    const diff = weddingDate.getTime() - now.getTime();

    if (diff <= 0) {
      return null;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    return { days, hours, minutes, seconds };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (!timeLeft) {
    return (
      <div style={{ fontSize: "1.8rem", textAlign: "center", margin: "2rem 0" }}>
        🎉 It’s the big day! 💍💐
      </div>
    );
  }

  return (
    <div
      style={{
        fontSize: "1.5rem",
        fontWeight: "bold",
        textAlign: "center",
        padding: "1rem",
        borderRadius: "1rem",
        background: "#fffbe6",
        color: "#6b4c00",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        margin: "2rem 0",
        animation: "pulse 2.5s infinite ease-in-out" // 🪩 the pulse!
      }}
    >
      💛 {timeLeft.days} days {timeLeft.hours} hours{" "}
      {timeLeft.minutes} minutes {timeLeft.seconds} seconds<br />
      until the big day! 💍
    </div>
  );
};

export default WeddingCountdown;
