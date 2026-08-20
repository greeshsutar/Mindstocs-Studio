import { NextRequest, NextResponse } from 'next/server';
import { AuthService } from '@/../backend/services/auth.service';

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { success: false, message: 'Access token required.' },
        { status: 401 }
      );
    }

    const token = authHeader.split(' ')[1];
    const payload = AuthService.verifyToken(token);
    const user = await AuthService.getProfile(payload.userId);

    return NextResponse.json({
      success: true,
      message: 'Profile retrieved.',
      data: user,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: 'Invalid or expired token.' },
      { status: 401 }
    );
  }
}
