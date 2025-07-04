import { Question } from './Question';
export class Quiz {
  theme: string;
  difficulty: string;
  questions: Question[];
  currentScore: number;
  currentQuestionIndex: number;
  constructor(theme: string, difficulty: string, questions: Question[]) {
    this.theme = theme;
    this.difficulty = difficulty;
    this.questions = questions;
    this.currentScore = 0;
    this.currentQuestionIndex = 0;
  }
  getCurrentQuestion(): Question | null {
    if (this.currentQuestionIndex < this.questions.length) {
      return this.questions[this.currentQuestionIndex];
    }
    return null;
  }
  answerQuestion(answer: string): boolean {
    const currentQuestion = this.getCurrentQuestion();
    if (!currentQuestion) return false;
    const isCorrect = currentQuestion.isCorrect(answer);
    if (isCorrect) {
      this.currentScore += 10;
    }
    this.currentQuestionIndex++;
    return isCorrect;
  }
  isFinished(): boolean {
    return this.currentQuestionIndex >= this.questions.length;
  }
  getScore(): number {
    return this.currentScore;
  }
  getProgress(): number {
    return this.currentQuestionIndex / this.questions.length * 100;
  }
  getQuestionCount(): number {
    return this.questions.length;
  }
}