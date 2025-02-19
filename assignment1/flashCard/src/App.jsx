import { useState, useEffect } from "react";
import "./App.css";
import Summary from "./components/Summary";
import FlashCard from "./components/FlashCard";
import Timer from "./components/Timer";

const flashcards = [
  { question: "What is React?", answer: "A JavaScript library for building UI" },
  { question: "What is JSX?", answer: "A syntax extension for JavaScript" },
  { question: "What is a component?", answer: "Reusable UI building blocks" },
];

const localStorageKeys = {
  CORRECT_ANSWERS: "flashcardCorrectAnswers",
  INCORRECT_ANSWERS: "flashcardIncorrectAnswers",
  UNATTEMPTED_CARDS: "unattemptedFlashcards",
  CURRENT_CARD_INDEX: "currentFlashcardIndex",
  TIMER: "studySessionTimer",
};

function App() {
  const [currentIndex, setCurrentIndex] = useState(
    parseInt(localStorage.getItem(localStorageKeys.CURRENT_CARD_INDEX)) || 0
  );
  const [correctAnswers, setCorrectAnswers] = useState(
    parseInt(localStorage.getItem(localStorageKeys.CORRECT_ANSWERS)) || 0
  );
  const [incorrectAnswers, setIncorrectAnswers] = useState(
    parseInt(localStorage.getItem(localStorageKeys.INCORRECT_ANSWERS)) || 0
  );
  const [unattempted, setUnattempted] = useState(
    parseInt(localStorage.getItem(localStorageKeys.UNATTEMPTED_CARDS)) || flashcards.length
  );
  const [timeLeft, setTimeLeft] = useState(
    parseInt(localStorage.getItem(localStorageKeys.TIMER)) || 600
  );
  const [sessionEnded, setSessionEnded] = useState(false);

  useEffect(() => {
    localStorage.setItem(localStorageKeys.CURRENT_CARD_INDEX, currentIndex);
    localStorage.setItem(localStorageKeys.CORRECT_ANSWERS, correctAnswers);
    localStorage.setItem(localStorageKeys.INCORRECT_ANSWERS, incorrectAnswers);
    localStorage.setItem(localStorageKeys.UNATTEMPTED_CARDS, unattempted);
    localStorage.setItem(localStorageKeys.TIMER, timeLeft);
  }, [currentIndex, correctAnswers, incorrectAnswers, unattempted, timeLeft]);

  const handleNext = () => {
    if (currentIndex < flashcards.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleAnswer = (isCorrect) => {
    if (isCorrect) setCorrectAnswers(correctAnswers + 1);
    else setIncorrectAnswers(incorrectAnswers + 1);
    setUnattempted(unattempted - 1);
    handleNext();
  };

  const handleTimeUp = () => {
    setSessionEnded(true);
  };

  if (sessionEnded) {
    return (
      <Summary
        correct={correctAnswers}
        incorrect={incorrectAnswers}
        unattempted={unattempted}
      />
    );
  }

  return (
    <div className="app">
      <h1>Flashcard Study App</h1>
      <Timer timeLeft={timeLeft} setTimeLeft={setTimeLeft} onTimeUp={handleTimeUp} />
      <FlashCard
        card={flashcards[currentIndex]}
        onNext={handleNext}
        onPrevious={handlePrevious}
        onAnswer={handleAnswer}
      />
    </div>
  );
}

export default App;