import { useRef, useState, useEffect } from "react";
import { Minus, Square, X } from "lucide-react";
import { WindowState } from "./Desktop";
import { Button } from "./ui/button";

interface WindowProps {
  window: WindowState;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onFocus: () => void;
  onUpdatePosition: (id: string, position: { x: number; y: number }) => void;
  onUnlockClose?: () => void;
}

export const Window = ({
  window,
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
  onUpdatePosition,
  onUnlockClose,
}: WindowProps) => {
  const windowRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;

      const newX = window.position.x + e.clientX - dragStart.x;
      const newY = window.position.y + e.clientY - dragStart.y;

      onUpdatePosition(window.id, {
        x: Math.max(0, Math.min(newX, globalThis.innerWidth - 200)),
        y: Math.max(0, Math.min(newY, globalThis.innerHeight - 100)),
      });

      setDragStart({ x: e.clientX, y: e.clientY });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, dragStart, window.position, window.id, onUpdatePosition]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest("button")) return;
    // Don't allow dragging locked windows
    if (window.isLocked) {
      onFocus();
      return;
    }
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
    onFocus();
  };

  if (window.isMinimized) return null;

  const style = window.isMaximized
    ? { top: 0, left: 0, width: "100%", height: "calc(100% - 48px)" }
    : {
        top: window.position.y,
        left: window.position.x,
        width: window.size.width,
        height: window.size.height,
      };

  return (
    <div
      ref={windowRef}
      className="absolute glass-window rounded-lg overflow-hidden shadow-2xl animate-window-open"
      style={{
        ...style,
        zIndex: window.zIndex,
      }}
      onClick={onFocus}
    >
      {/* Title Bar */}
      <div
        className="h-10 bg-white/90 dark:bg-gray-800/90 flex items-center justify-between px-3 cursor-move border-b border-gray-200/50"
        onMouseDown={handleMouseDown}
      >
        <div className="flex items-center gap-2">
          <div className="text-primary">{window.icon}</div>
          <span className="text-sm font-medium text-foreground">{window.title}</span>
        </div>
        <div className="flex items-center gap-1">
          {!window.isLocked && (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 hover:bg-gray-200/50"
                onClick={onMinimize}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 hover:bg-gray-200/50"
                onClick={onMaximize}
              >
                <Square className="h-3 w-3" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 hover:bg-red-500 hover:text-white"
                onClick={onClose}
              >
                <X className="h-4 w-4" />
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="h-[calc(100%-40px)] bg-white/95 dark:bg-gray-900/95 overflow-auto">
        {window.isLocked && onUnlockClose
          ? typeof window.content === 'object' && window.content && 'type' in window.content
            ? { ...window.content, props: { ...window.content.props, onUnlock: onUnlockClose } }
            : window.content
          : window.content}
      </div>
    </div>
  );
};
