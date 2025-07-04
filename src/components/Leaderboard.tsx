import React, { useState } from 'react';
import { LeaderboardController } from '../controllers/LeaderboardController';
import { TrophyIcon } from 'lucide-react';
interface LeaderboardProps {
  currentUser: any;
}
export function Leaderboard({
  currentUser
}: LeaderboardProps) {
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);
  const themes = ['Drivers', 'Circuits', 'Rules', 'General'];
  const leaderboard = LeaderboardController.getLeaderboard(selectedTheme);
  return <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold flex items-center">
          <TrophyIcon className="w-5 h-5 mr-2 text-yellow-500" />
          Leaderboard
        </h2>
        <div className="flex space-x-2">
          <button onClick={() => setSelectedTheme(null)} className={`px-3 py-1 rounded-md text-sm ${!selectedTheme ? 'bg-red-600 text-white' : 'bg-gray-100'}`}>
            All
          </button>
          {themes.map(theme => <button key={theme} onClick={() => setSelectedTheme(theme)} className={`px-3 py-1 rounded-md text-sm ${selectedTheme === theme ? 'bg-red-600 text-white' : 'bg-gray-100'}`}>
              {theme}
            </button>)}
        </div>
      </div>
      {leaderboard.length === 0 ? <p className="text-center py-4 text-gray-500">
          No scores recorded yet.
        </p> : <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="px-4 py-2 text-left">Rank</th>
                <th className="px-4 py-2 text-left">User</th>
                <th className="px-4 py-2 text-right">Score</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((user, index) => {
            const score = selectedTheme ? user.getScoreByTheme(selectedTheme) : user.totalPoints;
            const isCurrentUser = currentUser && user.username === currentUser.username;
            return <tr key={user.username} className={`border-b ${isCurrentUser ? 'bg-blue-50' : ''}`}>
                    <td className="px-4 py-2">
                      {index === 0 ? <span className="text-yellow-500 font-bold">
                          🥇 1st
                        </span> : index === 1 ? <span className="text-gray-400 font-bold">🥈 2nd</span> : index === 2 ? <span className="text-amber-700 font-bold">🥉 3rd</span> : `${index + 1}th`}
                    </td>
                    <td className="px-4 py-2">
                      {user.username}
                      {isCurrentUser && <span className="ml-2 text-xs text-blue-600">
                          (You)
                        </span>}
                    </td>
                    <td className="px-4 py-2 text-right font-medium">
                      {score}
                    </td>
                  </tr>;
          })}
            </tbody>
          </table>
        </div>}
    </div>;
}