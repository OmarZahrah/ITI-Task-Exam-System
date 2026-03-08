export function createQuestion(id, text, choices, correctAnswer) {
  return {
    id: id,
    text: text,
    choices: choices,
    correctAnswer: correctAnswer,
    userAnswer: null,
    isFlagged: false,
  };
}

export function setAnswer(question, answerIndex) {
  question.userAnswer = answerIndex;
}

export function toggleFlag(question) {
  question.isFlagged = !question.isFlagged;
}

export function isAnswerCorrect(question) {
  return question.userAnswer === question.correctAnswer;
}

export async function getAllQuestions() {
  const response = await fetch("./js/questions.json");
  if (!response.ok) {
    throw new Error("Could not load questions.json");
  }

  const questionList = await response.json();
  return questionList.map((item) =>
    createQuestion(item.id, item.text, item.choices, item.correctAnswer),
  );
}
