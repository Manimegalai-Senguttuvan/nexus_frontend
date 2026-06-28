"use client";

import { useState, useRef, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Send, MessageSquare, PenTool, Code, Image, FileText, Mic, Loader2, Bot, User, Sparkles } from 'lucide-react';
import TextReveal from '../effects/TextReveal';

const tools = [
  { id: 'chat', name: 'AI Chat', icon: MessageSquare, color: 'from-purple-500 to-violet-600', activeColor: 'bg-purple-600' },
  { id: 'write', name: 'Writer', icon: PenTool, color: 'from-pink-500 to-rose-600', activeColor: 'bg-pink-600' },
  { id: 'code', name: 'Code', icon: Code, color: 'from-emerald-500 to-green-600', activeColor: 'bg-emerald-600' },
  { id: 'image', name: 'Image', icon: Image, color: 'from-cyan-500 to-teal-600', activeColor: 'bg-cyan-600' },
  { id: 'doc', name: 'Docs', icon: FileText, color: 'from-blue-500 to-indigo-600', activeColor: 'bg-blue-600' },
  { id: 'voice', name: 'Voice', icon: Mic, color: 'from-amber-500 to-orange-600', activeColor: 'bg-amber-600' },
];

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export default function AIChatSection() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });
  const [activeTool, setActiveTool] = useState('chat');
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  useEffect(scrollToBottom, [messages]);

  const startChat = () => {
    if (!hasStarted) {
      setHasStarted(true);
      setMessages([
        { id: '1', role: 'assistant', content: 'Welcome to NexusAI! I can help you with content writing, code generation, image creation, document analysis, and more. What would you like to do today?' }
      ]);
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    if (!hasStarted) {
      startChat();
    }

    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input, tool: activeTool })
      });
      const data = await res.json();

      if (data.success) {
        setMessages(prev => [...prev, {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: data.response
        }]);
      }
    } catch {
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="ai-chat" ref={containerRef} className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-slate-400">AI Assistant</span>
          </motion.div>

          <TextReveal
            text="Interactive AI Chat"
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
            Try our AI assistant with 6 specialized tools. Real API calls, real responses.
          </motion.p>
        </div>

        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 60, rotateX: 10 }}
          animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
          transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
          style={{ perspective: 1000 }}
        >
          <div className="glass rounded-3xl overflow-hidden border border-white/10 hover:border-purple-500/20 transition-colors duration-500">
            {/* Tool Switcher */}
            <div className="p-4 border-b border-white/10 flex gap-2 overflow-x-auto">
              {tools.map((tool) => (
                <motion.button
                  key={tool.id}
                  onClick={() => { setActiveTool(tool.id); startChat(); }}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                    activeTool === tool.id
                      ? 'text-white shadow-lg'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                  style={activeTool === tool.id ? { 
                    background: `linear-gradient(135deg, var(--tw-gradient-stops))`,
                    boxShadow: '0 4px 20px rgba(139, 92, 246, 0.3)'
                  } : {}}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    animate={activeTool === tool.id ? { rotate: [0, -10, 10, 0] } : {}}
                    transition={{ duration: 0.5 }}
                  >
                    <tool.icon className="w-4 h-4" />
                  </motion.div>
                  {tool.name}
                </motion.button>
              ))}
            </div>

            {/* Messages Area */}
            <div className="h-96 overflow-y-auto p-6 space-y-4 relative">
              {!hasStarted ? (
                <motion.div 
                  className="absolute inset-0 flex flex-col items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <motion.div
                    className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-600 to-cyan-600 flex items-center justify-center mb-4 shadow-[0_0_40px_rgba(139,92,246,0.3)]"
                    animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <Bot className="w-10 h-10 text-white" />
                  </motion.div>
                  <p className="text-slate-400 text-center max-w-sm">
                    Select a tool above or type a message to start chatting with NexusAI
                  </p>
                </motion.div>
              ) : (
                <AnimatePresence mode="popLayout">
                  {messages.map((msg, i) => (
                    <motion.div
                      key={msg.id}
                      className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                      initial={{ opacity: 0, y: 20, scale: 0.9, x: msg.role === 'user' ? 50 : -50 }}
                      animate={{ opacity: 1, y: 0, scale: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.4, delay: i * 0.05 }}
                    >
                      <motion.div 
                        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                          msg.role === 'user'
                            ? 'bg-gradient-to-br from-purple-500 to-cyan-500'
                            : 'bg-gradient-to-br from-slate-600 to-slate-700'
                        }`}
                        whileHover={{ scale: 1.2, rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        {msg.role === 'user' ? <User className="w-4 h-4 text-white" /> : <Bot className="w-4 h-4 text-white" />}
                      </motion.div>
                      <motion.div 
                        className={`max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed ${
                          msg.role === 'user'
                            ? 'bg-gradient-to-r from-purple-600/30 to-cyan-600/30 text-white'
                            : 'bg-white/5 text-slate-300'
                        }`}
                        whileHover={{ scale: 1.02 }}
                      >
                        <pre className="whitespace-pre-wrap font-sans">{msg.content}</pre>
                      </motion.div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
              {isLoading && (
                <motion.div 
                  className="flex gap-3" 
                  initial={{ opacity: 0, y: 10 }} 
                  animate={{ opacity: 1, y: 0 }}
                >
                  <motion.div 
                    className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  >
                    <Bot className="w-4 h-4 text-white" />
                  </motion.div>
                  <div className="p-4 rounded-2xl bg-white/5">
                    <Loader2 className="w-5 h-5 text-purple-400 animate-spin" />
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-white/10">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Type a message..."
                  className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500/50 transition-all duration-300 focus:shadow-[0_0_20px_rgba(139,92,246,0.1)]"
                />
                <motion.button
                  onClick={handleSend}
                  disabled={isLoading || !input.trim()}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: 1.05, rotate: [0, -5, 5, 0] }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Send className="w-5 h-5" />
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
