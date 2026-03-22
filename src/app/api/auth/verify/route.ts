// =============================================================================
// WatchCrew - Email Verification API Route
// Generates and validates 6-digit verification codes.
// In production, this would send real emails via SendGrid/Resend/etc.
// For MVP, codes are stored in-memory and returned in the response for dev use.
// =============================================================================

import { NextRequest, NextResponse } from 'next/server';

// In-memory store for verification codes (resets on server restart)
const verificationCodes = new Map<
  string,
  { code: string; expiresAt: number; email: string }
>();

// Also store registered emails to prevent duplicates
const registeredEmails = new Map<string, { passwordHash: string }>();

function generateCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// POST /api/auth/verify — Generate & "send" a verification code
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, email, code, password } = body;

    if (action === 'send') {
      // Generate a new verification code
      if (!email || typeof email !== 'string') {
        return NextResponse.json(
          { error: 'Email is required' },
          { status: 400 }
        );
      }

      const emailLower = email.toLowerCase().trim();

      // Check if email is already registered
      if (registeredEmails.has(emailLower)) {
        return NextResponse.json(
          { error: 'An account with this email already exists' },
          { status: 409 }
        );
      }

      const verificationCode = generateCode();
      const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes

      verificationCodes.set(emailLower, {
        code: verificationCode,
        expiresAt,
        email: emailLower,
      });

      // In production, send email here via SendGrid/Resend/etc.
      // For MVP/dev, we return the code in the response
      console.log(
        `[WatchCrew] Verification code for ${emailLower}: ${verificationCode}`
      );

      return NextResponse.json({
        success: true,
        message: 'Verification code sent',
        // DEV ONLY: Include code in response for testing
        // Remove this in production!
        devCode: verificationCode,
      });
    }

    if (action === 'verify') {
      // Validate a verification code
      if (!email || !code) {
        return NextResponse.json(
          { error: 'Email and code are required' },
          { status: 400 }
        );
      }

      const emailLower = email.toLowerCase().trim();
      const stored = verificationCodes.get(emailLower);

      if (!stored) {
        return NextResponse.json(
          { error: 'No verification code found. Please request a new one.' },
          { status: 404 }
        );
      }

      if (Date.now() > stored.expiresAt) {
        verificationCodes.delete(emailLower);
        return NextResponse.json(
          { error: 'Verification code has expired. Please request a new one.' },
          { status: 410 }
        );
      }

      if (stored.code !== code) {
        return NextResponse.json(
          { error: 'Invalid verification code' },
          { status: 401 }
        );
      }

      // Code is valid — mark email as registered
      verificationCodes.delete(emailLower);
      registeredEmails.set(emailLower, {
        passwordHash: password || '', // In production, hash the password
      });

      return NextResponse.json({
        success: true,
        message: 'Email verified successfully',
      });
    }

    if (action === 'login') {
      // Check if email exists in registered emails
      if (!email || !password) {
        return NextResponse.json(
          { error: 'Email and password are required' },
          { status: 400 }
        );
      }

      const emailLower = email.toLowerCase().trim();
      const account = registeredEmails.get(emailLower);

      if (!account) {
        return NextResponse.json(
          { error: 'No account found with this email' },
          { status: 404 }
        );
      }

      // In production, compare hashed passwords
      if (account.passwordHash !== password) {
        return NextResponse.json(
          { error: 'Invalid password' },
          { status: 401 }
        );
      }

      return NextResponse.json({
        success: true,
        message: 'Login successful',
      });
    }

    if (action === 'change-password') {
      // Change password — requires current password + new password
      if (!email || !password) {
        return NextResponse.json(
          { error: 'Email and current password are required' },
          { status: 400 }
        );
      }

      const { newPassword } = body;
      if (!newPassword) {
        return NextResponse.json(
          { error: 'New password is required' },
          { status: 400 }
        );
      }

      const emailLower = email.toLowerCase().trim();
      const account = registeredEmails.get(emailLower);

      if (!account) {
        // For demo/local-only users, just accept the change
        registeredEmails.set(emailLower, { passwordHash: newPassword });
        return NextResponse.json({
          success: true,
          message: 'Password changed successfully',
        });
      }

      // Verify current password
      if (account.passwordHash && account.passwordHash !== password) {
        return NextResponse.json(
          { error: 'Current password is incorrect' },
          { status: 401 }
        );
      }

      // Update password
      registeredEmails.set(emailLower, { passwordHash: newPassword });

      return NextResponse.json({
        success: true,
        message: 'Password changed successfully',
      });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
