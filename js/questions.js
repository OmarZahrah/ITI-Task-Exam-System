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

function decodeHTML(html) {
  const textarea = document.createElement("textarea");
  textarea.innerHTML = html;
  return textarea.value;
}

export async function getAllQuestions() {
  const settings = JSON.parse(localStorage.getItem("quizSettings") || "{}");

  const category = settings.category || 18;
  const difficulty = settings.difficulty || "easy";
  const amount = settings.amount || 10;

  const apiUrl = `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=multiple`;

  const response = await fetch(apiUrl);
  if (!response.ok) {
    throw new Error("Failed to load questions from API");
  }

  const data = await response.json();

  if (data.response_code !== 0) {
    throw new Error("API error: Please try different settings");
  }

  return data.results.map((item, index) => {
    const question = decodeHTML(item.question);
    const correctAnswer = decodeHTML(item.correct_answer);
    const incorrectAnswers = item.incorrect_answers.map((ans) =>
      decodeHTML(ans),
    );
    const choices = [correctAnswer, ...incorrectAnswers];
    return createQuestion(index, question, choices, 0);
  });
}
