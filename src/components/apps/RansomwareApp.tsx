import { useState } from "react";
import { Lock, Skull, AlertTriangle } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

interface RansomwareAppProps {
  onUnlock: () => void;
}

export const RansomwareApp = ({ onUnlock }: RansomwareAppProps) => {
  const [password, setPassword] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [shaking, setShaking] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password === "goodluckcomrade") {
      onUnlock();
    } else {
      setAttempts(prev => prev + 1);
      setShaking(true);
      setTimeout(() => setShaking(false), 500);
      setPassword("");
    }
  };

  return (
    <div className="h-full w-full bg-black text-red-500 flex flex-col items-center justify-center p-8 relative overflow-hidden">
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            #ff0000 2px,
            #ff0000 4px
          )`,
          animation: 'scroll 20s linear infinite'
        }} />
      </div>

      {/* Warning content */}
      <div className={`relative z-10 text-center max-w-2xl ${shaking ? 'animate-shake' : ''}`}>
        <Skull className="w-32 h-32 mx-auto mb-6 text-red-600 animate-pulse" />
        
        <h1 className="text-5xl font-bold mb-4 text-red-600 drop-shadow-[0_0_10px_rgba(255,0,0,0.8)]">
          ⚠️ SYSTEM LOCKED ⚠️
        </h1>
        
        <div className="bg-red-950/50 border-2 border-red-600 p-8 rounded-lg mb-6">
          <Lock className="w-16 h-16 mx-auto mb-4 text-red-500" />
          <p className="text-xl mb-4 text-red-400">
            Your files have been encrypted!
          </p>
          <p className="text-sm mb-6 text-red-300">
            All your important documents, photos, and databases have been encrypted with military-grade encryption.
          </p>
          
          <div className="flex items-center justify-center gap-2 mb-6 text-yellow-500">
            <AlertTriangle className="w-5 h-5" />
            <span className="text-sm">This is a simulation for educational purposes</span>
            <AlertTriangle className="w-5 h-5" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm mb-2 text-red-400">
                Enter decryption key to unlock:
              </label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password..."
                className="bg-black/50 border-red-600 text-red-400 placeholder:text-red-900"
              />
            </div>
            
            <Button 
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white"
            >
              Unlock Files
            </Button>
          </form>

          {attempts > 0 && (
            <p className="mt-4 text-sm text-red-600 animate-pulse">
              ❌ Wrong password! Attempts: {attempts}
            </p>
          )}
        </div>

        <div className="text-xs text-red-800 space-y-1">
          <p>⏰ Time remaining: ∞</p>
          <p>💰 Bitcoin wallet: 1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa</p>
          <p>🔐 Files encrypted: 9,999</p>
        </div>
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
          20%, 40%, 60%, 80% { transform: translateX(10px); }
        }
        .animate-shake {
          animation: shake 0.5s;
        }
      `}</style>
    </div>
  );
};
