import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { questions, Question } from "@/data/questions";
import IntroScreen from "./IntroScreen";
import QuestionDisplay from "./QuestionDisplay";
import ProgressBar from "./ProgressBar";
import BackButton from "./BackButton";
import { Button } from "@/components/ui/button";
import { showSuccess, showError } from "@/utils/toast"; // Modifica qui

interface Answers {
  [key: string]: any;
}

const SurveyCard: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(-1); // -1 for intro, questions.length for final message
  const [answers, setAnswers] = useState<Answers>({});
  const [surveyStarted, setSurveyStarted] = useState(false);
  const [surveyCompleted, setSurveyCompleted] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
  const progress = currentQuestionIndex >= 0 ? (currentQuestionIndex + 1) / questions.length : 0;

  const handleStartSurvey = () => {
    setSurveyStarted(true);
    setCurrentQuestionIndex(0);
  };

  const handleAnswer = useCallback((value: any) => {
    if (currentQuestion) {
      setAnswers((prev) => ({ ...prev, [currentQuestion.id]: value }));
    }
  }, [currentQuestion]);

  const handleNextQuestion = useCallback(() => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setSurveyCompleted(true);
      // Simulate API submission
      console.log("Dati del sondaggio completati:", answers);
      showSuccess("Grazie per il tuo tempo! 🎉 Le risposte sono state salvate con successo."); // Modifica qui
      // In a real app, you would send this to your backend:
      // fetch("/api/submit", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(answers),
      // })
      //   .then((res) => res.json())
      //   .then((data) => {
      //     console.log("Submission successful:", data);
      //     showSuccess("Grazie per il tuo tempo! 🎉 Le risposte sono state salvate con successo.");
      //   })
      //   .catch((error) => {
      //     console.error("Submission failed:", error);
      //     showError("Si è verificato un errore durante il salvataggio delle risposte.");
      //   });
    }
  }, [currentQuestionIndex, answers, questions.length]);

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
          // Only advance if current question has an answer (for auto-advance types)
          // For textarea, the button handles next
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

  return (
    <motion.div
      className="relative bg-white dark:bg-gray-900 rounded-xl shadow-lg p-4 sm:p-6 w-full max-w-md mx-auto flex flex-col min-h-[380px] sm:min-h-[420px] justify-between"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
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
            transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
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
          <div className="absolute bottom-4 w-[calc(100%-32px)] left-4 right-4">
            <ProgressBar progress={progress} />
          </div>
          {currentQuestionIndex > 0 && (
            <BackButton onClick={handlePreviousQuestion} />
          )}
        </>
      )}
    </motion.div>
  );
};

export default SurveyCard;