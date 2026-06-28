"use client";

import { motion } from 'framer-motion';

const orbs = [
  { size: 400, color: 'from-purple-600/30 to-violet-600/20', x: '10%', y: '20%', delay: 0 },
  { size: 300, color: 'from-cyan-500/25 to-blue-500/15', x: '70%', y: '40%', delay: 2 },
  { size: 350, color: 'from-pink-500/20 to-rose-500/15', x: '40%', y: '70%', delay: 4 },
  { size: 250, color: 'from-amber-500/20 to-orange-500/15', x: '80%', y: '80%', delay: 1 },
  { size: 200, color: 'from-emerald-500/20 to-teal-500/15', x: '20%', y: '85%', delay: 3 },
];

export default function FloatingOrbs() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full bg-gradient-to-br ${orb.color} blur-[100px]`}
          style={{
            width: orb.size,
            height: orb.size,
            left: orb.x,
            top: orb.y,
          }}
          animate={{
            x: [0, 50, -30, 20, 0],
            y: [0, -40, 30, -20, 0],
            scale: [1, 1.2, 0.9, 1.1, 1],
          }}
          transition={{
            duration: 15 + i * 3,
            repeat: Infinity,
            delay: orb.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}
