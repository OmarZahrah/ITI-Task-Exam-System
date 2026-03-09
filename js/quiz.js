import {
  saveData,
  loadData,
  removeData,
  createTimer,
  stopTimer,
  getTimeLeft,
} from "./utils.js";
import {
  getAllQuestions,
  setAnswer,
  toggleFlag,
  isAnswerCorrect,
} from "./questions.js";

const QUIZ_DURATION_MINUTES = 30;

export class Quiz {
  constructor(questions) {
    this.questions = questions;
    this.currentIndex = 0;
    this.answers = new Array(this.questions.length).fill(null);
    this.flags = [];
    this.timer = createTimer(QUIZ_DURATION_MINUTES * 60);
    this.isSubmitted = false;
  }

  static async create() {
    const questions = await getAllQuestions();
    return new Quiz(questions);
  }

  getCurrentQuestion() {
    return this.questions[this.currentIndex];
  }

  getTotalQuestions() {
    return this.questions.length;
  }

  saveAnswer(answerIndex) {
    this.answers[this.currentIndex] = answerIndex;
    setAnswer(this.getCurrentQuestion(), answerIndex);
    this.saveState();
  }

  toggleQuestionFlag() {
    const flagIndex = this.flags.indexOf(this.currentIndex);
    if (flagIndex > -1) {
      this.flags.splice(flagIndex, 1);
    } else {
      this.flags.push(this.currentIndex);
    }
    toggleFlag(this.getCurrentQuestion());
    this.saveState();
  }

  isCurrentQuestionFlagged() {
    return this.flags.includes(this.currentIndex);
  }

  goToNext() {
    if (this.currentIndex < this.questions.length - 1) {
      this.currentIndex += 1;
      return true;
    }
    return false;
  }

  goToPrevious() {
    if (this.currentIndex > 0) {
      this.currentIndex -= 1;
      return true;
    }
    return false;
  }

  goToQuestion(index) {
    if (index >= 0 && index < this.questions.length) {
      this.currentIndex = index;
      return true;
    }
    return false;
  }

  countAnswered() {
    return this.answers.filter((answer) => answer !== null).length;
  }

  getProgress() {
    return (this.countAnswered() / this.questions.length) * 100;
  }

  isAllAnswered() {
    return this.countAnswered() === this.questions.length;
  }

  calculateScore() {
    let score = 0;
    this.questions.forEach((question) => {
      if (isAnswerCorrect(question)) {
        score += 1;
      }
    });
    return score;
  }

  submitQuiz() {
    if (this.isSubmitted) return null;

    this.isSubmitted = true;
    stopTimer(this.timer);

    const total = this.questions.length;
    const score = this.calculateScore();

    const result = {
      score: score,
      total: total,
      percentage: Math.round((score / total) * 100),
      answered: this.countAnswered(),
      flags: [...this.flags],
      submittedAt: new Date().toISOString(),
      questions: this.questions.map((q) => ({
        id: q.id,
        text: q.text,
        choices: q.choices,
        correctAnswer: q.correctAnswer,
        userAnswer: q.userAnswer,
        isFlagged: q.isFlagged,
      })),
    };

    saveData("quizResult", result);
    removeData("quiz");
    return result;
  }

  saveState() {
    const state = {
      currentIndex: this.currentIndex,
      answers: this.answers,
      flags: this.flags,
      timerSeconds: getTimeLeft(this.timer),
    };
    saveData("quiz", state);
  }

  loadState(state) {
    this.currentIndex = state.currentIndex || 0;
    this.answers = state.answers || this.answers;
    this.flags = state.flags || [];

    if (typeof state.timerSeconds === "number") {
      this.timer.seconds = state.timerSeconds;
    }

    this.questions.forEach((question, index) => {
      const answer = this.answers[index];
      if (answer !== null && answer !== undefined) {
        setAnswer(question, answer);
      }
      question.isFlagged = this.flags.includes(index);
    });
  }
}
