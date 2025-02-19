function Summary({ correct, incorrect, unattempted }) {
    return (
      <div className="summary">
        <h2>Session Summary</h2>
        <p>Correct Answers: {correct}</p>
        <p>Incorrect Answers: {incorrect}</p>
        <p>Unattempted Flashcards: {unattempted}</p>
        <button onClick={() => window.location.reload()}>Restart</button>
      </div>
    );
  }
  
  export default Summary;  