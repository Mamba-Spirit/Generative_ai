import React from 'react';
import { UserProfile } from '../components/UserProfile';
import { Leaderboard } from '../components/Leaderboard';
import { QuizController } from '../controllers/QuizController';
interface ProfilePageProps {
  currentUser: any;
  onStartQuiz: (theme: string, difficulty: string) => void;
}
export function ProfilePage({
  currentUser,
  onStartQuiz
}: ProfilePageProps) {
  const themes = QuizController.getAvailableThemes();
  const difficulties = QuizController.getDifficultyLevels();
  if (!currentUser) {
    return <div className="text-center py-10">
        <p>Please log in to view your profile.</p>
      </div>;
  }
  return <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Your Profile</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <UserProfile user={currentUser} />
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">Quick Start</h2>
          <div className="grid grid-cols-1 gap-4">
            {themes.map(theme => <div key={theme} className="border rounded-md p-4">
                <h3 className="font-medium mb-2">{theme}</h3>
                <div className="grid grid-cols-2 gap-2">
                  {difficulties.map(difficulty => <button key={`${theme}-${difficulty}`} onClick={() => onStartQuiz(theme, difficulty)} className="bg-red-600 text-white py-1 px-2 rounded-md text-sm hover:bg-red-700">
                      {difficulty}
                    </button>)}
                </div>
              </div>)}
          </div>
        </div>
      </div>
      <Leaderboard currentUser={currentUser} />
    </div>;
}