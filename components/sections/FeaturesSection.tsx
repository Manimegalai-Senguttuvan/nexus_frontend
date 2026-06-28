"use client";

import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Brain, PenTool, FileText, BarChart3, Image, Code, Palette, Globe, ArrowUpRight, Sparkles } from 'lucide-react';
import TextReveal from '../effects/TextReveal';

const features = [
  { icon: Brain, title: 'AI Chat', desc: 'Natural language conversations with context-aware responses', color: 'from-purple-500 to-violet-600', glow: 'shadow-purple-500/20' },
  { icon: PenTool, title: 'Content Writer', desc: 'Generate blogs, emails, social posts, and marketing copy', color: 'from-pink-500 to-rose-600', glow: 'shadow-pink-500/20' },
  { icon: FileText, title: 'Doc Analyzer', desc: 'Upload PDFs and get instant summaries and insights', color: 'from-blue-500 to-indigo-600', glow: 'shadow-blue-500/20' },
  { icon: BarChart3, title: 'Data Analytics', desc: 'Visualize data with AI-generated charts and reports', color: 'from-cyan-500 to-teal-600', glow: 'shadow-cyan-500/20' },
  { icon: Image, title: 'Image Studio', desc: 'Create stunning AI art and edit photos with prompts', color: 'from-violet-500 to-purple-600', glow: 'shadow-violet-500/20' },
  { icon: Code, title: 'Code Generator', desc: 'Write, debug, and explain code in any language', color: 'from-emerald-500 to-green-600', glow: 'shadow-emerald-500/20' },
  { icon: Palette, title: 'Design AI', desc: 'Generate UI designs, logos, and brand assets', color: 'from-orange-500 to-amber-600', glow: 'shadow-orange-500/20' },
  { icon: Globe, title: 'Multi-Language', desc: 'Translate and communicate in 50+ languages', color: 'from-sky-500 to-blue-600', glow: 'shadow-sky-500/20' },
];

export default function FeaturesSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section id="features" ref={containerRef} className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-slate-400">Features</span>
          </motion.div>

          <TextReveal
            text="8 AI Superpowers"
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
            delay={0.1}
          />
          <motion.p
            className="text-lg text-slate-500 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            One platform, infinite possibilities. Switch between AI tools seamlessly.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <FeatureCard key={feature.title} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ feature, index }: { feature: typeof features[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      className="group relative"
      initial={{ opacity: 0, y: 80, rotateX: 20, scale: 0.9 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0, scale: 1 } : {}}
      transition={{ 
        delay: index * 0.08, 
        duration: 0.8, 
        ease: [0.23, 1, 0.32, 1] 
      }}
      whileHover={{ y: -12, scale: 1.03 }}
      style={{ perspective: 1000 }}
    >
      <div className={`relative p-8 rounded-2xl glass overflow-hidden transition-all duration-500 group-hover:shadow-[0_0_40px_rgba(139,92,246,0.15)] group-hover:border-purple-500/20`}>
        {/* Animated gradient border */}
        <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

        {/* Icon with glow effect */}
        <motion.div 
          className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-5 shadow-lg`}
          whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
          transition={{ duration: 0.5 }}
        >
          <feature.icon className="w-7 h-7 text-white" />
        </motion.div>

        <h3 className="text-xl font-semibold text-white mb-2 flex items-center gap-2">
          {feature.title}
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            whileHover={{ opacity: 1, x: 0 }}
          >
            <ArrowUpRight className="w-4 h-4 text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.span>
        </h3>
        <p className="text-slate-400 text-sm leading-relaxed">{feature.desc}</p>

        {/* Hover gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />

        {/* Corner accent */}
        <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    </motion.div>
  );
}
