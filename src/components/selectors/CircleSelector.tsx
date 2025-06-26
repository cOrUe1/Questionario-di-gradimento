import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CircleSelectorProps {
  value: number | null;
  onChange: (value: number) => void;
  min: number;
  max: number;
}

const CircleSelector: React.FC<CircleSelectorProps> = ({
  value,
  onChange,
  min,
  max,
}) => {
  const circles = Array.from({ length: max - min + 1 }, (_, i) => min + i);

  return (
    <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
      {circles.map((circleValue) => (
        <motion.div
          key={circleValue}
          className={cn(
            "w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-sm font-medium cursor-pointer transition-all duration-200",
            value !== null && circleValue <= value
              ? "gradient-fill text-white"
              : "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300",
          )}
          whileHover={{ scale: 1.1 }}
          onClick={() => onChange(circleValue)}
        >
          {circleValue}
        </motion.div>
      ))}
    </div>
  );
};

export default CircleSelector;