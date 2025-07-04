import React, { useEffect, useState } from 'react';
import { Quiz } from '../components/Quiz';
import { QuizController } from '../controllers/QuizController';
import { Quiz as QuizModel } from '../models/Quiz';
interface QuizPageProps {
  quizParams: {
    theme: string;
    difficulty: string;
  };
  currentUser: any;
  onFinish: () => void;
}
export function QuizPage({
  quizParams,
  currentUser,
  onFinish
}: QuizPageProps) {
  const [quiz, setQuiz] = useState<QuizModel | null>(null);
  useEffect(() => {
    if (quizParams) {
      const newQuiz = QuizController.createQuiz(quizParams.theme, quizParams.difficulty);
      setQuiz(newQuiz);
    }
  }, [quizParams]);
  if (!quiz) {
    return <div className="text-center py-10">
        <p>Loading quiz...</p>
      </div>;
  }
  return <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1">{quiz.theme} Quiz</h1>
        <p className="text-gray-600">Difficulty: {quiz.difficulty}</p>
      </div>
      <Quiz quiz={quiz} currentUser={currentUser} onFinish={() => onFinish()} />
    </div>;
}