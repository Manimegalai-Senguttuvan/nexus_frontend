export const aiTools = [
  { id: 'chat', name: 'AI Chat', icon: 'MessageSquare', desc: 'Natural conversations' },
  { id: 'write', name: 'Content Writer', icon: 'PenTool', desc: 'Blogs, emails, copy' },
  { id: 'code', name: 'Code Gen', icon: 'Code', desc: 'Full-stack code' },
  { id: 'image', name: 'Image Studio', icon: 'Image', desc: 'AI art & photos' },
  { id: 'doc', name: 'Doc Analyzer', icon: 'FileText', desc: 'PDF & doc insights' },
  { id: 'voice', name: 'Voice AI', icon: 'Mic', desc: 'Speech & audio' },
];

export const features = [
  { icon: 'Brain', title: 'AI Chat', desc: 'Natural language conversations with context-aware responses' },
  { icon: 'PenTool', title: 'Content Writer', desc: 'Generate blogs, emails, social posts, and marketing copy' },
  { icon: 'FileText', title: 'Doc Analyzer', desc: 'Upload PDFs and get instant summaries and insights' },
  { icon: 'BarChart3', title: 'Data Analytics', desc: 'Visualize data with AI-generated charts and reports' },
  { icon: 'Image', title: 'Image Studio', desc: 'Create stunning AI art and edit photos with prompts' },
  { icon: 'Code', title: 'Code Generator', desc: 'Write, debug, and explain code in any language' },
  { icon: 'Palette', title: 'Design AI', desc: 'Generate UI designs, logos, and brand assets' },
  { icon: 'Globe', title: 'Multi-Language', desc: 'Translate and communicate in 50+ languages' },
];

export const analyticsData = [
  { name: 'Mon', tasks: 45, ai: 32 },
  { name: 'Tue', tasks: 52, ai: 41 },
  { name: 'Wed', tasks: 38, ai: 28 },
  { name: 'Thu', tasks: 65, ai: 55 },
  { name: 'Fri', tasks: 48, ai: 42 },
  { name: 'Sat', tasks: 30, ai: 25 },
  { name: 'Sun', tasks: 25, ai: 20 },
];

export const aiResponses: Record<string, string[]> = {
  chat: [
    "I understand! Let me help you with that. Based on your request, I can provide detailed insights and actionable recommendations.",
    "Great question! Here is what I found: The key is to focus on iterative improvements while maintaining core functionality.",
    "Absolutely! I have analyzed this from multiple angles. The optimal approach would be to start with a MVP and scale gradually."
  ],
  write: [
    "Here is a compelling blog introduction: 'In the rapidly evolving landscape of artificial intelligence, productivity tools have become indispensable...'",
    "Email draft ready: 'Subject: Revolutionary AI Tools for Your Team. I wanted to share how our AI suite can transform your workflow...'",
    "Social media copy: 'Unlock 10x productivity with AI. From content creation to code generation, NexusAI does it all. Try it free today!'"
  ],
  code: [
    "```typescript\nconst optimizeWorkflow = async (tasks: Task[]) => {\n  const aiSuggestions = await analyzeWithAI(tasks);\n  return aiSuggestions.filter(t => t.priority > 0.8);\n};\n```",
    "```python\ndef generate_content(prompt, style='professional'):\n    ai_model = NexusAI.load('gpt-4')\n    return ai_model.generate(prompt, tone=style)\n```",
    "```javascript\n// React component with AI integration\nconst AIChat = () => {\n  const [messages, setMessages] = useState([]);\n  const sendMessage = async (text) => {\n    const response = await fetch('/api/ai/chat', {\n      method: 'POST',\n      body: JSON.stringify({ message: text })\n    });\n  };\n};\n```"
  ],
  image: [
    "[AI Generated Image: A futuristic workspace with holographic displays showing data visualizations, purple and cyan neon lighting, ultra-detailed, 8k resolution]",
    "[AI Generated Image: Abstract neural network visualization with glowing nodes and connections, dark background with purple and blue gradients, cinematic lighting]",
    "[AI Generated Image: A sleek AI assistant robot in a modern office, glass and chrome materials, soft ambient lighting, photorealistic]"
  ],
  doc: [
    "Document Analysis Complete:\n\nKey Findings:\n• Revenue increased 45% YoY\n• Customer retention at 92%\n• 3 critical action items identified\n\nRecommendations:\n1. Focus on enterprise segment\n2. Improve onboarding flow\n3. Expand AI feature set",
    "Summary of Q4 Report:\n\nHighlights:\n• 2.3M active users (+180%)\n• 99.9% uptime maintained\n• AI features drove 60% of engagement\n\nNext Steps:\n→ Scale infrastructure\n→ Launch mobile app\n→ Partner integrations",
    "Contract Analysis:\n\nRisk Assessment: LOW\nKey Clauses: 12 identified\nObligations: 8 compliance items\nRenewal: Auto-renewal in 90 days\n\nAction Required:\n✓ Review clause 7.3\n✓ Update liability terms\n✓ Confirm data processing addendum"
  ],
  voice: [
    "[Voice Transcription]: 'Meeting notes from product review. The team agreed on three priorities: AI chat improvements, dashboard redesign, and mobile responsiveness. Action items assigned to respective leads.'",
    "[Voice Analysis]: Detected sentiment: Positive (87%). Key topics: Productivity (45%), AI Features (30%), User Experience (25%). Speaker confidence: High.",
    "[Voice Synthesis]: 'Hello! I am your AI voice assistant. I can transcribe meetings, analyze sentiment, and even generate podcast scripts. How can I help you today?'"
  ]
};
