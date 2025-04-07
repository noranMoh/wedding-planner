import { useState, useEffect } from 'react';
import Confetti from 'react-confetti';
import { useWindowSize } from "@react-hook/window-size";
import { PanicEmoji } from './components/panicEmoji';
import './App.css';
import WheelPicker from './components/WheelPicker';

const weddingDate = new Date('2025-05-03'); // Customize her wedding date

const compliments: string[] = [
  "You're doing amazing!",
  "Everything will be perfect, just like you.",
  "Take a deep breath, you've got this!",
  "Maldives is waiting!"
];

const moods: string[] = ["Happy", "Excited", "Stressed", "Anxious"];

function App() {
  const [emojis, setEmojis] = useState<number[]>([]);
  const [mood, setMood] = useState<string>(localStorage.getItem('mood') || '');
  const [rant, setRant] = useState<string>('');
  const [daysLeft, setDaysLeft] = useState<number>(0);
  const [randomCompliment, setRandomCompliment] = useState<string>('');
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [effect, setEffect] = useState<string | null>(null);
  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const difference = weddingDate.getTime() - now.getTime();
      const days = Math.ceil(difference / (1000 * 60 * 60 * 24));
      setDaysLeft(days);
    };

    updateCountdown(); // Initial call
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleMoodSelect = (selectedMood: string) => {
    setMood(selectedMood);
    localStorage.setItem('mood', selectedMood);
  
    switch (selectedMood) {
      case "Happy":
      case "Excited":
        setEffect("confetti");
        break;
      case "Stressed":
      case "Anxious":
        setEffect("panic-emojis");
        break;
      default:
        setEffect(null);
    }
  
    setTimeout(() => setEffect(null), 12000); // Reset effect after 10 seconds
  };
  

  const handleRantSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert("Rant saved! Well done for letting it out.");
    setRant('');
  };


  // Function to generate a fixed number of panic emojis
  useEffect(() => {
    // Add a fixed number of emojis
    const totalEmojis = 30;
    const emojiArray = Array.from({ length: totalEmojis }, (_, index) => index);
    setEmojis(emojiArray); // Initialize the emojis state with 30 emojis
  }, []);

  const generateCompliment = () => {
    const compliment = compliments[Math.floor(Math.random() * compliments.length)];
    setRandomCompliment(compliment);
  };

  const Sparkle: React.FC = () => {
    const size = Math.random() * 20 + 10; // random size between 10-30px
    const left = Math.random() * 100; // % from left
    const duration = Math.random() * 3 + 2; // random duration between 2-5s
    const delay = Math.random() * 2; // random delay
  
    return (
      <div
        className="sparkle"
        style={{
          left: `${left}%`,
          width: `${size}px`,
          height: `${size}px`,
          animationDuration: `${duration}s`,
          animationDelay: `${delay}s`,
        }}
      >
        ✨
      </div>
    );
  };
  

  return (
    
    <div className="app-container">
      <div className="sunflower-decor sunflower-top-left sunflower-float">🌻</div>
  <div className="sunflower-decor sunflower-bottom-right sunflower-float">🌻</div>
  
      {effect === "confetti" && <Confetti numberOfPieces={5000} recycle={false} />}

      {effect === "panic-emojis" && (
     <div className="panic-container">
     {emojis.map((emojiIndex) => (
        <PanicEmoji key={emojiIndex} />
      ))}
       </div>
    )}

<div className="app-content">
      <h1>Rüherei's Wedding 💍</h1>
      <h2>Countdown: {daysLeft} days left!</h2>

      <section>
        <h3>How are you feeling today?</h3>
        {moods.map((m) => (
          <button key={m} onClick={() => handleMoodSelect(m)}>
            {m}
          </button>
        ))}
        {mood && <p>Today's mood: <strong>{mood}</strong></p>}
      </section>

      <section>
        <h3>Need a little boost?</h3>
        <button onClick={generateCompliment}>Get a Compliment</button>
        {randomCompliment && <p><strong>{randomCompliment}</strong></p>}
      </section>
      <WheelPicker />
      <footer>
        <p>Made with love! 💖</p>
      </footer>
    </div>
    </div>
  );
}

export default App;
