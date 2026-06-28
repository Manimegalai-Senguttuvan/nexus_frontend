"use client";

import { create } from 'zustand';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  tool?: string;
}

interface Task {
  id: string;
  title: string;
  status: 'pending' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
}

interface AppState {
  messages: ChatMessage[];
  tasks: Task[];
  activeTool: string;
  isLoading: boolean;
  addMessage: (msg: ChatMessage) => void;
  setActiveTool: (tool: string) => void;
  setLoading: (loading: boolean) => void;
  addTask: (task: Task) => void;
}

export const useStore = create<AppState>((set) => ({
  messages: [
    { id: '1', role: 'assistant', content: 'Welcome to NexusAI! I can help you with content writing, code generation, image creation, document analysis, and more. What would you like to do today?', tool: 'chat' }
  ],
  tasks: [
    { id: '1', title: 'AI Content Strategy', status: 'completed', priority: 'high' },
    { id: '2', title: 'Code Review Automation', status: 'in-progress', priority: 'high' },
    { id: '3', title: 'Data Visualization', status: 'pending', priority: 'medium' },
    { id: '4', title: 'Image Generation Batch', status: 'completed', priority: 'low' },
  ],
  activeTool: 'chat',
  isLoading: false,
  addMessage: (msg) => set((state) => ({ messages: [...state.messages, msg] })),
  setActiveTool: (tool) => set({ activeTool: tool }),
  setLoading: (loading) => set({ isLoading: loading }),
  addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
}));
