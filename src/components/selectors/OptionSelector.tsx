"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface OptionSelectorProps {
  options: string[];
  value: string | null;
  onChange: (value: string) => void;
}

const OptionSelector: React.FC<OptionSelectorProps> = ({
  options,
  value,
  onChange,
}) => {
  return (
    <div className="flex flex-col space-y-3 w-full max-w-xs mx-auto">
      {options.map((option) => (
        <motion.div
          key={option}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full"
        >
          <Button
            variant="outline"
            className={cn(
              "w-full py-3 text-base h-auto",
              value === option && "gradient-fill text-white border-transparent",
            )}
            onClick={() => onChange(option)}
          >
            {option}
          </Button>
        </motion.div>
      ))}
    </div>
  );
};

export default OptionSelector;