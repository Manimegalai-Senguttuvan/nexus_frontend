import { NextRequest, NextResponse } from 'next/server';

let tasks = [
  { id: '1', title: 'AI Content Strategy', status: 'completed', priority: 'high', createdAt: '2026-01-15' },
  { id: '2', title: 'Code Review Automation', status: 'in-progress', priority: 'high', createdAt: '2026-01-16' },
  { id: '3', title: 'Data Visualization', status: 'pending', priority: 'medium', createdAt: '2026-01-17' },
  { id: '4', title: 'Image Generation Batch', status: 'completed', priority: 'low', createdAt: '2026-01-18' },
  { id: '5', title: 'API Documentation', status: 'in-progress', priority: 'medium', createdAt: '2026-01-19' },
];

export async function GET() {
  return NextResponse.json({ success: true, tasks });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const newTask = {
      id: String(tasks.length + 1),
      title: body.title || 'New Task',
      status: 'pending',
      priority: body.priority || 'medium',
      createdAt: new Date().toISOString().split('T')[0]
    };
    tasks.push(newTask);
    return NextResponse.json({ success: true, task: newTask });
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid request' }, { status: 400 });
  }
}
