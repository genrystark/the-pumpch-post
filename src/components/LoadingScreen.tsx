import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("Starting Windows...");
  const [showBoot, setShowBoot] = useState(true);

  const bootMessages = [
    { progress: 0, message: "Starting Windows..." },
    { progress: 15, message: "Loading system files..." },
    { progress: 30, message: "Initializing declaw agent..." },
    { progress: 45, message: "Connecting to Solana network..." },
    { progress: 60, message: "Loading pump.fun interface..." },
    { progress: 75, message: "Preparing wallet services..." },
    { progress: 90, message: "Almost ready..." },
    { progress: 100, message: "Welcome to declaw token!" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setShowBoot(false);
            setTimeout(onComplete, 165);
          }, 400);
          return 100;
        }
        return prev + 1;
      });
    }, 27);

    return () => clearInterval(interval);
  }, [onComplete]);

  useEffect(() => {
    const currentMessage = bootMessages.reduce((acc, msg) => {
      if (progress >= msg.progress) return msg.message;
      return acc;
    }, bootMessages[0].message);
    setStatus(currentMessage);
  }, [progress]);

  return (
    <AnimatePresence>
      {showBoot && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.17 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{ background: "linear-gradient(135deg, #000080 0%, #000040 100%)" }}
        >
          {/* Full-screen background image (new underwater pixel art) */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-50"
            style={{ backgroundImage: "url(/loading-bg.png)" }}
            aria-hidden
          />
          {/* Scanlines overlay */}
          <div 
            className="absolute inset-0 pointer-events-none opacity-20"
            style={{
              backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)"
            }}
          />
          
          {/* CRT curve effect (does not cover the window below) */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              boxShadow: "inset 0 0 200px rgba(0,0,0,0.9)",
              borderRadius: "20px"
            }}
          />

          {/* Window and title above all overlays, in original colors */}
          <div className="relative z-10 text-center px-8 max-w-2xl w-full">
            {/* Title */}
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.17 }}
              className="font-pixel text-4xl md:text-6xl text-white mb-2"
              style={{ textShadow: "2px 2px 0 #000, 4px 4px 0 rgba(0,0,0,0.3)" }}
            >
              declaw token
            </motion.h1>

            {/* Windows-style window — solid, not overlapped by background */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.17, duration: 0.17 }}
              className="win95-window mx-auto max-w-md mt-8 bg-[#c0c0c0] relative z-10"
              style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.5)" }}
            >
              <div className="win95-titlebar">
                <span className="text-xs">System Startup</span>
                <div className="flex gap-1">
                  <div className="w-3 h-3 bg-[#c0c0c0] border border-t-white border-l-white border-b-[#808080] border-r-[#808080]" />
                </div>
              </div>
              
              <div className="bg-[#c0c0c0] p-4">
                {/* Boot icon grid */}
                <div className="flex justify-center gap-4 mb-4">
                  {["🦀", "⚡", "💰", "🚀"].map((emoji, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.24 + i * 0.035, type: "spring" }}
                      className="w-10 h-10 bg-white border-2 border-t-[#808080] border-l-[#808080] border-b-white border-r-white flex items-center justify-center text-xl"
                    >
                      {emoji}
                    </motion.div>
                  ))}
                </div>

                {/* Status text */}
                <p className="font-mono text-xs text-black mb-3 h-4">
                  {status}
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.25, repeat: Infinity }}
                  >
                    _
                  </motion.span>
                </p>
                
                {/* Progress bar */}
                <div className="win95-progress mb-2">
                  <motion.div
                    className="h-full bg-[#000080]"
                    style={{
                      backgroundImage: "repeating-linear-gradient(90deg, #000080 0px, #000080 8px, #0000a0 8px, #0000a0 16px)"
                    }}
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.05 }}
                  />
                </div>

                <p className="font-mono text-[10px] text-[#404040] text-right">
                  {progress}% Complete
                </p>
              </div>
            </motion.div>

            {/* Footer text */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.34 }}
              className="font-mono text-[10px] text-[#808080] mt-6"
            >
              © 2026 declaw token • Built on OpenClaw • Powered by Solana
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
