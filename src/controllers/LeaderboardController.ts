import { User } from '../models/User';
import { UserController } from './UserController';
export class LeaderboardController {
  static getLeaderboard(theme: string | null = null): User[] {
    const users = UserController.getAllUsers();
    if (theme) {
      // Sort users by theme-specific score
      return [...users].sort((a, b) => {
        const scoreA = a.getScoreByTheme(theme) || 0;
        const scoreB = b.getScoreByTheme(theme) || 0;
        return scoreB - scoreA;
      });
    } else {
      // Sort users by total points
      return [...users].sort((a, b) => b.totalPoints - a.totalPoints);
    }
  }
}