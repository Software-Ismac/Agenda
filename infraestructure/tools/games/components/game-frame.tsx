import React from "react";
import { Button } from "@heroui/react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";

interface GameFrameProps {
  game: {
    name: string;
    src: string;
  };
  onClose: () => void;
}

export const GameFrame: React.FC<GameFrameProps> = ({ game, onClose }) => {
  React.useEffect(() => {
    // Add a new state to history so user can "go back"
    history.pushState(null, "", location.href);

    const handlePopState = () => {
      onClose();
      history.forward(); // Prevent user from going back in history
    };

    window.addEventListener("popstate", handlePopState);
    
    // Prevent scrolling when game is open
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("popstate", handlePopState);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <motion.div 
      className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between p-4 border-b border-divider">
        <h2 className="text-xl font-semibold">{game.name}</h2>
        <div className="flex gap-2">
          <Button 
            isIconOnly 
            variant="flat" 
            color="default" 
            size="sm"
            aria-label="Fullscreen"
          >
            <Icon icon="lucide:maximize" width={20} />
          </Button>
          <Button 
            isIconOnly 
            variant="flat" 
            color="danger" 
            size="sm"
            onPress={onClose}
            aria-label="Close game"
          >
            <Icon icon="lucide:x" width={20} />
          </Button>
        </div>
      </div>
      <div className="flex-1 relative">
        <iframe
          src={game.src}
          className="w-full h-full border-none"
          title={game.name}
          sandbox="allow-scripts allow-same-origin"
          loading="eager"
        />
      </div>
    </motion.div>
  );
};