import { useState } from "react";

interface DesktopIconProps {
  icon: React.ReactNode;
  label: string;
  onDoubleClick: () => void;
}

export const DesktopIcon = ({ icon, label, onDoubleClick }: DesktopIconProps) => {
  const [clickCount, setClickCount] = useState(0);
  const [clickTimer, setClickTimer] = useState<NodeJS.Timeout | null>(null);

  const handleClick = () => {
    setClickCount((prev) => prev + 1);

    if (clickTimer) {
      clearTimeout(clickTimer);
    }

    const timer = setTimeout(() => {
      if (clickCount + 1 === 2) {
        onDoubleClick();
      }
      setClickCount(0);
    }, 300);

    setClickTimer(timer);
  };

  return (
    <button
      onClick={handleClick}
      className="flex flex-col items-center gap-1 p-3 rounded-lg hover:bg-white/10 transition-colors cursor-pointer group w-24"
    >
      <div className="text-white drop-shadow-lg group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <span className="text-white text-xs font-medium text-center drop-shadow-md leading-tight">
        {label}
      </span>
    </button>
  );
};
