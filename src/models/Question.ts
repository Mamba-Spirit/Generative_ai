export class Question {
  id: number;
  theme: string;
  difficulty: string;
  questionText: string;
  choices: string[];
  correctAnswer: string;
  constructor(id: number, theme: string, difficulty: string, questionText: string, choices: string[], correctAnswer: string) {
    this.id = id;
    this.theme = theme;
    this.difficulty = difficulty;
    this.questionText = questionText;
    this.choices = choices;
    this.correctAnswer = correctAnswer;
  }
  isCorrect(answer: string): boolean {
    return answer === this.correctAnswer;
  }
}