function Progress({
  index,
  amountOfQuestionInQuiz,
  points,
  maxPossiblePoints,
  answer,
}) {
  return (
    <header className="progress">
      <progress
        className="progress-bar"
        max={amountOfQuestionInQuiz}
        value={answer !== null ? index + 1 : index}
      ></progress>
      <p>
        Question <strong>{index + 1}</strong> / {amountOfQuestionInQuiz}
      </p>

      <p>
        <strong>{points}</strong> / {maxPossiblePoints}
      </p>
    </header>
  );
}

export default Progress;
