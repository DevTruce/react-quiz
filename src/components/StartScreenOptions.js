function StartScreenOptions({ numQuestions, dispatch }) {
  return (
    <div className="gameOptions">
      <form>
        <label for="pickDifficulty">Pick a Difficulty </label>
        <select
          id="pickDifficulty"
          required
          onChange={e =>
            dispatch({ type: "changeDifficulty", payload: e.target.value })
          }
        >
          <option value="default">Default</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </form>

      <form>
        <label for="pickAmountOfQuestions">
          Pick amout of questions (1 - {numQuestions}){" "}
        </label>
        <select
          id="pickAmountOfQuestions"
          required
          onChange={e =>
            dispatch({
              type: "changeAmountOfQuestions",
              payload: e.target.value,
            })
          }
        >
          {Array.from({ length: numQuestions }).map((_, i) => (
            <option key={i} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>
      </form>
    </div>
  );
}

export default StartScreenOptions;
