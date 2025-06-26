"use client";

import React from "react";
import { motion } from "framer-motion";

interface ProgressBarProps {
  progress: number; // Value between 0 and 1
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  return (
    <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
      <motion.div
        className="h-full gradient-fill rounded-full"
        initial={{ width: "0%" }}
        animate={{ width: `${progress * 100}%` }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      />
    </div>
  );
};

export default ProgressBar;