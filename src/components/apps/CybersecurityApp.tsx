import { useState } from "react";
import { RansomwareApp } from "./RansomwareApp";

interface CybersecurityAppProps {
  onUnlock?: () => void;
}

export const CybersecurityApp = ({ onUnlock }: CybersecurityAppProps) => {
  const [isUnlocked, setIsUnlocked] = useState(false);

  const handleUnlock = () => {
    setIsUnlocked(true);
    // Close the window after unlock
    if (onUnlock) {
      setTimeout(() => {
        onUnlock();
      }, 500);
    }
  };

  if (!isUnlocked) {
    return <RansomwareApp onUnlock={handleUnlock} />;
  }

  return (
    <div className="h-full w-full bg-black">
      <iframe
        src="/cybersecurity.html"
        className="w-full h-full border-0"
        title="Cybersecurity Awareness"
      />
    </div>
  );
};
