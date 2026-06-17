'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import FloatingFlowers from '@/components/FloatingHearts';
import Confetti from '@/components/Confetti';

export default function Home() {
  const [showCelebration, setShowCelebration] = useState(false);
  const [noAttempts, setNoAttempts] = useState(0);
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [showNoMessage, setShowNoMessage] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const router = useRouter();

  const handleYes = () => {
    setShowCelebration(true);
    if (audioRef.current) {
      audioRef.current.pause();
    }
    setTimeout(() => {
      router.push('/plan-date');
    }, 3000);
  };

  const handleNoMouseEnter = () => {
    if (noAttempts >= 3) {
      setShowNoMessage(true);
      return;
    }
    
    setNoAttempts(prev => prev + 1);
    const x = Math.random() * 400 - 200;
    const y = Math.random() * 200 - 100;
    setNoButtonPos({ x, y });
  };

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (musicPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {});
    }
    setMusicPlaying(!musicPlaying);
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Beautiful Background with Image and Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1516455207990-7a41ce80f7ee?q=80&w=2070&auto=format&fit=crop"
          alt="Romantic Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-pink-300/70 via-purple-300/70 to-rose-300/70 backdrop-blur-sm"></div>
      </div>

      <FloatingFlowers />
      
      <audio 
        ref={audioRef}
        loop
        src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
      />
      
      <button
        onClick={toggleMusic}
        className="fixed top-6 right-6 z-50 bg-white/90 backdrop-blur-sm p-4 rounded-full shadow-2xl hover:bg-white transition-all hover:scale-110"
      >
        <span className="text-2xl">{musicPlaying ? '🔊' : '🔇'}</span>
      </button>

      <div className="relative z-10 text-center max-w-3xl px-6">
        <AnimatePresence mode="wait">
          {!showCelebration ? (
            <motion.div
              key="invite"
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              {/* Cute Decorative Elements */}
          <div className="flex justify-center gap-3 mb-6">
            <div className="text-3xl animate-bounce">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-pink-500">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="currentColor"/>
              </svg>
            </div>
            <div className="text-4xl animate-bounce delay-75">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-14 h-14 text-pink-600">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="currentColor"/>
              </svg>
            </div>
            <div className="text-3xl animate-bounce delay-150">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-pink-500">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="currentColor"/>
              </svg>
            </div>
          </div>
              
              <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-10 shadow-2xl border border-pink-100">
                <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-purple-600 to-rose-600 mb-6">
                  Hey Princess ❤️
                </h1>
                <p className="text-2xl md:text-3xl text-purple-700 mb-6 font-semibold">
                  I have something special to ask you...
                </p>
                <h2 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 mb-10">
                  Will you go on a date with me? 🥺💕
                </h2>
                
                {showNoMessage && (
                  <motion.p
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-2xl text-pink-600 mb-8 font-bold"
                  >
                    Nice try 😏 But you know the answer is YES ❤️
                  </motion.p>
                )}
                
                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                  <motion.button
                    whileHover={{ scale: 1.15, boxShadow: '0 20px 25px -5px rgba(236, 72, 153, 0.4), 0 10px 10px -5px rgba(236, 72, 153, 0.2)' }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleYes}
                    className="px-12 py-6 bg-gradient-to-r from-pink-500 via-purple-500 to-rose-500 text-white text-2xl md:text-3xl rounded-full shadow-2xl font-black"
                  >
                    Yes 💖
                  </motion.button>
                  
                  {!showNoMessage && (
                    <motion.button
                      style={{
                        transform: `translate(${noButtonPos.x}px, ${noButtonPos.y}px)`,
                      }}
                      whileHover={{ scale: 1.15 }}
                      onMouseEnter={handleNoMouseEnter}
                      className="px-12 py-6 bg-gradient-to-r from-gray-400 to-gray-500 text-white text-2xl md:text-3xl rounded-full shadow-2xl font-black transition-transform duration-300"
                    >
                      No 🙈
                    </motion.button>
                  )}
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="celebration"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Confetti />
              <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-10 shadow-2xl border border-pink-100">
                <div className="flex justify-center gap-3 mb-6">
                  <span className="text-4xl animate-bounce">🎉</span>
                  <span className="text-5xl animate-bounce delay-75">💕</span>
                  <span className="text-4xl animate-bounce delay-150">🎉</span>
                </div>
                <h1 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-purple-600 to-rose-600 mb-6">
                  Yayyyyy!!! 💕
                </h1>
                <p className="text-3xl md:text-4xl text-purple-700 font-bold">
                  Now help me plan our perfect date 😘
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
