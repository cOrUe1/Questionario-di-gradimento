"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { questions, Question } from "@/data/questions";
import IntroScreen from "./IntroScreen";
import QuestionDisplay from "./QuestionDisplay";
import ProgressBar from "./ProgressBar";
import BackButton from "./BackButton";
import NextButton from "./NextButton";
import { Button } from "@/components/ui/button";
import { showSuccess, showError } from "@/utils/toast";

interface Answers {
  [key: string]: any;
}

const SurveyCard: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(-1); // -1 for intro, questions.length for final message
  const [answers, setAnswers] = useState<Answers>({});
  const [surveyStarted, setSurveyStarted] = useState(false);
  const [surveyCompleted, setSurveyCompleted] = useState(false);
  const [touchStartX, setTouchStartX] = useState(0);
  const [highestQuestionIndexReached, setHighestQuestionIndexReached] = useState(-1); // Tracks the furthest index reached

  const currentQuestion = questions[currentQuestionIndex];
  const progress = currentQuestionIndex >= 0 ? (currentQuestionIndex + 1) / questions.length : 0;

  // *** VERIFICA E AGGIORNA QUESTO URL SE È CAMBIATO DOPO LA RIDISTRIBUZIONE ***
  const GOOGLE_APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyAdjsA3B-iuv-U3jJVyzFm02HB6DWvdq1b9nsh0ntE_-Xw8zSG5uqmPZDM8NpvHf32lQ/exec"; 

  const handleStartSurvey = () => {
    setSurveyStarted(true);
    setCurrentQuestionIndex(0);
    setHighestQuestionIndexReached(0);
  };

  const handleAnswer = useCallback((value: any) => {
    if (currentQuestion) {
      setAnswers((prev) => ({ ...prev, [currentQuestion.id]: value }));
    }
  }, [currentQuestion]);

  const handleSubmitSurvey = useCallback(async () => {
    try {
      const response = await fetch(GOOGLE_APPS_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors", // Important for Apps Script web apps
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(answers),
      });

      // Since mode is 'no-cors', response.ok will always be false.
      // We rely on the Apps Script to handle the data and assume success if no network error.
      console.log("Dati del sondaggio inviati:", answers);
      showSuccess("Grazie per il tuo tempo! 🎉 Le risposte sono state salvate con successo.");
    } catch (error) {
      console.error("Si è verificato un errore durante l'invio del sondaggio:", error);
      showError("Si è verificato un errore durante il salvataggio delle risposte.");
    } finally {
      setSurveyCompleted(true);
    }
  }, [answers, GOOGLE_APPS_SCRIPT_URL]);

  const handleNextQuestion = useCallback(() => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => {
        const newIndex = prev + 1;
        setHighestQuestionIndexReached((prevHighest) => Math.max(prevHighest, newIndex));
        return newIndex;
      });
    } else {
      handleSubmitSurvey(); // Call the submission function when survey is completed
    }
  }, [currentQuestionIndex, questions.length, handleSubmitSurvey]);

  const handlePreviousQuestion = useCallback(() => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    } else if (currentQuestionIndex === 0) {
      setSurveyStarted(false);
      setCurrentQuestionIndex(-1);
    }
  }, [currentQuestionIndex]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (surveyStarted && !surveyCompleted) {
        if (event.key === "ArrowRight") {
          // Allow advancing with arrow key if an answer exists or if it's a textarea and there's text
          if (currentQuestion?.type !== "textarea" && answers[currentQuestion?.id || ""]) {
            handleNextQuestion();
          } else if (currentQuestion?.type === "textarea" && answers[currentQuestion?.id || ""]) {
            handleNextQuestion();
          }
        } else if (event.key === "ArrowLeft") {
          handlePreviousQuestion();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [surveyStarted, surveyCompleted, currentQuestion, answers, handleNextQuestion, handlePreviousQuestion]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEndX = e.changedTouches[0].clientX;
    const deltaX = touchEndX - touchStartX;

    if (surveyStarted && !surveyCompleted) {
      if (deltaX > 50) { // Swipe right for previous
        handlePreviousQuestion();
      } else if (deltaX < -50) { // Swipe left for next
        // Only allow swipe forward if the current question is answered (for auto-advance types)
        // For textarea, the button handles next, so swipe won't auto-advance here.
        if (currentQuestion?.type !== "textarea" && answers[currentQuestion?.id || ""]) {
          handleNextQuestion();
        } else if (currentQuestion?.type === "textarea" && answers[currentQuestion?.id || ""]) {
          // If it's a textarea, and there's an answer, allow swipe to next
          handleNextQuestion();
        }
      }
    }
  };

  return (
    <motion.div
      className="relative bg-white dark:bg-gray-900 rounded-xl shadow-lg p-4 sm:p-6 w-full max-w-md mx-auto flex flex-col min-h-[380px] sm:min-h-[420px] justify-between"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <AnimatePresence mode="wait">
        {!surveyStarted && !surveyCompleted && (
          <IntroScreen onStart={handleStartSurvey} />
        )}
        {surveyStarted && !surveyCompleted && currentQuestion && (
          <QuestionDisplay
            key={currentQuestion.id}
            question={currentQuestion}
            answer={answers[currentQuestion.id] || null}
            onAnswer={handleAnswer}
            onNext={handleNextQuestion}
          />
        )}
        {surveyCompleted && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, type: "spring", stiffness: 100 }}
            className="flex flex-col items-center text-center p-6 sm:p-8"
          >
            <h2 className="text-2xl sm:text-3xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
              Grazie per il tuo tempo! 🎉
            </h2>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 mb-8">
              Le risposte sono state salvate con successo.
            </p>
            <Button
              onClick={() => {
                // Reset survey or close popup
                setSurveyStarted(false);
                setSurveyCompleted(false);
                setCurrentQuestionIndex(-1);
                setAnswers({});
                setHighestQuestionIndexReached(-1); // Reset highest reached index
              }}
              className="px-8 py-3 text-lg gradient-fill text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Chiudi
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {surveyStarted && !surveyCompleted && (
        <>
          <div className="absolute bottom-12 w-[calc(100%-32px)] left-4 right-4">
            <ProgressBar progress={progress} />
          </div>
          {currentQuestionIndex > 0 && (
            <BackButton onClick={handlePreviousQuestion} />
          )}
          {currentQuestionIndex < highestQuestionIndexReached && (
            <NextButton onClick={handleNextQuestion} />
          )}
        </>
      )}
    </motion.div>
  );
};

export default SurveyCard;