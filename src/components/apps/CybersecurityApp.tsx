import { useState } from "react";
import { RansomwareApp } from "./RansomwareApp";

export const CybersecurityApp = () => {
  const [isUnlocked, setIsUnlocked] = useState(false);

  if (!isUnlocked) {
    return <RansomwareApp onUnlock={() => setIsUnlocked(true)} />;
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
