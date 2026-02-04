"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";
import Link from "next/link";

const sadMessages = [
  "Please? 🥺",
  "Don't break my heart 💔",
  "Think about it... 🤔",
  "Are you sure? 😢",
  "I'll be so sad... 😭",
  "Give me a chance! 🙏",
  "Pretty please? 💝",
  "My heart aches... 💘",
];

export default function Home() {
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
  const [messageIndex, setMessageIndex] = useState(0);
  const [showMessage, setShowMessage] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const moveNoButton = useCallback(() => {
    if (!containerRef.current) return;

    const container = containerRef.current.getBoundingClientRect();
    const buttonWidth = 120;
    const buttonHeight = 56;

    const maxX = container.width - buttonWidth - 40;
    const maxY = container.height - buttonHeight - 40;

    const newX = Math.random() * maxX - maxX / 2;
    const newY = Math.random() * maxY - maxY / 2;

    setNoButtonPos({ x: newX, y: newY });
    setMessageIndex((prev) => (prev + 1) % sadMessages.length);
    setShowMessage(true);

    setTimeout(() => setShowMessage(false), 3000);
  }, []);

  return (
    <div
      ref={containerRef}
      className="bg-valentine relative min-h-screen overflow-hidden flex items-center justify-center px-4"
    >
      {/* Floating hearts background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-rose-300 opacity-40"
            style={{
              left: `${15 + i * 15}%`,
              fontSize: `${20 + i * 8}px`,
            }}
            animate={{
              y: [-20, -800],
              opacity: [0.6, 0],
            }}
            transition={{
              duration: 6 + i * 2,
              repeat: Infinity,
              delay: i * 1.5,
              ease: "linear",
            }}
          >
            <Heart fill="currentColor" />
          </motion.div>
        ))}
      </div>

      {/* Main card */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="glass-card rounded-3xl p-8 sm:p-12 max-w-md w-full text-center relative z-10"
      >
        {/* Animated heart */}
        <motion.div
          className="flex justify-center mb-6"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <Heart className="w-20 h-20 text-rose-500" fill="currentColor" />
        </motion.div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-bold text-rose-900 mb-2 font-cursive">
          Will You Be
        </h1>
        <h1 className="text-3xl sm:text-4xl font-bold text-rose-900 mb-8 font-cursive">
          My Valentine? 💕
        </h1>

        {/* Sad message */}
        <AnimatePresence>
          {showMessage && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-rose-600 text-lg mb-6 font-medium"
            >
              {sadMessages[messageIndex]}
            </motion.p>
          )}
        </AnimatePresence>

        {/* Buttons container */}
        <div className="flex flex-row gap-4 w-full relative">
          {/* Yes button */}
          <Link href="/yes" className="flex-1">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="btn-yes text-white font-bold py-4 px-4 rounded-full text-lg shadow-lg w-full"
            >
              Yes 💖
            </motion.button>
          </Link>

          {/* No button container - provides flex space and escape boundaries */}
          <div className="flex-1 relative h-14">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-gray-400 text-white font-bold py-4 px-4 rounded-full text-lg shadow-md absolute left-0 right-0 mx-auto max-w-[120px]"
              onMouseEnter={moveNoButton}
              onTouchStart={moveNoButton}
              animate={{ x: noButtonPos.x, y: noButtonPos.y }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              No
            </motion.button>
          </div>
        </div>

        {/* Hint text */}
        <p className="text-rose-400 text-sm mt-4">
          Try clicking &quot;No&quot;... if you can catch it! 😏
        </p>
      </motion.div>
    </div>
  );
}
