import { User } from '../models/User';
export class UserController {
  private static STORAGE_KEY = 'f1quiz_users';
  private static CURRENT_USER_KEY = 'f1quiz_current_user';
  static getAllUsers(): User[] {
    const usersJson = localStorage.getItem(this.STORAGE_KEY);
    if (!usersJson) return [];
    const usersData = JSON.parse(usersJson);
    return usersData.map((userData: any) => {
      const user = new User(userData.username);
      user.totalPoints = userData.totalPoints;
      user.scores = new Map(Object.entries(userData.scores || {}));
      return user;
    });
  }
  static saveUsers(users: User[]): void {
    const usersData = users.map(user => ({
      username: user.username,
      totalPoints: user.totalPoints,
      scores: Object.fromEntries(user.scores)
    }));
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(usersData));
  }
  static getCurrentUser(): User | null {
    const username = localStorage.getItem(this.CURRENT_USER_KEY);
    if (!username) return null;
    const users = this.getAllUsers();
    return users.find(user => user.username === username) || null;
  }
  static loginUser(username: string): User {
    let users = this.getAllUsers();
    let user = users.find(u => u.username === username);
    if (!user) {
      user = new User(username);
      users.push(user);
      this.saveUsers(users);
    }
    localStorage.setItem(this.CURRENT_USER_KEY, username);
    return user;
  }
  static logoutUser(): void {
    localStorage.removeItem(this.CURRENT_USER_KEY);
  }
  static updateUserScore(username: string, theme: string, points: number): User | null {
    const users = this.getAllUsers();
    const userIndex = users.findIndex(u => u.username === username);
    if (userIndex === -1) return null;
    users[userIndex].addScore(theme, points);
    this.saveUsers(users);
    return users[userIndex];
  }
}