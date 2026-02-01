import { NextResponse, type NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  const { password } = await request.json();
  const sitePassword = process.env.SITE_PASSWORD;

  console.log('Password check:', { 
    received: password, 
    expected: sitePassword,
    match: password === sitePassword 
  });

  if (!sitePassword) {
    console.error('SITE_PASSWORD environment variable is not set');
    return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
  }

  if (password === sitePassword) {
    const response = NextResponse.json({ success: true });
    
    // Set auth cookie - expires in 30 days
    response.cookies.set('site-auth', 'true', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });

    return response;
  }

  return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
}
