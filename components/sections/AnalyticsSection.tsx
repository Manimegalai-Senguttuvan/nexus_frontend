"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { BarChart3, TrendingUp, Users, Clock } from "lucide-react";

const stats = [
  { label: "Total Tasks", value: 124, change: "+12%", icon: BarChart3, color: "text-purple-400" },
  { label: "Completed", value: 89, change: "+8%", icon: TrendingUp, color: "text-cyan-400" },
  { label: "Team Members", value: 12, change: "+2", icon: Users, color: "text-pink-400" },
  { label: "Avg Time", value: "2.4h", change: "-15%", icon: Clock, color: "text-emerald-400" },
];

const weeklyData = [
  { day: "Mon", tasks: 45, ai: 12 },
  { day: "Tue", tasks: 52, ai: 18 },
  { day: "Wed", tasks: 38, ai: 15 },
  { day: "Thu", tasks: 65, ai: 22 },
  { day: "Fri", tasks: 48, ai: 20 },
  { day: "Sat", tasks: 30, ai: 8 },
  { day: "Sun", tasks: 25, ai: 5 },
];

const maxTasks = Math.max(...weeklyData.map((d) => d.tasks));

export function AnalyticsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="analytics" className="relative py-24 px-4 sm:px-6 lg:px-8" ref={ref}>
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Analytics & Insights
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            Track your productivity with real-time data and AI-powered insights
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ delay: 0.1 + i * 0.1, duration: 0.5 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm hover:border-purple-500/30 transition-colors"
            >
              <div className="flex items-center justify-between mb-4">
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
                <span className="text-xs text-emerald-400 font-medium">{stat.change}</span>
              </div>
              <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-sm text-slate-400">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Bar Chart */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm"
        >
          <h3 className="text-lg font-semibold text-white mb-6">Weekly Activity</h3>
          
          <div className="flex items-end justify-between gap-3 h-48">
            {weeklyData.map((day, i) => (
              <div key={day.day} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full flex gap-1 h-full items-end">
                  {/* Tasks bar */}
                  <motion.div
                    className="flex-1 bg-gradient-to-t from-purple-600 to-purple-400 rounded-t-md relative group"
                    initial={{ height: 0 }}
                    animate={isInView ? { height: `${(day.tasks / maxTasks) * 100}%` } : {}}
                    transition={{ delay: 0.5 + i * 0.1, duration: 1, ease: "easeOut" }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-t-md" />
                  </motion.div>
                  
                  {/* AI bar */}
                  <motion.div
                    className="flex-1 bg-gradient-to-t from-cyan-600 to-cyan-400 rounded-t-md relative group"
                    initial={{ height: 0 }}
                    animate={isInView ? { height: `${(day.ai / maxTasks) * 100}%` } : {}}
                    transition={{ delay: 0.5 + i * 0.1, duration: 1, ease: "easeOut" }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-t-md" />
                  </motion.div>
                </div>
                <span className="text-xs text-slate-400">{day.day}</span>
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="flex items-center gap-6 mt-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-purple-400" />
              <span className="text-sm text-slate-400">Tasks</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-cyan-400" />
              <span className="text-sm text-slate-400">AI Interactions</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
