import { Quiz } from '../models/Quiz';
import { Question } from '../models/Question';
import { getQuestionsByThemeAndDifficulty } from '../data/questions';
export class QuizController {
  static createQuiz(theme: string, difficulty: string): Quiz {
    const questions = getQuestionsByThemeAndDifficulty(theme, difficulty);
    return new Quiz(theme, difficulty, questions);
  }
  static getAvailableThemes(): string[] {
    return ['Drivers', 'Circuits', 'Rules', 'General'];
  }
  static getDifficultyLevels(): string[] {
    return ['General Audience', 'Enthusiasts'];
  }
}