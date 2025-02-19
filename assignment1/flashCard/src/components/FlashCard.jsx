import { useState } from "react";

function FlashCard({ card, onNext, onPrevious, onAnswer }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className="flashcard-container">
      <div className={`flashcard ${flipped ? "flipped" : ""}`} onClick={() => setFlipped(!flipped)}>
        {!flipped ? <p>{card.question}</p> : <p>{card.answer}</p>}
      </div>
      <div className="buttons">
        <button onClick={onPrevious} disabled={!onPrevious}>
          Previous
        </button>
        <button onClick={() => onAnswer(true)}>Correct</button>
        <button onClick={() => onAnswer(false)}>Incorrect</button>
        <button onClick={onNext} disabled={!onNext}>
          Next
        </button>
      </div>
    </div>
  );
}

export default FlashCard;
