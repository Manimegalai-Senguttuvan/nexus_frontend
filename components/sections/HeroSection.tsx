"use client";

import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Sparkles, Users, Zap, TrendingUp, ChevronDown } from 'lucide-react';
import MagneticButton from '../effects/MagneticButton';

export default function HeroSection() {
  const [typedText, setTypedText] = useState('');
  const fullText = 'The Future of Work, Powered by AI';
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.85]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 150]);
  const rotateX = useTransform(scrollYProgress, [0, 0.5], [0, 15]);

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i <= fullText.length) {
        setTypedText(fullText.slice(0, i));
        i++;
      } else {
        clearInterval(timer);
      }
    }, 50);
    return () => clearInterval(timer);
  }, []);

  const stats = [
    { icon: Users, value: '500K+', label: 'Active Users' },
    { icon: Zap, value: '99.9%', label: 'Uptime' },
    { icon: TrendingUp, value: '10x', label: 'Productivity' },
  ];

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <motion.div 
        className="relative z-10 text-center px-6 max-w-5xl mx-auto" 
        style={{ opacity, scale, y, rotateX }}
      >
        {/* Animated badge */}
        <motion.div
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass mb-10 border border-purple-500/20"
          initial={{ opacity: 0, y: 30, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          whileHover={{ scale: 1.05, borderColor: 'rgba(139, 92, 246, 0.5)' }}
        >
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          >
            <Sparkles className="w-4 h-4 text-purple-400" />
          </motion.div>
          <span className="text-sm text-slate-300 font-medium">AI & Future Technologies Theme</span>
        </motion.div>

        {/* Main heading with character animation */}
        <motion.h1
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1, ease: [0.23, 1, 0.32, 1] }}
        >
          <motion.span 
            className="text-white inline-block"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Nexus
          </motion.span>
          <motion.span 
            className="text-gradient inline-block"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            AI
          </motion.span>
        </motion.h1>

        {/* Typing effect */}
        <motion.div
          className="text-xl md:text-2xl text-slate-400 mb-6 h-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          {typedText}
          <motion.span 
            className="text-purple-400"
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 0.8, repeat: Infinity }}
          >
            |
          </motion.span>
        </motion.div>

        {/* Description */}
        <motion.p
          className="text-lg text-slate-500 max-w-2xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          All-in-one AI productivity suite. Chat, write, code, generate images, analyze documents, and automate workflows — all in one intelligent platform.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <MagneticButton
            className="px-10 py-5 rounded-2xl bg-gradient-to-r from-purple-600 via-purple-500 to-cyan-500 text-white font-bold text-lg hover:shadow-[0_0_60px_rgba(139,92,246,0.5)] transition-shadow"
          >
            <span className="flex items-center gap-2">
              Start Free Trial
              <ArrowRight className="w-5 h-5" />
            </span>
          </MagneticButton>
          <MagneticButton
            className="px-10 py-5 rounded-2xl glass text-white font-bold text-lg hover:bg-white/10 transition-colors border border-white/10"
          >
            Watch Demo
          </MagneticButton>
        </motion.div>

        {/* Stats with count-up animation */}
        <motion.div
          className="grid grid-cols-3 gap-8 max-w-lg mx-auto"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8 }}
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="text-center group cursor-default"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 + i * 0.15 }}
              whileHover={{ y: -8, scale: 1.05 }}
            >
              <motion.div
                className="w-12 h-12 rounded-xl glass flex items-center justify-center mx-auto mb-3 group-hover:border-purple-500/30 transition-colors"
                whileHover={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 0.5 }}
              >
                <stat.icon className="w-5 h-5 text-purple-400" />
              </motion.div>
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-sm text-slate-500">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <span className="text-xs text-slate-500">Scroll to explore</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-5 h-5 text-slate-500" />
        </motion.div>
      </motion.div>
    </section>
  );
}
