"use client";

import React from "react";
import { motion } from "framer-motion";
import { Question } from "@/data/questions";
import StarSelector from "./selectors/StarSelector";
import CircleSelector from "./selectors/CircleSelector";
import OptionSelector from "./selectors/OptionSelector";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface QuestionDisplayProps {
  question: Question;
  answer: any;
  onAnswer: (value: any) => void;
  onNext: () => void;
}

const QuestionDisplay: React.FC<QuestionDisplayProps> = ({
  question,
  answer,
  onAnswer,
  onNext,
}) => {
  const handleStarChange = (value: number) => {
    onAnswer(value);
    setTimeout(onNext, 300); // Auto-advance after selection
  };

  const handleCircleChange = (value: number) => {
    onAnswer(value);
    setTimeout(onNext, 300); // Auto-advance after selection
  };

  const handleOptionChange = (value: string) => {
    onAnswer(value);
    setTimeout(onNext, 300); // Auto-advance after selection
  };

  const handleNoNeed = () => {
    onAnswer("Non ho avuto bisogno");
    setTimeout(onNext, 300); // Auto-advance after selection
  };

  return (
    <motion.div
      key={question.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, type: "spring", stiffness: 100 }}
      className="flex flex-col items-center text-center p-6 sm:p-8 w-full"
    >
      <h2 className="text-xl sm:text-2xl font-semibold mb-8 text-gray-800 dark:text-gray-100 min-h-[60px] flex items-center justify-center">
        {question.text}
      </h2>

      <div className="w-full flex justify-center mb-8">
        {question.type === "stars" && question.min !== undefined && question.max !== undefined && (
          <StarSelector
            value={answer}
            onChange={handleStarChange}
            min={question.min}
            max={question.max}
            includeNoNeed={question.includeNoNeed}
            onNoNeed={handleNoNeed}
          />
        )}
        {question.type === "circles" && question.min !== undefined && question.max !== undefined && (
          <CircleSelector
            value={answer}
            onChange={handleCircleChange}
            min={question.min}
            max={question.max}
          />
        )}
        {question.type === "options" && question.options && (
          <OptionSelector
            options={question.options}
            value={answer}
            onChange={handleOptionChange}
          />
        )}
        {question.type === "textarea" && (
          <div className="w-full max-w-md">
            <Textarea
              placeholder="Scrivi la tua risposta qui..."
              value={answer || ""}
              onChange={(e) => onAnswer(e.target.value)}
              className="min-h-[120px] text-base p-4"
            />
            <Button
              onClick={onNext}
              disabled={!answer}
              className="mt-6 px-8 py-3 text-lg gradient-fill text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Invia
            </Button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default QuestionDisplay;