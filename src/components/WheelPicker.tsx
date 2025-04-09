import React, { useState } from "react";
import { Wheel } from "react-custom-roulette";
import Confetti from "react-confetti";
import { useWindowSize } from "@react-hook/window-size";
import confetti from "canvas-confetti";


interface WheelOption {
  option: string;
}

const WheelPicker: React.FC = () => {
const [showConfetti] = useState(false);
const [width, height] = useWindowSize(); // 📏 needed for Confetti
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [options, setOptions] = useState<WheelOption[]>([
    { option: "Msh 3arfa" },
    { option: "Msh 3arfaa" },
    { option: "Msh 3arfaaaaaaa" }
  ]);
  const [newOption, setNewOption] = useState("");
  const popConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 90,
      startVelocity: 45,
      origin: { x: 0.5, y: 0.5 }, // 🎯 center of screen
      scalar: 1.2
    });
  };
  const handleSpinClick = () => {
    if (options.length === 0) return;
    const newPrizeNumber = Math.floor(Math.random() * options.length);
    setPrizeNumber(newPrizeNumber);
    setMustSpin(true);
  };

  const addOption = () => {
    if (newOption.trim()) {
      setOptions([...options, { option: newOption.trim() }]);
      setNewOption("");
    }
  };

  const removeOption = (index: number) => {
    setOptions(options.filter((_, i) => i !== index));
  };
 
  return (
    <div style={{ padding: "2rem", maxWidth: 500, margin: "0 auto", textAlign: "center" }}>
       {showConfetti && <Confetti width={width} height={height} />}
      <h2 style={{ color: "#4b3f00" }}>Can't decide? Let the wheel help!</h2>
      <div >
  {options.length > 0 ? (
    <Wheel
      mustStartSpinning={mustSpin}
      prizeNumber={prizeNumber}
      data={options}
      backgroundColors={["#ffe066", "#f6c453"]}
      textColors={["#4b3f00"]}
      onStopSpinning={() => {
        setMustSpin(false);
        setMustSpin(false);
        popConfetti(); // 🎉 BOOM
      }}
    />
  ) : (
    <div
      style={{
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontStyle: "italic",
        color: "#999",
        backgroundColor: "#fffdf5",
        borderRadius: "50%",
        border: "2px dashed #ddd",
      }}
    >
      📝 Add some options
    </div>
  )}
</div>


      <button
        onClick={handleSpinClick}
        disabled={options.length === 0}
        style={{
          backgroundColor: options.length === 0 ? "#ccc" : "#ffe066",
          color: "#4b3f00",
          padding: "8px 16px",
          borderRadius: "6px",
          border: "none",
          cursor: options.length === 0 ? "not-allowed" : "pointer",
          marginBottom: "2rem",
          marginTop: "2rem",
        }}
      >
        🎡 Spin
      </button>

      <h3 style={{ color: "#4b3f00"}} >Add your own choices</h3>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <input
          value={newOption}
          onChange={(e) => setNewOption(e.target.value)}
          placeholder="e.g. Pink Roses"
          style={{
            padding: "6px",
            fontSize: "0.9rem",
            border: "2px solid #ffd43b",
            borderRadius: "6px",
            backgroundColor: "#fff",
            color: "#4b3f00"
          }}
        />
        <button
          onClick={addOption}
          style={{
            marginLeft: "0.5rem",
            padding: "4px 8px",
            fontSize: "0.8rem",
            borderRadius: "6px",
            backgroundColor: "#ffe066",
            border: "none",
            cursor: "pointer"
          }}
        >
          ➕ Add
        </button>
      </div>
      
      <ul style={{ color: "#4b3f00", listStyle: "none", padding: 0, marginTop: "1rem" }}>
        {options.map((opt, idx) => (
          <li key={idx} style={{ margin: "0.3rem 0" }}>
            {opt.option}
            <button
              onClick={() => removeOption(idx)}
              style={{
                marginLeft: "1rem",
                padding: "2px 6px",
                fontSize: "0.75rem",
                borderRadius: "4px",
                backgroundColor: "#ffd43b",
                border: "none",
                cursor: "pointer"
              }}
            >
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WheelPicker;
