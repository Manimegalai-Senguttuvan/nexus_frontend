"use client";

import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { LayoutDashboard, CheckCircle2, Clock, AlertCircle, Calendar, Plus, Activity } from 'lucide-react';
import TextReveal from '../effects/TextReveal';

const initialTasks = [
  { id: '1', title: 'AI Content Strategy', status: 'completed', priority: 'high' },
  { id: '2', title: 'Code Review Automation', status: 'in-progress', priority: 'high' },
  { id: '3', title: 'Data Visualization', status: 'pending', priority: 'medium' },
  { id: '4', title: 'Image Generation Batch', status: 'completed', priority: 'low' },
  { id: '5', title: 'API Documentation', status: 'in-progress', priority: 'medium' },
];

export default function DashboardSection() {
  const containerRef = useRef(null);
  const [tasks, setTasks] = useState(initialTasks);
  const [newTask, setNewTask] = useState('');
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  const rotateX = useTransform(scrollYProgress, [0, 0.5], [15, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.9, 1]);

  const addTask = () => {
    if (!newTask.trim()) return;
    setTasks(prev => [...prev, {
      id: String(prev.length + 1),
      title: newTask,
      status: 'pending',
      priority: 'medium'
    }]);
    setNewTask('');
  };

  const statusColors = {
    completed: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    'in-progress': 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    pending: 'bg-slate-500/20 text-slate-400 border-slate-500/30',
  };

  const priorityIcons = {
    high: AlertCircle,
    medium: Clock,
    low: CheckCircle2,
  };

  return (
    <section id="dashboard" ref={containerRef} className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Activity className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-slate-400">Dashboard</span>
          </motion.div>

          <TextReveal
            text="Live Task Dashboard"
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
            Real-time task management powered by AI.
          </motion.p>
        </div>

        <motion.div
          className="max-w-4xl mx-auto"
          style={{ rotateX, scale, perspective: 1000 }}
        >
          <div className="glass rounded-3xl overflow-hidden border border-white/10 hover:border-purple-500/20 transition-colors duration-500">
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <motion.div 
                  className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.8 }}
                >
                  <LayoutDashboard className="w-5 h-5 text-white" />
                </motion.div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Task Dashboard</h3>
                  <p className="text-sm text-slate-500">AI-powered task management</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <Calendar className="w-4 h-4" />
                <span>June 2026</span>
              </div>
            </div>

            <div className="p-6">
              <div className="flex gap-3 mb-6">
                <input
                  type="text"
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && addTask()}
                  placeholder="Add a new task..."
                  className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500/50 transition-all duration-300 focus:shadow-[0_0_20px_rgba(139,92,246,0.1)]"
                />
                <motion.button
                  onClick={addTask}
                  className="px-4 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 text-white hover:shadow-[0_0_20px_rgba(139,92,246,0.3)] transition-shadow"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Plus className="w-5 h-5" />
                </motion.button>
              </div>

              <div className="space-y-3">
                {tasks.map((task, i) => (
                  <motion.div
                    key={task.id}
                    className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:border-purple-500/20 hover:bg-white/[0.07] transition-all duration-300 cursor-pointer"
                    initial={{ opacity: 0, x: -30, scale: 0.95 }}
                    animate={isInView ? { opacity: 1, x: 0, scale: 1 } : {}}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    whileHover={{ x: 5 }}
                    layout
                  >
                    <motion.div 
                      className={`px-3 py-1 rounded-full text-xs font-medium border ${statusColors[task.status as keyof typeof statusColors]}`}
                      whileHover={{ scale: 1.1 }}
                    >
                      {task.status}
                    </motion.div>
                    <span className="flex-1 text-white text-sm">{task.title}</span>
                    <div className="flex items-center gap-1 text-xs text-slate-500">
                      {(() => {
                        const Icon = priorityIcons[task.priority as keyof typeof priorityIcons];
                        return <Icon className="w-3 h-3" />;
                      })()}
                      <span className="capitalize">{task.priority}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
