import { loadData } from "./utils.js";

const reviewSummary = document.getElementById("reviewSummary");
const answersList = document.getElementById("answersList");
const scoreValue = document.getElementById("scoreValue");
const correctValue = document.getElementById("correctValue");
const wrongValue = document.getElementById("wrongValue");
const emptyState = document.getElementById("emptyState");

function initAnswersPage() {
  const result = loadData("quizResult");

  if (!result || !result.questions || result.questions.length === 0) {
    showEmptyState();
    return;
  }

  showAnswersState();
  renderSummary(result);
  renderAnswers(result.questions);
}

function showAnswersState() {
  reviewSummary.classList.remove("d-none");
  emptyState.classList.add("d-none");
}

function showEmptyState() {
  reviewSummary.classList.add("d-none");
  answersList.innerHTML = "";
  emptyState.classList.remove("d-none");
}

function renderSummary(result) {
  const wrongCount = result.total - result.score;

  scoreValue.textContent = `${result.score} / ${result.total}`;
  correctValue.textContent = result.score;
  wrongValue.textContent = wrongCount;
}

function renderAnswers(questions) {
  answersList.innerHTML = "";

  for (let i = 0; i < questions.length; i += 1) {
    const question = questions[i];

    let statusLabel = "Unanswered";
    let statusClass = "status-unanswered";

    if (question.userAnswer !== null && question.userAnswer !== undefined) {
      if (question.userAnswer === question.correctAnswer) {
        statusLabel = "Correct";
        statusClass = "status-correct";
      } else {
        statusLabel = "Wrong";
        statusClass = "status-wrong";
      }
    }

    const card = document.createElement("article");
    card.className = "answer-card";

    const header = document.createElement("header");
    header.className = "answer-head";

    const title = document.createElement("h6");
    title.className = "answer-title";
    title.textContent = `Question ${i + 1}`;

    const statusBadge = document.createElement("span");
    statusBadge.className = `status-badge ${statusClass}`;
    statusBadge.textContent = statusLabel;

    header.appendChild(title);
    header.appendChild(statusBadge);

    const body = document.createElement("div");
    body.className = "answer-body";

    const questionText = document.createElement("p");
    questionText.className = "question-text";
    questionText.textContent = question.text;

    const choiceList = document.createElement("div");
    choiceList.className = "choice-list";

    for (let j = 0; j < question.choices.length; j += 1) {
      const choiceItem = document.createElement("div");
      choiceItem.className = "choice-item";

      const label = document.createElement("span");
      label.className = "choice-label";
      label.textContent = question.choices[j];

      const tag = document.createElement("span");
      tag.className = "choice-tag";

      if (j === question.correctAnswer && j === question.userAnswer) {
        choiceItem.classList.add("user-correct");
        tag.classList.add("tag-your-correct-answer");
        tag.textContent = "Your Correct Answer";
      } else if (j === question.correctAnswer) {
        choiceItem.classList.add("correct");
        tag.classList.add("tag-correct");
        tag.textContent = "Correct Answer";
      } else if (j === question.userAnswer) {
        choiceItem.classList.add("user-wrong");
        tag.classList.add("tag-your-answer");
        tag.textContent = "Your Answer";
      }

      choiceItem.appendChild(label);
      choiceItem.appendChild(tag);
      choiceList.appendChild(choiceItem);
    }

    body.appendChild(questionText);
    body.appendChild(choiceList);

    card.appendChild(header);
    card.appendChild(body);

    answersList.appendChild(card);
  }
}

initAnswersPage();
