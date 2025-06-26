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
    <div className="flex flex-wrap justify-center gap-2 sm:gap-3 p-2 border border-dashed border-gray-400 rounded-lg"> {/* Added border and padding for container */}
      {circles.map((circleValue) => (
        <motion.div
          key={circleValue}
          className={cn(
            "w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-lg font-medium cursor-pointer transition-all duration-200 border-2", // Increased size and added border
            value !== null && circleValue <= value
              ? "gradient-fill text-white border-blue-500" // Added border for selected
              : "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600", // Added border for unselected
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