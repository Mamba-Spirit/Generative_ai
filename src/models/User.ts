export class User {
  username: string;
  scores: Map<string, number>;
  totalPoints: number;
  constructor(username: string) {
    this.username = username;
    this.scores = new Map();
    this.totalPoints = 0;
  }
  addScore(theme: string, points: number): void {
    const currentScore = this.scores.get(theme) || 0;
    this.scores.set(theme, currentScore + points);
    this.totalPoints += points;
  }
  getScoreByTheme(theme: string): number {
    return this.scores.get(theme) || 0;
  }
  getAllScores(): Record<string, number> {
    const result: Record<string, number> = {};
    this.scores.forEach((value, key) => {
      result[key] = value;
    });
    return result;
  }
}