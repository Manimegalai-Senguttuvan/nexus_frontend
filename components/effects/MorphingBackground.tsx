"use client";

import { motion } from 'framer-motion';

export default function MorphingBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[2] overflow-hidden opacity-30">
      <svg
        className="absolute w-full h-full"
        viewBox="0 0 1000 1000"
        preserveAspectRatio="none"
      >
        <motion.path
          d="M0,500 Q250,300 500,500 T1000,500 L1000,1000 L0,1000 Z"
          fill="url(#gradient1)"
          animate={{
            d: [
              "M0,500 Q250,300 500,500 T1000,500 L1000,1000 L0,1000 Z",
              "M0,400 Q250,600 500,400 T1000,400 L1000,1000 L0,1000 Z",
              "M0,600 Q250,200 500,600 T1000,600 L1000,1000 L0,1000 Z",
              "M0,500 Q250,300 500,500 T1000,500 L1000,1000 L0,1000 Z",
            ],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.path
          d="M0,700 Q250,500 500,700 T1000,700 L1000,1000 L0,1000 Z"
          fill="url(#gradient2)"
          animate={{
            d: [
              "M0,700 Q250,500 500,700 T1000,700 L1000,1000 L0,1000 Z",
              "M0,600 Q250,800 500,600 T1000,600 L1000,1000 L0,1000 Z",
              "M0,800 Q250,400 500,800 T1000,800 L1000,1000 L0,1000 Z",
              "M0,700 Q250,500 500,700 T1000,700 L1000,1000 L0,1000 Z",
            ],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut', delay: 5 }}
        />
        <defs>
          <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.1" />
          </linearGradient>
          <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ec4899" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.1" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
