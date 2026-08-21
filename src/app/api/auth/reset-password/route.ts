import { NextRequest, NextResponse } from 'next/server';
import { AuthService } from '@/../backend/services/auth.service';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, resetToken, newPassword } = body;

    if (!email || !resetToken || !newPassword) {
      return NextResponse.json(
        { success: false, message: 'Email, reset token, and new password are required.' },
        { status: 400 }
      );
    }

    if (newPassword.length < 6) {
      return NextResponse.json(
        { success: false, message: 'Password must be at least 6 characters.' },
        { status: 400 }
      );
    }

    const result = await AuthService.resetPassword({
      email,
      resetToken,
      newPassword,
    });

    return NextResponse.json({
      success: true,
      message: result.message,
      data: result,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to reset password' },
      { status: 400 }
    );
  }
}
