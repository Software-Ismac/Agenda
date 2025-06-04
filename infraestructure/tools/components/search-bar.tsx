import React from "react";
import { Input } from "@heroui/react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <Input
        classNames={{
          base: "max-w-full sm:max-w-md",
          inputWrapper: "bg-content2 shadow-sm",
        }}
        radius="lg"
        size="lg"
        startContent={
          <Icon icon="lucide:search" className="text-foreground-400 w-5 h-5" />
        }
        endContent={
          value && (
            <button className="focus:outline-none" onClick={() => onChange("")}>
              <Icon icon="lucide:x" className="text-foreground-400 w-4 h-4" />
            </button>
          )
        }
        placeholder="Buscar aplicaciones..."
        value={value}
        onValueChange={onChange}
      />
    </motion.div>
  );
};
