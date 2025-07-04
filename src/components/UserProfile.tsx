import React from 'react';
import { UserIcon, BarChartIcon } from 'lucide-react';
interface UserProfileProps {
  user: any;
}
export function UserProfile({
  user
}: UserProfileProps) {
  const scores = user.getAllScores();
  const themes = ['Drivers', 'Circuits', 'Rules', 'General'];
  return <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center mb-6">
        <div className="bg-gray-200 rounded-full p-3">
          <UserIcon className="w-8 h-8 text-gray-600" />
        </div>
        <div className="ml-4">
          <h2 className="text-xl font-bold">{user.username}</h2>
          <p className="text-gray-600">Total Score: {user.totalPoints}</p>
        </div>
      </div>
      <h3 className="text-lg font-semibold mb-4 flex items-center">
        <BarChartIcon className="w-5 h-5 mr-2" />
        Performance by Theme
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {themes.map(theme => {
        const score = scores[theme] || 0;
        const percentage = Math.min(100, Math.max(0, score / 5)); // Assuming 50 is a perfect score
        return <div key={theme} className="border rounded-md p-4">
              <div className="flex justify-between mb-2">
                <span className="font-medium">{theme}</span>
                <span>{score} points</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-red-600 h-2.5 rounded-full" style={{
              width: `${percentage}%`
            }}></div>
              </div>
            </div>;
      })}
      </div>
    </div>;
}