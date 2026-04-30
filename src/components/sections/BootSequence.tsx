"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const bootLines = [
  "> INITIALIZING GEMSTONE_SYS v2.0...",
  "> LOADING DATA_MODULES.......... OK",
  "> CONNECTING INSIGHT_ENGINE..... OK",
  "> SYSTEM STATUS: ONLINE",
];

export function BootSequence() {
  const [visible, setVisible] = useState(true);
  const [currentLine, setCurrentLine] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [lineComplete, setLineComplete] = useState(false);

  // Skip on revisit
  useEffect(() => {
    if (typeof window !== "undefined" && sessionStorage.getItem("gemstone-booted")) {
      setVisible(false);
    }
  }, []);

  // Typing effect
  const typeLine = useCallback(() => {
    if (currentLine >= bootLines.length) {
      setTimeout(() => {
        if (typeof window !== "undefined") {
          sessionStorage.setItem("gemstone-booted", "1");
        }
        setVisible(false);
      }, 400);
      return;
    }

    const line = bootLines[currentLine];
    let charIndex = 0;
    setDisplayedText("");
    setLineComplete(false);

    const interval = setInterval(() => {
      charIndex++;
      setDisplayedText(line.slice(0, charIndex));
      if (charIndex >= line.length) {
        clearInterval(interval);
        setLineComplete(true);
        setTimeout(() => {
          setCurrentLine((prev) => prev + 1);
        }, 150);
      }
    }, 18);

    return () => clearInterval(interval);
  }, [currentLine]);

  useEffect(() => {
    if (!visible) return;
    const cleanup = typeLine();
    return cleanup;
  }, [visible, typeLine]);

  if (!visible) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-void"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-full max-w-lg px-6">
            <div className="font-mono text-sm leading-relaxed">
              {/* Completed lines */}
              {bootLines.slice(0, currentLine).map((line, i) => (
                <div key={i} className="text-neon/70 mb-1">
                  {line}
                </div>
              ))}

              {/* Current typing line */}
              {currentLine < bootLines.length && (
                <div className="text-neon mb-1">
                  {displayedText}
                  {!lineComplete && (
                    <span className="animate-blink ml-0.5">▌</span>
                  )}
                </div>
              )}
            </div>

            {/* Progress bar */}
            <div className="mt-6 h-px w-full bg-grid overflow-hidden">
              <motion.div
                className="h-full bg-neon"
                initial={{ width: "0%" }}
                animate={{
                  width: `${((currentLine + 1) / (bootLines.length + 1)) * 100}%`,
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
