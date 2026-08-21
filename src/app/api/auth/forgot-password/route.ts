import { NextRequest, NextResponse } from 'next/server';
import { AuthService } from '@/../backend/services/auth.service';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { success: false, message: 'Email address is required.' },
        { status: 400 }
      );
    }

    const result = await AuthService.forgotPassword(email);

    return NextResponse.json({
      success: true,
      message: result.message,
      data: result,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to initiate password reset' },
      { status: 400 }
    );
  }
}
