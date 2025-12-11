import { useQuiz } from "../context/QuizContext";

function Progress() {
  const { index, amountOfQuestionInQuiz, points, maxPossiblePoints, answer } =
    useQuiz();
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
