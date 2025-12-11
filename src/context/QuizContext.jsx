import useFetchData from "../components/useFetchData";
import useUpdateHighscore from "../components/useUpdateHighscore";

import { createContext, useContext, useReducer } from "react";
const QuizContext = createContext();

const SECS_PER_QUESTION = 15;
const initialState = {
  questions: [],
  sortedQuestions: [],
  answerHistory: [],

  // 'loading', 'error', 'ready', 'active', 'finished'
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null,
  amountOfQuestionInQuiz: 0,
  quizDifficulty: "default", // "easy", "medium" "hard"
  showQuizResults: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        sortedQuestions: action.payload,
        status: "ready",
        amountOfQuestionInQuiz: action.payload.length,
      };

    case "dataFailed":
      return {
        ...state,
        status: "error",
      };

    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.amountOfQuestionInQuiz * SECS_PER_QUESTION,
      };

    case "newAnswer":
      const question = state.sortedQuestions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
        answerHistory: [...state.answerHistory, action.payload],
      };

    case "nextQuestion":
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };

    case "finish":
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };

    case "restart":
      return {
        ...initialState,
        questions: state.questions,
        sortedQuestions: state.sortedQuestions,
        highscore: state.highscore,
        status: "ready",
        amountOfQuestionInQuiz: state.amountOfQuestionInQuiz,
      };

    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };

    case "changeAmountOfQuestions":
      return {
        ...state,
        amountOfQuestionInQuiz:
          action.payload > state.sortedQuestions.length
            ? alert(
                `Sorry, the number must be greater than 0 and less than ${state.sortedQuestions.length}.`
              )
            : action.payload,
      };

    case "changeDifficulty":
      const newSortedArray =
        action.payload === "default"
          ? state.questions.map((question, index) => question)
          : state.questions.filter(
              question => question.difficulty === action.payload
            );
      return {
        ...state,
        quizDifficulty: action.payload,
        sortedQuestions: newSortedArray,
        amountOfQuestionInQuiz: newSortedArray.length,
      };

    case "toggleQuizResults":
      return {
        ...state,
        showQuizResults: !state.showQuizResults,
      };

    case "establishHighscore":
      return {
        ...state,
        highscore: action.payload.highscore,
      };

    default:
      throw new Error("Unknown action");
  }
}

function QuizProvider({ children }) {
  const [
    {
      questions,
      sortedQuestions,
      status,
      index,
      answer,
      points,
      highscore,
      secondsRemaining,
      amountOfQuestionInQuiz,
      quizDifficulty,
      answerHistory,
      showQuizResults,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  useFetchData(
    `http://localhost:8000/questions`,
    5000,
    dispatch,
    "dataReceived"
  );

  useFetchData(
    `http://localhost:8000/highscore`,
    5000,
    dispatch,
    "establishHighscore"
  );

  useUpdateHighscore(
    "http://localhost:8000/highscore",
    5000,
    points,
    highscore,
    status
  );

  const numQuestions = sortedQuestions.length;
  let maxPossiblePoints = 0;
  for (let i = 0; i < amountOfQuestionInQuiz; i++) {
    maxPossiblePoints += Number(sortedQuestions[i].points);
  }

  return (
    <QuizContext.Provider
      value={{
        questions,
        sortedQuestions,
        status,
        index,
        answer,
        points,
        highscore,
        secondsRemaining,
        amountOfQuestionInQuiz,
        quizDifficulty,
        answerHistory,
        showQuizResults,
        numQuestions,
        maxPossiblePoints,
        dispatch,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

function useQuiz() {
  const context = useContext(QuizContext);

  if (context === undefined)
    throw new Error("useQuiz must be used within a QuizProvider");

  return context;
}

export { QuizProvider, useQuiz };
