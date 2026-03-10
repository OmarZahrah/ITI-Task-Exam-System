import { Quiz } from "./quiz.js";
import {
  loadData,
  removeData,
  startTimer,
  getFormattedTime,
  isTimerDanger,
} from "./utils.js";
import { checkAuth } from "./auth.js";

let quiz = null;
let isTimeExpired = false;

const timer = document.getElementById("timer");
const questionList = document.getElementById("qlist");
const questionNum = document.getElementById("num");
const questionTotal = document.getElementById("total");
const questionText = document.getElementById("qtext");
const choicesContainer = document.getElementById("choices");
const progressBar = document.getElementById("progressBar");
const progressText = document.getElementById("progressText");
const prevBtn = document.getElementById("prev");
const flagBtn = document.getElementById("flag");
const nextBtn = document.getElementById("next");
const submitBtn = document.getElementById("submitBtn");
const logoutBtn = document.getElementById("logoutBtn");

async function init() {
  checkAuth();

  quiz = await Quiz.create();

  const savedState = loadData("quiz");
  if (savedState) {
    quiz.loadState(savedState);
  }

  setupEvents();
  showQuestion();
  showQuestionList();
  updateProgress();
  startQuizTimer();
}

function setupEvents() {
  prevBtn.addEventListener("click", handlePrevious);
  nextBtn.addEventListener("click", handleNext);
  flagBtn.addEventListener("click", handleFlag);
  submitBtn.addEventListener("click", handleSubmit);
  logoutBtn.addEventListener("click", handleLogout);
}

function startQuizTimer() {
  quiz.timer.onEnd = () => {
    isTimeExpired = true;
    alert("Time is up! Your answered questions will be submitted.");
    submitQuiz();
  };

  startTimer(quiz.timer);
  updateTimer();

  setInterval(() => {
    updateTimer();
    quiz.saveState();
  }, 1000);
}

function updateTimer() {
  timer.textContent = getFormattedTime(quiz.timer);

  if (isTimerDanger(quiz.timer)) {
    timer.classList.add("danger");
  } else {
    timer.classList.remove("danger");
  }
}

function showQuestion() {
  const question = quiz.getCurrentQuestion();

  questionNum.textContent = quiz.currentIndex + 1;
  questionTotal.textContent = quiz.getTotalQuestions();
  questionText.textContent = question.text;

  showChoices(question);
  updateButtons();
  updateFlagButton();
  updateProgress();
}

function showChoices(question) {
  choicesContainer.innerHTML = "";

  question.choices.forEach((choice, index) => {
    const choiceDiv = createChoiceElement(
      choice,
      index,
      question.userAnswer === index,
    );
    const input = choiceDiv.querySelector("input");

    input.id = `choice-${index}`;
    input.checked = question.userAnswer === index;

    choiceDiv.addEventListener("click", () => {
      input.checked = true;
      selectChoice(index);
    });

    choicesContainer.appendChild(choiceDiv);
  });
}

function selectChoice(index) {
  quiz.saveAnswer(index);
  showQuestionList();
  updateProgress();
  showChoices(quiz.getCurrentQuestion());
}

function updateButtons() {
  prevBtn.disabled = quiz.currentIndex === 0;
  nextBtn.disabled = quiz.currentIndex === quiz.getTotalQuestions() - 1;
}

function updateFlagButton() {
  if (quiz.isCurrentQuestionFlagged()) {
    flagBtn.classList.add("active");
  } else {
    flagBtn.classList.remove("active");
  }
}

function showQuestionList() {
  questionList.innerHTML = "";

  quiz.questions.forEach((question, index) => {
    const btn = document.createElement("button");
    btn.className = "question-btn";
    btn.type = "button";
    btn.textContent = index + 1;

    if (index === quiz.currentIndex) {
      btn.classList.add("current");
    }
    if (quiz.answers[index] !== null) {
      btn.classList.add("answered");
    }
    if (quiz.flags.includes(index)) {
      btn.classList.add("flagged");
    }

    btn.addEventListener("click", () => {
      quiz.goToQuestion(index);
      showQuestion();
      showQuestionList();
    });

    questionList.appendChild(btn);
  });
}

function createChoiceElement(choiceText, index, isSelected) {
  const choiceDiv = document.createElement("div");
  choiceDiv.className = "choice";

  const input = document.createElement("input");
  input.type = "radio";
  input.name = "answer";
  input.id = `choice-${index}`;
  input.checked = isSelected;

  const label = document.createElement("label");
  label.htmlFor = `choice-${index}`;
  label.textContent = choiceText;

  if (isSelected) {
    choiceDiv.classList.add("selected");
  }

  choiceDiv.appendChild(input);
  choiceDiv.appendChild(label);
  return choiceDiv;
}

function updateProgress() {
  const answered = quiz.countAnswered();
  const total = quiz.getTotalQuestions();
  const percent = quiz.getProgress();

  progressBar.style.width = `${percent}%`;
  progressText.textContent = `${answered} / ${total}`;
}

function handlePrevious() {
  if (quiz.goToPrevious()) {
    showQuestion();
    showQuestionList();
    quiz.saveState();
  }
}

function handleNext() {
  if (quiz.goToNext()) {
    showQuestion();
    showQuestionList();
    quiz.saveState();
  }
}

function handleFlag() {
  quiz.toggleQuestionFlag();
  updateFlagButton();
  showQuestionList();
}

function handleSubmit() {
  if (!isTimeExpired && !quiz.isAllAnswered()) {
    alert("Please answer all questions first");
    return;
  }

  const confirmed = confirm("Are you sure you want to submit your quiz?");
  if (!confirmed) return;

  submitQuiz();
}

function submitQuiz() {
  const result = quiz.submitQuiz();
  if (result) {
    window.location.href = "results.html";
  }
}

function handleLogout() {
  removeData("currentUser");
  removeData("quiz");
  window.location.href = "login.html";
}

init().catch(() => {
  alert("Could not load questions. Please refresh the page.");
});
