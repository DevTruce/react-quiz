import { useQuiz } from "../context/QuizContext";
import AnswerHistory from "./AnswerHistory";

function FinishScreen() {
  const {
    points,
    maxPossiblePoints,
    highscore,
    dispatch,
    sortedQuestions,
    answerHistory,
    showQuizResults,
  } = useQuiz();
  const percentage = (points / maxPossiblePoints) * 100;
  let emoji;
  if (percentage === 100) emoji = "🥇";
  if (percentage >= 80 && percentage < 100) emoji = "🎉";
  if (percentage >= 50 && percentage < 80) emoji = "😊";
  if (percentage >= 0 && percentage < 50) emoji = "🤔";
  if (percentage === 0) emoji = "🤦‍♂️";

  return (
    <>
      <p className="result">
        <span>{emoji}</span>You scored <strong>{points}</strong> out of{" "}
        {maxPossiblePoints} ({Math.ceil(percentage)}%)
      </p>

      <p className="highscore">(Highscore: {highscore} points)</p>

      <div className="finishScreenButtons">
        {showQuizResults === false ? (
          <button
            className="btn btn-ui"
            onClick={() => dispatch({ type: "toggleQuizResults" })}
          >
            Show quiz results
          </button>
        ) : (
          <>
            <AnswerHistory
              sortedQuestions={sortedQuestions}
              answerHistory={answerHistory}
            />
            <button
              className="btn btn-ui"
              onClick={() => dispatch({ type: "toggleQuizResults" })}
            >
              Hide quiz results
            </button>
          </>
        )}
        <button
          className="btn btn-ui"
          onClick={() => dispatch({ type: "restart" })}
        >
          Restart quiz
        </button>
      </div>
    </>
  );
}

export default FinishScreen;
