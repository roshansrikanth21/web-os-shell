import { useState } from "react";
import { Menu } from "lucide-react";
import { WindowState } from "./Desktop";
import { StartMenu } from "./StartMenu";
import { Button } from "./ui/button";

interface TaskbarProps {
  windows: WindowState[];
  onWindowClick: (id: string) => void;
}

export const Taskbar = ({ windows, onWindowClick }: TaskbarProps) => {
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useState(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  });

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "numeric",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <>
      <div className="absolute bottom-0 left-0 right-0 h-12 taskbar-blur border-t border-white/10 flex items-center px-2 gap-2 z-[9999]">
        {/* Start Button */}
        <Button
          variant="ghost"
          className="h-10 px-4 hover:bg-white/10 text-white flex items-center gap-2"
          onClick={() => setIsStartMenuOpen(!isStartMenuOpen)}
        >
          <Menu className="h-5 w-5" />
          <span className="font-medium">Start</span>
        </Button>

        {/* Window Indicators */}
        <div className="flex-1 flex items-center gap-1 overflow-x-auto">
          {windows
            .filter((w) => !w.isMinimized)
            .map((window) => (
              <Button
                key={window.id}
                variant="ghost"
                className="h-10 px-3 hover:bg-white/10 text-white flex items-center gap-2 min-w-0"
                onClick={() => onWindowClick(window.id)}
              >
                <div className="text-white">{window.icon}</div>
                <span className="text-sm truncate max-w-[150px]">{window.title}</span>
              </Button>
            ))}
        </div>

        {/* System Tray */}
        <div className="flex items-center gap-4 text-white text-sm px-3">
          <div className="flex flex-col items-end leading-tight">
            <div className="font-medium">{formatTime(currentTime)}</div>
            <div className="text-xs opacity-80">{formatDate(currentTime)}</div>
          </div>
        </div>
      </div>

      {/* Start Menu */}
      {isStartMenuOpen && (
        <StartMenu
          onClose={() => setIsStartMenuOpen(false)}
          onOpenApp={(id) => {
            onWindowClick(id);
            setIsStartMenuOpen(false);
          }}
        />
      )}
    </>
  );
};
