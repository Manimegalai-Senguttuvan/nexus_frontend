import { NextRequest, NextResponse } from 'next/server';
import { aiResponses } from '@/lib/data';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, tool = 'chat' } = body;

    await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 1200));

    const responses = aiResponses[tool] || aiResponses.chat;
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];

    const enhancedResponse = randomResponse + "\n\n---\n💡 Pro Tip: Try switching tools using the sidebar for specialized AI assistance.";

    return NextResponse.json({
      success: true,
      response: enhancedResponse,
      tool,
      timestamp: new Date().toISOString(),
      tokens: Math.floor(Math.random() * 500) + 100
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to process request' },
      { status: 500 }
    );
  }
}
