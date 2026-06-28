import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (email === 'demo@nexusai.com' && password === 'demo123') {
      return NextResponse.json({
        success: true,
        user: {
          id: '1',
          name: 'Demo User',
          email: 'demo@nexusai.com',
          plan: 'Pro',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=demo'
        },
        token: 'demo-jwt-token-12345'
      });
    }

    return NextResponse.json(
      { success: false, error: 'Invalid credentials' },
      { status: 401 }
    );
  } catch {
    return NextResponse.json(
      { success: false, error: 'Invalid request' },
      { status: 400 }
    );
  }
}
