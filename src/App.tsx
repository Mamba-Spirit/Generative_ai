import React, { useEffect, useState } from 'react';
import { Home } from './views/Home';
import { QuizPage } from './views/QuizPage';
import { ProfilePage } from './views/ProfilePage';
import { Navigation } from './components/Navigation';
import { UserController } from './controllers/UserController';
export function App() {
  const [currentView, setCurrentView] = useState('home');
  const [currentUser, setCurrentUser] = useState(null);
  const [quizParams, setQuizParams] = useState(null);
  useEffect(() => {
    // Check if user is logged in
    const user = UserController.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
  }, []);
  const navigateTo = view => {
    setCurrentView(view);
  };
  const startQuiz = (theme, difficulty) => {
    setQuizParams({
      theme,
      difficulty
    });
    setCurrentView('quiz');
  };
  const handleLogin = username => {
    const user = UserController.loginUser(username);
    setCurrentUser(user);
    navigateTo('profile');
  };
  const handleLogout = () => {
    UserController.logoutUser();
    setCurrentUser(null);
    navigateTo('home');
  };
  const renderView = () => {
    switch (currentView) {
      case 'home':
        return <Home onStartQuiz={startQuiz} onLogin={handleLogin} currentUser={currentUser} />;
      case 'quiz':
        return (
          <QuizPage
            quizParams={quizParams}
            currentUser={currentUser}
            onFinish={() => {
              const updatedUser = UserController.getCurrentUser();
              setCurrentUser(updatedUser); // <- this refreshes the user state
              navigateTo('profile');
            }}
          />
          );

      case 'profile':
        return <ProfilePage currentUser={currentUser} onStartQuiz={startQuiz} />;
      default:
        return <Home onStartQuiz={startQuiz} onLogin={handleLogin} currentUser={currentUser} />;
    }
  };
  return <div className="min-h-screen bg-gray-100 text-gray-900">
      <Navigation currentView={currentView} navigateTo={navigateTo} currentUser={currentUser} onLogout={handleLogout} />
      <main className="container mx-auto px-4 py-8">{renderView()}</main>
    </div>;
}