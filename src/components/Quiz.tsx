import React, { useEffect, useState } from 'react';
import { Quiz as QuizModel } from '../models/Quiz';
import { QuestionCard } from './QuestionCard';
import { UserController } from '../controllers/UserController';

interface QuizProps {
  quiz: QuizModel;
  currentUser: any;
  onFinish: (score: number) => void;
}

export function Quiz({
  quiz,
  currentUser,
  onFinish
}: QuizProps) {
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [isFinished, setIsFinished] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(quiz.currentQuestionIndex);

  const handleAnswer = (answer: string) => {
    const correct = quiz.answerQuestion(answer);
    setIsCorrect(correct);
    setShowResult(true);

    // Delay next question until after resetting UI
    setTimeout(() => {
      setShowResult(false);
      setIsCorrect(null);

      if (quiz.isFinished()) {
        if (currentUser) {
          UserController.updateUserScore(currentUser.username, quiz.theme, quiz.getScore());
        }
        setIsFinished(true);
      } else {
        setQuestionIndex(quiz.currentQuestionIndex);
      }
    }, 2000);
  };

  useEffect(() => {
    if (isFinished) {
      onFinish(quiz.getScore());
    }
  }, [isFinished, onFinish, quiz]);

  const currentQuestion = quiz.questions[questionIndex];

  if (!currentQuestion) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-bold mb-4">Quiz Completed!</h2>
        <p className="text-lg mb-4">
          Your score: {quiz.getScore()} / {quiz.getQuestionCount() * 10}
        </p>
        <button
          onClick={() => onFinish(quiz.getScore())}
          className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700"
        >
          Return to Profile
        </button>
      </div>
    );
  }

  return (
    <div className="py-6">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium">
            Question {questionIndex + 1} of {quiz.getQuestionCount()}
          </span>
          <span className="text-sm font-medium">Score: {quiz.getScore()}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-red-600 h-2.5 rounded-full"
            style={{ width: `${quiz.getProgress()}%` }}
          ></div>
        </div>
      </div>
      <QuestionCard
        question={currentQuestion}
        onAnswer={handleAnswer}
        showResult={showResult}
        isCorrect={isCorrect}
      />
    </div>
  );
}
