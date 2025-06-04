import React, { useMemo, useState } from "react";

function Screen({
  children,
  panel,
}: {
  children: ({
    isOpen,
    setIsOpen,
  }: {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  }) => any;
  panel: ({
    isOpen,
    setIsOpen,
  }: {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  }) => any;
}) {
  const [isOpen, setIsOpen] = useState(false);
  let touchStartX = 0;
  let touchEndX = 0;

  const handleTouchStart = (e: any) => {
    touchStartX = e.touches[0].clientX;
  };

  const handleTouchMove = (e: any) => {
    touchEndX = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX - touchEndX > 50) {
      setIsOpen(false); // Deslizar a la izquierda cierra el panel
    }
  };
  const stateProps = useMemo(() => ({ isOpen, setIsOpen }), [isOpen]);

  return (
    <div className="flex overflow-hidden relative ">
      <div
        className={`${
          isOpen ? "-translate-x-0/4" : "-translate-x-full"
        } absolute backdrop-blur-sm w-3/4 md:w-2/4 lg:w-1/4 border border-l-0 p-3 flex-shrink-0 transition-transform duration-300 h-full overflow-y-scroll`}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {panel?.(stateProps)}
      </div>
      <div
        className={`w-full flex-shrink-0 transition-transform duration-300 ${
          isOpen
            ? "translate-x-3/4 md:translate-x-2/4 lg:translate-x-1/4"
            : "translate-x-0"
        }`}
        onClick={() => isOpen && setIsOpen(false)}
      >
        {children?.(stateProps)}
      </div>
    </div>
  );
}

export default Screen;
