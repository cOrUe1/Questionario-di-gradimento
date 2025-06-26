import React from "react";
import { Star } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface StarSelectorProps {
  value: number | null;
  onChange: (value: number) => void;
  min: number;
  max: number;
  includeNoNeed?: boolean;
  onNoNeed?: () => void;
}

const StarSelector: React.FC<StarSelectorProps> = ({
  value,
  onChange,
  min,
  max,
  includeNoNeed,
  onNoNeed,
}) => {
  const stars = Array.from({ length: max - min + 1 }, (_, i) => min + i);

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="flex space-x-1 sm:space-x-2">
        {stars.map((starValue) => (
          <motion.div
            key={starValue}
            className="relative cursor-pointer"
            whileHover={{ scale: 1.1 }}
            onClick={() => onChange(starValue)}
          >
            <Star
              className={cn(
                "w-8 h-8 sm:w-10 sm:h-10 transition-colors duration-200",
                value !== null && starValue <= value
                  ? "gradient-text"
                  : "text-gray-300 dark:text-gray-700",
              )}
              fill={
                value !== null && starValue <= value
                  ? "url(#star-gradient)"
                  : "currentColor"
              }
            />
            <svg width="0" height="0">
              <defs>
                <linearGradient id="star-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stop-color="#c2e9ff" />
                  <stop offset="100%" stop-color="#0077ff" />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>
        ))}
      </div>
      {includeNoNeed && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onNoNeed}
          className="text-sm text-gray-600 dark:text-gray-400 hover:underline mt-2"
        >
          Non ho avuto bisogno
        </motion.button>
      )}
    </div>
  );
};

export default StarSelector;