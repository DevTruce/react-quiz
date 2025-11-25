import StartScreenOptions from "./StartScreenOptions";

export default function StartScreen({
  numQuestions,
  dispatch,
  quizDifficulty,
}) {
  return (
    <div className="start">
      <h2>Welcome to The React Quiz!</h2>
      <h3>
        {numQuestions} possible questions ({quizDifficulty})
      </h3>

      <StartScreenOptions numQuestions={numQuestions} dispatch={dispatch} />
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "start" })}
      >
        Let's start
      </button>
    </div>
  );
}
