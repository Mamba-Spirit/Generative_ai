import React, { useState } from 'react';
import { QuizController } from '../controllers/QuizController';
import { FlagIcon, UserIcon, TrophyIcon } from 'lucide-react';
interface HomeProps {
  onStartQuiz: (theme: string, difficulty: string) => void;
  onLogin: (username: string) => void;
  currentUser: any;
}
export function Home({
  onStartQuiz,
  onLogin,
  currentUser
}: HomeProps) {
  const [username, setUsername] = useState('');
  const [selectedTheme, setSelectedTheme] = useState('Drivers');
  const [selectedDifficulty, setSelectedDifficulty] = useState('General Audience');
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      onLogin(username.trim());
    }
  };
  const themes = QuizController.getAvailableThemes();
  const difficulties = QuizController.getDifficultyLevels();
  return <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <FlagIcon className="w-16 h-16 mx-auto text-red-600 mb-4" />
        <h1 className="text-4xl font-bold mb-2">F1 Quiz Master</h1>
        <p className="text-xl text-gray-600">
          Test your Formula 1 knowledge with our interactive quiz!
        </p>
      </div>
      {!currentUser ? <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <UserIcon className="w-5 h-5 mr-2" />
            Sign In to Start
          </h2>
          <form onSubmit={handleLogin} className="max-w-md mx-auto">
            <div className="mb-4">
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              <input type="text" id="username" value={username} onChange={e => setUsername(e.target.value)} className="w-full p-2 border rounded-md" placeholder="Enter your username" required />
            </div>
            <button type="submit" className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700">
              Start Quizzing
            </button>
          </form>
        </div> : <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <TrophyIcon className="w-5 h-5 mr-2" />
            Start a New Quiz
          </h2>
          <div className="max-w-md mx-auto">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Select Theme
              </label>
              <div className="grid grid-cols-2 gap-2">
                {themes.map(theme => <button key={theme} onClick={() => setSelectedTheme(theme)} className={`p-2 border rounded-md ${selectedTheme === theme ? 'bg-red-600 text-white' : 'bg-white'}`}>
                    {theme}
                  </button>)}
              </div>
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Select Difficulty
              </label>
              <div className="grid grid-cols-2 gap-2">
                {difficulties.map(difficulty => <button key={difficulty} onClick={() => setSelectedDifficulty(difficulty)} className={`p-2 border rounded-md ${selectedDifficulty === difficulty ? 'bg-red-600 text-white' : 'bg-white'}`}>
                    {difficulty}
                  </button>)}
              </div>
            </div>
            <button onClick={() => onStartQuiz(selectedTheme, selectedDifficulty)} className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700">
              Start Quiz
            </button>
          </div>
        </div>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <div className="w-5 h-5 mr-2" />
            General Audience
          </h2>
          <p className="text-gray-600 mb-4">
            Perfect for casual fans with a basic understanding of Formula 1.
            Questions focus on:
          </p>
          <ul className="list-disc pl-5 text-gray-600">
            <li>Popular drivers and teams</li>
            <li>Famous circuits</li>
            <li>Basic rules and terminology</li>
            <li>Recent championships</li>
          </ul>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <div className="w-5 h-5 mr-2" />
            Enthusiasts
          </h2>
          <p className="text-gray-600 mb-4">
            Designed for die-hard F1 fans with deep technical knowledge.
            Questions include:
          </p>
          <ul className="list-disc pl-5 text-gray-600">
            <li>Technical regulations and specifications</li>
            <li>Historical statistics and records</li>
            <li>Detailed circuit knowledge</li>
            <li>Team strategies and development</li>
          </ul>
        </div>
      </div>
    </div>;
}