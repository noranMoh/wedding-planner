import { useState, useEffect } from 'react';
import Confetti from 'react-confetti';
import { PanicEmoji } from './components/PanicEmoji';
import './App.css';
import WheelPicker from './components/WheelPicker';
import WeddingCountdown from './components/WeddingCountDown';

const compliments: string[] = [
  "You're doing amazing!",
  "Don’t worry if it looks like chaos right now — moving always starts messy and ends with a new beginning.",
  "If blurry WhatsApp photos furniture shopping didn’t break you, a few wedding mood swings have no chance.",
  "One day, none of this will feel heavy — it will feel like the beginning of your favorite story.",
  "Everything will be perfect, just like you.",
  "Take a deep breath, you've got this!",
  "You’ve made it through every hard day before — you’ll get through this one too.",
  "The people who matter will remember the joy, not the details.",
  "You don’t have to figure it all out today.",
  "The flowers don’t know if they match the napkins. They bloom anyway. So will you.",
  "You’ve already done the hardest parts: you said yes, you stayed kind, you kept showing up. That’s the real celebration.",
  "If you ever feel stressed, just remember: you are days away from sipping something cold in the Maldives while being fanned by sea wind and sweet, sunlit peace.",
  "Wedding stress, huh? I miss the golden era… when your biggest meltdown was about being homeless and your couch lived in a wishlist.",
  "One day you’ll tell the story of this chaos — and you’ll laugh so hard your cheeks hurt. That day is coming. And it’ll be beautiful.",
  "Dear stressed bride, I love you and I'm here for you",
  "You know what’s better than labeling boxes? Buying new stuff later because you can’t find the old ones. Don't stress.",
  "Somewhere on a beach in the near future, you are rested, radiant, and absolutely unreachable.",
  "You don’t need to be calm. You need a hug. Consider this a digital version of that.",
  "I know you’re exhausted. I also know you’ve survived 100 days worse than this. Keep going.",
  "You’re tired, but guess what? Tired people still get things done. Because we have no other choice.."
];

const moods: string[] = ["Excited", "Stressed"];

function App() {
  const [displayedText, setDisplayedText] = useState("");
  const [emojis, setEmojis] = useState<number[]>([]);
  const [randomCompliment, setRandomCompliment] = useState<string>('');

  const [effect, setEffect] = useState<string | null>(null);

  const handleMoodSelect = (selectedMood: string) => {
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
    setDisplayedText(""); // reset text to retype it
  };
  
  useEffect(() => {
    if (!randomCompliment) return;
  
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText((prev) => prev + randomCompliment[i]);
      i++;
  
      if (i >= randomCompliment.length) {
        clearInterval(interval);
      }
    }, 50); // ⌨️ typing speed
  
    return () => clearInterval(interval);
  }, [randomCompliment]);
  

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
      <WeddingCountdown/>

      <section className="bubble-card">
  <h3 className="bubble-title">🌞 How are you feeling today?</h3>
  <div className="mood-buttons">
    {moods.map((m) => (
      <button key={m} className="bubble-button" onClick={() => handleMoodSelect(m)}>
        {m}
      </button>
    ))}
  </div>
</section>

<section className="bubble-card">
  <h3 className="bubble-title">💌 Need a little boost?</h3>
  <button className="bubble-button" onClick={generateCompliment}>
    Yes!
  </button>
  
  {randomCompliment && (
  <p className="compliment-text">
    <strong>✨ {displayedText}</strong>
    <span className="typing-cursor">|</span>
  </p>
  )}
  
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
