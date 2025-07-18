import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  const response = NextResponse.json({ success: true });

  response.cookies.set({
    name: 'access_token',
    value: '',
    path: '/',
    expires: new Date(0),
    httpOnly: true,
    secure: true,
    sameSite: 'lax'
  });

  return response;
}