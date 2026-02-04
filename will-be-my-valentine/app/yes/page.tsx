"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Heart, Sparkles, Utensils, Film, Trees, Gift, Music, Pause } from "lucide-react";
import confetti from "canvas-confetti";

const dateOptions = [
  { id: "dinner", label: "Romantic Dinner", icon: Utensils, desc: "Candlelit evening 🕯️" },
  { id: "movie", label: "Movie Night", icon: Film, desc: "Cozy couch time 🍿" },
  { id: "picnic", label: "Picnic Date", icon: Trees, desc: "Nature & snacks 🧺" },
  { id: "surprise", label: "Surprise Me", icon: Gift, desc: "You choose! 🎁" },
];

export default function YesPage() {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio element
    audioRef.current = new Audio("https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = 0.5;

    // Try to autoplay (may be blocked by browser)
    const playPromise = audioRef.current.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }

    return () => {
      audioRef.current?.pause();
    };
  }, []);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    // Initial confetti burst
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: ReturnType<typeof setInterval> = setInterval(function () {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  const handleDateSelect = (id: string) => {
    setSelectedDate(id);
    // Celebration burst
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#f43f5e", "#fecdd3", "#ffe4e6", "#fda4af"],
    });
  };

  return (
    <div className="bg-valentine relative min-h-screen overflow-hidden flex items-center justify-center px-4 py-8">
      {/* Floating hearts background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-rose-300 opacity-30"
            style={{
              left: `${10 + i * 12}%`,
              fontSize: `${16 + i * 6}px`,
            }}
            animate={{
              y: [-20, -800],
              opacity: [0.5, 0],
            }}
            transition={{
              duration: 7 + i * 1.5,
              repeat: Infinity,
              delay: i * 1.2,
              ease: "linear",
            }}
          >
            <Heart fill="currentColor" />
          </motion.div>
        ))}
      </div>

      {/* Main content */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="glass-card rounded-3xl p-6 sm:p-10 max-w-lg w-full text-center relative z-10"
      >
        {/* Sparkles and heart with music button */}
        <motion.div
          className="flex justify-center items-center gap-3 mb-4"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <Sparkles className="w-8 h-8 text-rose-400" />
          <Heart className="w-16 h-16 text-rose-500" fill="currentColor" />
          <Sparkles className="w-8 h-8 text-rose-400" />
        </motion.div>

        {/* Music toggle button */}
        <motion.button
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          onClick={toggleMusic}
          className="mb-4 bg-rose-100 hover:bg-rose-200 text-rose-600 px-4 py-2 rounded-full flex items-center gap-2 mx-auto transition-colors"
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Music className="w-4 h-4" />}
          <span className="text-sm font-medium">
            {isPlaying ? "Pause Music" : "Play Music 🎵"}
          </span>
        </motion.button>

        {/* Success message */}
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-3xl sm:text-4xl font-bold text-rose-900 mb-2 font-cursive"
        >
          You Said YES! 💖
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-rose-700 text-lg mb-6"
        >
          You&apos;ve made me the happiest person in the world! 🥰
        </motion.p>

        {/* Date selection */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mb-6"
        >
          <h2 className="text-xl font-semibold text-rose-800 mb-4">
            Let&apos;s plan our date! 🌹
          </h2>

          <div className="grid grid-cols-2 gap-3">
            {dateOptions.map((option) => {
              const Icon = option.icon;
              const isSelected = selectedDate === option.id;
              return (
                <motion.button
                  key={option.id}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleDateSelect(option.id)}
                  className={`date-card p-4 rounded-xl border-2 text-left ${
                    isSelected
                      ? "border-rose-500 bg-rose-50 selected"
                      : "border-rose-200 bg-white hover:border-rose-300"
                  }`}
                >
                  <Icon
                    className={`w-8 h-8 mb-2 ${
                      isSelected ? "text-rose-600" : "text-rose-400"
                    }`}
                  />
                  <p className="font-semibold text-rose-900 text-sm">
                    {option.label}
                  </p>
                  <p className="text-rose-500 text-xs mt-1">{option.desc}</p>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Selected message */}
        {selectedDate && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-rose-100 rounded-xl p-4 mb-4"
          >
            <p className="text-rose-800 font-medium">
              Perfect choice! 💕 Can&apos;t wait for our{" "}
              {dateOptions.find((d) => d.id === selectedDate)?.label.toLowerCase()}!
            </p>
          </motion.div>
        )}

        {/* Love note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-rose-500 text-sm italic"
        >
          &ldquo;Every love story is beautiful, but ours is my favorite.&rdquo; 💕
        </motion.p>
      </motion.div>
    </div>
  );
}
