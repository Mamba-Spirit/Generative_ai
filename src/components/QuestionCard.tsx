import React, { useState } from 'react';
import { Question } from '../models/Question';
interface QuestionCardProps {
  question: Question;
  onAnswer: (answer: string) => void;
  showResult: boolean;
  isCorrect: boolean | null;
}
export function QuestionCard({
  question,
  onAnswer,
  showResult,
  isCorrect
}: QuestionCardProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const handleSelectAnswer = (answer: string) => {
    if (showResult) return;
    setSelectedAnswer(answer);
    onAnswer(answer);
  };
  const getButtonClass = (answer: string) => {
    if (!showResult) {
      return selectedAnswer === answer ? 'bg-blue-600 text-white' : 'bg-white hover:bg-gray-100';
    }
    if (answer === question.correctAnswer) {
      return 'bg-green-600 text-white';
    }
    if (selectedAnswer === answer && answer !== question.correctAnswer) {
      return 'bg-red-600 text-white';
    }
    return 'bg-white';
  };
  return <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto">
      <div className="mb-2 text-sm font-medium text-gray-500">
        {question.theme} • {question.difficulty}
      </div>
      <h3 className="text-xl font-bold mb-4">{question.questionText}</h3>
      <div className="space-y-3">
        {question.choices.map((answer, index) => <button key={index} onClick={() => handleSelectAnswer(answer)} disabled={showResult} className={`w-full text-left p-3 border rounded-md transition-colors ${getButtonClass(answer)}`}>
            {answer}
          </button>)}
      </div>
      {showResult && <div className={`mt-4 p-3 rounded-md ${isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {isCorrect ? 'Correct! Well done!' : `Incorrect. The correct answer is: ${question.correctAnswer}`}
        </div>}
    </div>;
}