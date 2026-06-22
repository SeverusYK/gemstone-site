"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";

const typingLines = [
  "$ python analyze.py",
  "Loading dataset...",
  "Rows: 12,847  Cols: 23",
  "Running model...",
  "Accuracy: 94.7%",
  ">>> Query complete.",
];

export function RetroComputer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [typedLines, setTypedLines] = useState<string[]>([]);
  const [currentText, setCurrentText] = useState("");
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distX = e.clientX - centerX;
      const distY = e.clientY - centerY;
      const distance = Math.sqrt(distX * distX + distY * distY);

      // Activate when mouse is within 500px
      setIsActive(distance < 500);

      // Subtle tilt based on mouse position
      const maxTilt = 8;
      const tiltX = -(distY / rect.height) * maxTilt;
      const tiltY = (distX / rect.width) * maxTilt;
      setRotateX(tiltX);
      setRotateY(tiltY);
    },
    []
  );

  const handleMouseLeave = useCallback(() => {
    setIsActive(false);
    setRotateX(0);
    setRotateY(0);
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  // Typing effect when active
  useEffect(() => {
    if (!isActive) {
      setTypedLines([]);
      setCurrentText("");
      setLineIndex(0);
      setCharIndex(0);
      return;
    }

    if (lineIndex >= typingLines.length) return;

    const timer = setTimeout(() => {
      const line = typingLines[lineIndex];
      if (charIndex < line.length) {
        setCurrentText(line.slice(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      } else {
        setTypedLines((prev) => [...prev, line]);
        setCurrentText("");
        setLineIndex(lineIndex + 1);
        setCharIndex(0);
      }
    }, charIndex === 0 ? 300 : 35);

    return () => clearTimeout(timer);
  }, [isActive, lineIndex, charIndex]);

  return (
    <div ref={containerRef} className="relative" onMouseLeave={handleMouseLeave}>
      <motion.div
        className="relative"
        style={{ perspective: 800 }}
        animate={{
          rotateX,
          rotateY,
        }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      >
        {/* Computer body */}
        <div className="relative w-[320px] h-[340px] md:w-[380px] md:h-[400px]">
          {/* Main body */}
          <div
            className="absolute inset-0 rounded-[20px] md:rounded-[24px]"
            style={{
              background: "linear-gradient(180deg, #E8E0D0 0%, #D4CCBC 100%)",
              boxShadow:
                "0 20px 60px rgba(42,37,34,0.15), 0 4px 12px rgba(42,37,34,0.08), inset 0 1px 0 rgba(255,255,255,0.5)",
            }}
          >
            {/* Screen bezel */}
            <div className="absolute top-5 left-5 right-5 bottom-[100px] md:top-6 md:left-6 md:right-6 md:bottom-[120px] rounded-lg overflow-hidden border-[3px] border-[#B8AFA0]">
              {/* Screen */}
              <div
                className={`w-full h-full crt-screen transition-all duration-700 flex flex-col p-4 ${
                  isActive ? "opacity-100" : "opacity-40"
                }`}
                style={{
                  background: isActive
                    ? "linear-gradient(180deg, #1a2a1a 0%, #0a1a0a 100%)"
                    : "#1a1a1a",
                }}
              >
                {/* Screen content */}
                <div className="font-mono text-[11px] md:text-xs leading-relaxed flex-1 overflow-hidden">
                  {isActive ? (
                    <>
                      {typedLines.map((line, i) => (
                        <div
                          key={i}
                          className={`mb-1 ${
                            line.startsWith("$")
                              ? "text-[#66ff66]"
                              : line.startsWith(">>>")
                              ? "text-[#ffcc44]"
                              : "text-[#44cc44]"
                          }`}
                        >
                          {line}
                        </div>
                      ))}
                      {lineIndex < typingLines.length && (
                        <div className="text-[#66ff66]">
                          {currentText}
                          <span className="animate-blink">▌</span>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <span className="text-[#333] text-lg">⌘</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Bottom vent/speaker area */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[60%]">
              {/* Apple-style logo placeholder */}
              <div className="flex justify-center mb-3">
                <div className="w-5 h-5 rounded-sm opacity-30" style={{
                  background: "linear-gradient(135deg, #A89888 0%, #8B8070 100%)"
                }}>
                  <div className="w-full h-full flex items-center justify-center text-[8px] text-[#F5F0E8] font-bold">
                    Q
                  </div>
                </div>
              </div>
              {/* Vent lines */}
              <div className="space-y-[3px]">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="h-[2px] rounded-full"
                    style={{
                      background: "linear-gradient(90deg, transparent 5%, #B8AFA0 20%, #B8AFA0 80%, transparent 95%)",
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Keyboard */}
          <div
            className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[90%] h-[32px] rounded-b-lg"
            style={{
              background: "linear-gradient(180deg, #D4CCBC 0%, #C8BFB0 100%)",
              boxShadow: "0 4px 12px rgba(42,37,34,0.1)",
            }}
          >
            {/* Key rows */}
            <div className="flex justify-center items-center h-full gap-[2px] px-4">
              {[...Array(14)].map((_, i) => (
                <div
                  key={i}
                  className="w-[14px] md:w-[18px] h-[14px] rounded-[2px]"
                  style={{
                    background: "linear-gradient(180deg, #F5F0E8 0%, #E8E0D0 100%)",
                    boxShadow: "0 1px 2px rgba(42,37,34,0.1), inset 0 1px 0 rgba(255,255,255,0.6)",
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Glow effect when active */}
        {isActive && (
          <motion.div
            className="absolute top-5 left-5 right-5 bottom-[100px] md:top-6 md:left-6 md:right-6 md:bottom-[120px] rounded-lg pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            style={{
              boxShadow: "0 0 40px rgba(68, 204, 68, 0.15), 0 0 80px rgba(68, 204, 68, 0.05)",
            }}
          />
        )}
      </motion.div>
    </div>
  );
}
