import React from "react";
import { ChevronLeft } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface BackButtonProps {
  onClick: () => void;
}

const BackButton: React.FC<BackButtonProps> = ({ onClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="absolute bottom-4 left-4"
    >
      <Button
        variant="ghost"
        size="icon"
        onClick={onClick}
        aria-label="Indietro"
      >
        <ChevronLeft className="h-6 w-6 text-gray-600 dark:text-gray-400" />
      </Button>
    </motion.div>
  );
};

export default BackButton;