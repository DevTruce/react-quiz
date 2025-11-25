function AnswerHistory({ sortedQuestions, answerHistory }) {
  return (
    <div className="answerResults">
      <h3 style={{ textAlign: "center", marginBottom: "0" }}>Quiz Results</h3>
      {answerHistory.map((value, i) => {
        return (
          <div key={i}>
            <p>Q: {sortedQuestions[i].question}</p>
            <p>
              A: {sortedQuestions[i].options[value]}
              {value === sortedQuestions[i].correctOption ? "✅" : "❌"}
            </p>
          </div>
        );
      })}
    </div>
  );
}

export default AnswerHistory;
