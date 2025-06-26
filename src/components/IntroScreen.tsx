"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface IntroScreenProps {
  onStart: () => void;
}

const IntroScreen: React.FC<IntroScreenProps> = ({ onStart }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, type: "spring", stiffness: 100 }}
      className="flex flex-col items-center text-center p-6 sm:p-8"
    >
      <h2 className="text-2xl sm:text-3xl font-semibold mb-3 text-gray-800 dark:text-gray-100">
        Aiutaci a migliorare!
      </h2>
      <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 mb-8">
        Ci farebbe molto piacere ricevere il tuo parere. Bastano solo 2 minuti per questo breve sondaggio.
      </p>
      <Button
        onClick={onStart}
        className="px-8 py-3 text-lg gradient-fill text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
      >
        Inizia
      </Button>
    </motion.div>
  );
};

export default IntroScreen;