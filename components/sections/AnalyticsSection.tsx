"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { BarChart3, Activity, TrendingUp, Zap, Target } from 'lucide-react';
import TextReveal from '../effects/TextReveal';

export default function AnalyticsSection() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });
  const [data, setData] = useState<any>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const rotateX = useTransform(scrollYProgress, [0, 0.5], [10, 0]);

  useEffect(() => {
    if (!isInView) return;
    fetch('/api/analytics')
      .then(r => r.json())
      .then(d => setData(d.data))
      .catch(() => setData(null));
  }, [isInView]);

  const maxTasks = data?.weekly ? Math.max(...data.weekly.map((d: any) => d.tasks)) : 1;

  return (
    <section id="analytics" ref={containerRef} className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <TrendingUp className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-slate-400">Analytics</span>
          </motion.div>

          <TextReveal
            text="AI Analytics Dashboard"
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
            Real-time productivity insights powered by AI analytics.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Stats Cards */}
          <div className="lg:col-span-1 space-y-4">
            {data?.metrics?.map((metric: any, i: number) => (
              <motion.div
                key={metric.label}
                className="glass rounded-2xl p-6 border border-white/10 hover:border-purple-500/20 transition-all duration-300 group"
                initial={{ opacity: 0, x: -50, scale: 0.9 }}
                animate={isInView ? { opacity: 1, x: 0, scale: 1 } : {}}
                transition={{ delay: i * 0.15, duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
                whileHover={{ scale: 1.03, y: -5 }}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-slate-400">{metric.label}</span>
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.8 }}
                  >
                    <Activity className="w-4 h-4" style={{ color: metric.color }} />
                  </motion.div>
                </div>
                <div className="text-3xl font-bold text-white group-hover:text-gradient transition-colors">
                  {metric.value}{metric.suffix || ''}
                </div>
                <div className="mt-3 h-2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: metric.color }}
                    initial={{ width: 0 }}
                    animate={isInView ? { width: `${Math.min(metric.value, 100)}%` } : {}}
                    transition={{ delay: 0.5 + i * 0.2, duration: 1.5, ease: 'easeOut' }}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Chart */}
          <motion.div
            className="lg:col-span-2 glass rounded-3xl p-8 border border-white/10 hover:border-purple-500/20 transition-colors duration-300"
            style={{ y, rotateX, perspective: 1000 }}
            initial={{ opacity: 0, y: 60, scale: 0.95 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-xl font-semibold text-white">Weekly Activity</h3>
                <p className="text-sm text-slate-500">AI-assisted vs manual tasks</p>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <motion.div 
                    className="w-3 h-3 rounded-full bg-purple-500"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <span className="text-slate-400">AI</span>
                </div>
                <div className="flex items-center gap-2">
                  <motion.div 
                    className="w-3 h-3 rounded-full bg-cyan-500"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                  />
                  <span className="text-slate-400">Manual</span>
                </div>
              </div>
            </div>

            <div className="flex items-end gap-4 h-64">
              {data?.weekly?.map((day: any, i: number) => (
                <div key={day.day} className="flex-1 flex flex-col items-center gap-2 group">
                  <div className="w-full flex gap-1 h-48 items-end">
                    <motion.div
                      className="flex-1 bg-gradient-to-t from-purple-600 to-purple-400 rounded-t-lg relative overflow-hidden"
                      initial={{ height: 0 }}
                      animate={isInView ? { height: `${(day.ai / maxTasks) * 100}%` } : {}}
                      transition={{ delay: 0.5 + i * 0.1, duration: 1, ease: 'easeOut' }}
                      whileHover={{ brightness: 1.2 }}
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-t from-transparent to-white/20"
                        animate={{ y: ['100%', '-100%'] }}
                        transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                      />
                    </motion.div>
                    <motion.div
                      className="flex-1 bg-gradient-to-t from-cyan-600 to-cyan-400 rounded-t-lg"
                      initial={{ height: 0 }}
                      animate={isInView ? { height: `${(day.manual / maxTasks) * 100}%` } : {}}
                      transition={{ delay: 0.6 + i * 0.1, duration: 1, ease: 'easeOut' }}
                    />
                  </div>
                  <span className="text-xs text-slate-500 group-hover:text-purple-400 transition-colors">{day.day}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
