"use client";

import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Sparkles, Star, Zap } from 'lucide-react';
import MagneticButton from '../effects/MagneticButton';

export default function CTASection() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const rotateX = useTransform(scrollYProgress, [0, 0.5], [15, 0]);

  return (
    <section ref={containerRef} className="relative py-32 px-6">
      <motion.div
        className="max-w-4xl mx-auto text-center"
        style={{ scale, opacity, rotateX, perspective: 1000 }}
      >
        <motion.div
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass mb-8 border border-purple-500/20"
          initial={{ opacity: 0, y: 30, scale: 0.8 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.8 }}
          whileHover={{ scale: 1.05, borderColor: 'rgba(139, 92, 246, 0.5)' }}
        >
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          >
            <Sparkles className="w-4 h-4 text-purple-400" />
          </motion.div>
          <span className="text-sm text-slate-300">Join 500,000+ users worldwide</span>
        </motion.div>

        <motion.h2
          className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Ready to{' '}
          <motion.span 
            className="text-gradient inline-block"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            10x
          </motion.span>
          {' '}Your{' '}
          <span className="text-gradient">Productivity?</span>
        </motion.h2>

        <motion.p
          className="text-xl text-slate-500 max-w-2xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          Start your free trial today. No credit card required. Experience the future of AI-powered work.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          <MagneticButton
            className="px-10 py-5 rounded-2xl bg-gradient-to-r from-purple-600 via-purple-500 to-cyan-500 text-white font-bold text-lg hover:shadow-[0_0_60px_rgba(139,92,246,0.5)] transition-shadow"
          >
            <span className="flex items-center gap-2">
              <Zap className="w-5 h-5" />
              Start Free Trial
              <ArrowRight className="w-5 h-5" />
            </span>
          </MagneticButton>
          <MagneticButton
            className="px-10 py-5 rounded-2xl glass text-white font-bold text-lg hover:bg-white/10 transition-colors border border-white/10"
          >
            <span className="flex items-center gap-2">
              <Star className="w-5 h-5" />
              View Demo
            </span>
          </MagneticButton>
        </motion.div>
      </motion.div>
    </section>
  );
}
