import { NextResponse } from 'next/server';

export async function GET() {
  const data = {
    summary: {
      totalTasks: 248,
      completedThisWeek: 42,
      aiAssisted: 186,
      productivityGain: '340%'
    },
    weekly: [
      { day: 'Mon', tasks: 45, ai: 32, manual: 13 },
      { day: 'Tue', tasks: 52, ai: 41, manual: 11 },
      { day: 'Wed', tasks: 38, ai: 28, manual: 10 },
      { day: 'Thu', tasks: 65, ai: 55, manual: 10 },
      { day: 'Fri', tasks: 48, ai: 42, manual: 6 },
      { day: 'Sat', tasks: 30, ai: 25, manual: 5 },
      { day: 'Sun', tasks: 25, ai: 20, manual: 5 },
    ],
    metrics: [
      { label: 'AI Accuracy', value: 98.7, color: '#8b5cf6' },
      { label: 'Response Time', value: 1.2, color: '#06b6d4', suffix: 's' },
      { label: 'User Satisfaction', value: 96.4, color: '#ec4899' },
      { label: 'Tasks Automated', value: 75, color: '#10b981', suffix: '%' },
    ]
  };

  return NextResponse.json({ success: true, data });
}
