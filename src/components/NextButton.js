function NextButton({ answer, dispatch, amountOfQuestionInQuiz, index }) {
  if (answer === null) return;

  if (index < amountOfQuestionInQuiz - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "nextQuestion" })}
      >
        Next
      </button>
    );

  if (index === amountOfQuestionInQuiz - 1 && answer !== null)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "finish" })}
      >
        Finish
      </button>
    );
}

export default NextButton;
