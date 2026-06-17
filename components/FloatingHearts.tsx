'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const flowers = [
  // Cherry blossom
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-pink-400">
    <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2Z" fill="currentColor"/>
    <path d="M12 8C14.2 8 16 9.8 16 12C16 14.2 14.2 16 12 16C9.8 16 8 14.2 8 12C8 9.8 9.8 8 12 8Z" fill="currentColor"/>
    <path d="M12 18C10.9 18 10 18.9 10 20C10 21.1 10.9 22 12 22C13.1 22 14 21.1 14 20C14 18.9 13.1 18 12 18Z" fill="currentColor"/>
    <path d="M6 12C6 10.9 6.9 10 8 10C9.1 10 10 10.9 10 12C10 13.1 9.1 14 8 14C6.9 14 6 13.1 6 12Z" fill="currentColor"/>
    <path d="M18 12C18 13.1 17.1 14 16 14C14.9 14 14 13.1 14 12C14 10.9 14.9 10 16 10C17.1 10 18 10.9 18 12Z" fill="currentColor"/>
    <circle cx="12" cy="12" r="1.5" fill="#FFD700"/>
  </svg>,
  // Tulip
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-purple-500">
    <path d="M12 2C15.3 2 18 4.7 18 8C18 11.3 15.3 14 12 14C8.7 14 6 11.3 6 8C6 4.7 8.7 2 12 2Z" fill="currentColor"/>
    <path d="M12 14L11 22H13L12 14Z" fill="#228B22"/>
  </svg>,
  // Rose
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-rose-500">
    <circle cx="12" cy="12" r="6" fill="currentColor"/>
    <circle cx="12" cy="12" r="4" fill="#FF1493"/>
    <circle cx="12" cy="12" r="2" fill="#FFD700"/>
  </svg>,
  // Sunflower
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-yellow-400">
    {[...Array(12)].map((_, i) => (
      <ellipse 
        key={i}
        cx="12" cy="12" 
        rx="3" ry="8" 
        transform={`rotate(${i * 30} 12 12)`} 
        fill="currentColor"
      />
    ))}
    <circle cx="12" cy="12" r="4" fill="#8B4513"/>
  </svg>,
  // Daisy
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
    {[...Array(10)].map((_, i) => (
      <ellipse 
        key={i}
        cx="12" cy="12" 
        rx="2" ry="7" 
        transform={`rotate(${i * 36} 12 12)`} 
        fill="currentColor"
      />
    ))}
    <circle cx="12" cy="12" r="3" fill="#FFD700"/>
  </svg>,
];

export default function FloatingFlowers() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const flowerCount = 30;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {Array.from({ length: flowerCount }).map((_, i) => {
        const randomFlower = flowers[Math.floor(Math.random() * flowers.length)];
        const randomX = `${Math.random() * 100}%`;
        const randomDuration = 8 + Math.random() * 12;
        const randomDelay = Math.random() * 8;
        const randomScale = 0.6 + Math.random() * 0.8;
        const randomRotate = Math.random() * 360;

        return (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: randomX,
            }}
            initial={{
              x: randomX,
              y: '120%',
              opacity: 0,
              scale: randomScale * 0.5,
              rotate: randomRotate,
            }}
            animate={{
              y: '-20%',
              opacity: [0, 0.8, 0.6, 0],
              x: [
                randomX,
                `${parseFloat(randomX) + (Math.random() * 20 - 10)}%`,
                `${parseFloat(randomX) + (Math.random() * 20 - 10)}%`,
                randomX,
              ],
              scale: [randomScale * 0.5, randomScale, randomScale * 0.9, randomScale * 0.5],
              rotate: [randomRotate, randomRotate + 180, randomRotate + 360],
            }}
            transition={{
              duration: randomDuration,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: randomDelay,
              times: [0, 0.3, 0.6, 1],
            }}
          >
            <div className="w-10 h-10 md:w-14 md:h-14">
              {randomFlower}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
