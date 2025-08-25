import {NextResponse} from 'next/server';
import type {NextRequest} from 'next/server';

export async function POST(request: NextRequest) {
  const response = NextResponse.json({success: true});

  console.log(response.cookies);

  response.cookies.set({
    name: 'accessToken',
    value: '',
    path: '/',
    expires: new Date(0),
    httpOnly: true,
    secure: true,
    sameSite: 'lax'
  });

  response.cookies.set({
    name: 'refreshToken',
    value: '',
    path: '/',
    expires: new Date(0),
    httpOnly: true,
    secure: true,
    sameSite: 'lax'
  });

  response.cookies.set({
    name: 'JSESSIONID',
    value: '',
    path: '/',
    expires: new Date(0),
    httpOnly: true,
    secure: true,
    sameSite: 'lax'
  });

  return response;
}