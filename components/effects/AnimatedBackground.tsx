"use client";

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function AnimatedBackground() {
  const orbsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const orbs = orbsRef.current?.children;
    if (!orbs) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      Array.from(orbs).forEach((orb, i) => {
        const el = orb as HTMLElement;
        const speed = (i + 1) * 0.15;
        const rotate = scrollY * speed * 0.05;
        const scale = 1 + Math.sin(scrollY * 0.001 + i) * 0.1;
        el.style.transform = `translateY(${scrollY * speed}px) rotate(${rotate}deg) scale(${scale})`;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={orbsRef} className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <motion.div
        className="orb w-[600px] h-[600px] bg-purple-600/20"
        style={{ top: '-10%', left: '-10%', animationDelay: '0s' }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="orb w-[500px] h-[500px] bg-cyan-500/20"
        style={{ top: '40%', right: '-15%', animationDelay: '2s' }}
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="orb w-[400px] h-[400px] bg-pink-500/15"
        style={{ bottom: '-10%', left: '30%', animationDelay: '4s' }}
        animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="orb w-[300px] h-[300px] bg-blue-500/15"
        style={{ top: '20%', left: '60%', animationDelay: '6s' }}
        animate={{ scale: [1.1, 0.9, 1.1], opacity: [0.2, 0.35, 0.2] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
}
