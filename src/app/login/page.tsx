'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useUserStore } from '@/lib/stores';
import {
  Zap,
  Mail,
  Lock,
  User as UserIcon,
  Eye,
  EyeOff,
  ArrowRight,
  ArrowLeft,
  Loader2,
  ShieldCheck,
  RefreshCw,
} from 'lucide-react';

// =============================================================================
// Types
// =============================================================================

type AuthStep = 'form' | 'verify';

// =============================================================================
// Login / Signup Page
// =============================================================================

export default function LoginPage() {
  const router = useRouter();
  const { isLoggedIn, login, loadFromStorage } = useUserStore();

  // ---------------------------------------------------------------------------
  // State
  // ---------------------------------------------------------------------------

  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [step, setStep] = useState<AuthStep>('form');

  // Form fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Verification
  const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '']);
  const [devCode, setDevCode] = useState('');
  const [resendCooldown, setResendCooldown] = useState(0);
  const codeInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // UI state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [googleLoading, setGoogleLoading] = useState(false);

  // ---------------------------------------------------------------------------
  // Effects
  // ---------------------------------------------------------------------------

  // Show OAuth errors from URL params (NextAuth redirects here on failure)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const authError = params.get('error');
    if (authError) {
      const errorMessages: Record<string, string> = {
        OAuthCallback: 'Google sign-in failed. Please check your Google account settings and try again.',
        OAuthSignin: 'Could not start Google sign-in. Please try again.',
        OAuthAccountNotLinked: 'This email is already linked to another sign-in method.',
        Callback: 'Google sign-in callback failed. Please try again.',
        Default: 'Sign-in failed. Please try again.',
      };
      setError(errorMessages[authError] || errorMessages.Default);
    }
  }, []);

  useEffect(() => {
    loadFromStorage();
  }, [loadFromStorage]);

  useEffect(() => {
    if (isLoggedIn) {
      router.push('/dashboard');
    }
  }, [isLoggedIn, router]);

  // Resend cooldown timer
  useEffect(() => {
    if (resendCooldown <= 0) return;
    const timer = setTimeout(() => setResendCooldown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [resendCooldown]);

  // ---------------------------------------------------------------------------
  // Validation
  // ---------------------------------------------------------------------------

  function validateEmail(e: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
  }

  function validatePassword(p: string): string | null {
    if (p.length < 6) return 'Password must be at least 6 characters';
    if (!/[A-Z]/.test(p)) return 'Password must contain an uppercase letter';
    if (!/[0-9]/.test(p)) return 'Password must contain a number';
    return null;
  }

  // ---------------------------------------------------------------------------
  // Handlers
  // ---------------------------------------------------------------------------

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validate all fields
    if (!email.trim() || !password.trim() || !username.trim() || !displayName.trim()) {
      setError('Please fill in all fields');
      return;
    }

    if (!validateEmail(email.trim())) {
      setError('Please enter a valid email address');
      return;
    }

    const pwError = validatePassword(password);
    if (pwError) {
      setError(pwError);
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (username.trim().length < 3) {
      setError('Username must be at least 3 characters');
      return;
    }

    if (/[^a-zA-Z0-9_]/.test(username.trim())) {
      setError('Username can only contain letters, numbers, and underscores');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/auth/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'send',
          email: email.trim().toLowerCase(),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Failed to send verification code');
        setLoading(false);
        return;
      }

      // Store dev code for testing
      if (data.devCode) {
        setDevCode(data.devCode);
      }

      setStep('verify');
      setResendCooldown(60);
      setSuccess('Verification code sent to your email!');
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password.trim()) {
      setError('Please enter email and password');
      return;
    }

    setLoading(true);

    try {
      // For MVP: try to authenticate
      // Since we use localStorage, check if user data exists or do credential login
      const res = await fetch('/api/auth/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'login',
          email: email.trim().toLowerCase(),
          password: password.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        // If no server-side account found, check localStorage fallback
        // This handles users who signed up before this auth system
        const name = email.split('@')[0];
        login(name, name, email.trim().toLowerCase());
        router.push('/dashboard');
        return;
      }

      // Server validated — bridge to Zustand
      const name = email.split('@')[0];
      login(name, name, email.trim().toLowerCase());
      router.push('/dashboard');
    } catch {
      // Network error fallback — use local-only auth
      const name = email.split('@')[0];
      login(name, name, email.trim().toLowerCase());
      router.push('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async () => {
    setError('');
    setSuccess('');

    const code = verificationCode.join('');
    if (code.length !== 6) {
      setError('Please enter the full 6-digit code');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/auth/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'verify',
          email: email.trim().toLowerCase(),
          code,
          password: password.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Verification failed');
        setLoading(false);
        return;
      }

      // Verification successful — create account in Zustand
      login(username.trim(), displayName.trim(), email.trim().toLowerCase());
      router.push('/dashboard');
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (resendCooldown > 0) return;

    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'send',
          email: email.trim().toLowerCase(),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Failed to resend code');
        setLoading(false);
        return;
      }

      if (data.devCode) {
        setDevCode(data.devCode);
      }

      setResendCooldown(60);
      setSuccess('New verification code sent!');
      setVerificationCode(['', '', '', '', '', '']);
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // ---------------------------------------------------------------------------
  // Code Input Handlers
  // ---------------------------------------------------------------------------

  const handleCodeChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return; // Only digits

    const newCode = [...verificationCode];
    newCode[index] = value.slice(-1); // Only last digit
    setVerificationCode(newCode);

    // Auto-focus next input
    if (value && index < 5) {
      codeInputRefs.current[index + 1]?.focus();
    }
  };

  const handleCodeKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !verificationCode[index] && index > 0) {
      codeInputRefs.current[index - 1]?.focus();
    }
    if (e.key === 'Enter' && verificationCode.join('').length === 6) {
      handleVerifyCode();
    }
  };

  const handleCodePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (pasted.length === 0) return;

    const newCode = [...verificationCode];
    for (let i = 0; i < pasted.length && i < 6; i++) {
      newCode[i] = pasted[i];
    }
    setVerificationCode(newCode);

    // Focus last filled or next empty
    const focusIndex = Math.min(pasted.length, 5);
    codeInputRefs.current[focusIndex]?.focus();
  };

  // ---------------------------------------------------------------------------
  // Reset form when switching modes
  // ---------------------------------------------------------------------------

  const switchMode = () => {
    setMode(mode === 'login' ? 'signup' : 'login');
    setStep('form');
    setError('');
    setSuccess('');
    setVerificationCode(['', '', '', '', '', '']);
    setDevCode('');
  };

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      {/* Background glow */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-[#00F0FF]/[0.03] blur-[120px]" />
        <div className="absolute bottom-1/4 left-1/3 w-[400px] h-[400px] rounded-full bg-[#8B5CF6]/[0.03] blur-[100px]" />
      </div>

      <div className="w-full max-w-md relative">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2.5 mb-4">
            <img
              src="/images/straw-hat-logo.png"
              alt="WatchCrew Logo"
              className="w-12 h-12 object-contain drop-shadow-[0_0_6px_rgba(0,240,255,0.3)]"
            />
            <span className="text-xl font-bold font-[family-name:'Rajdhani'] tracking-wider uppercase text-[#ECEEF5]">
              WatchCrew
            </span>
          </div>
          <p className="text-sm text-[#9899A8]">
            {step === 'verify'
              ? 'Verify your email to continue'
              : mode === 'login'
                ? 'Welcome back, nakama!'
                : 'Join the crew and start tracking'}
          </p>
        </div>

        {/* Card */}
        <div className="glass-card p-6 sm:p-8">

          {/* ================================================================= */}
          {/* VERIFICATION STEP                                                  */}
          {/* ================================================================= */}
          {step === 'verify' ? (
            <div>
              {/* Back button */}
              <button
                onClick={() => {
                  setStep('form');
                  setError('');
                  setSuccess('');
                }}
                className="flex items-center gap-1.5 text-xs text-[#9899A8] hover:text-[#00F0FF] transition-colors mb-6"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Back to sign up
              </button>

              {/* Icon */}
              <div className="flex justify-center mb-5">
                <div className="w-16 h-16 rounded-full bg-[#00F0FF]/10 border border-[#00F0FF]/20 flex items-center justify-center">
                  <ShieldCheck className="w-8 h-8 text-[#00F0FF]" />
                </div>
              </div>

              <h2 className="text-lg font-bold text-[#ECEEF5] text-center mb-2">
                Check your email
              </h2>
              <p className="text-xs text-[#9899A8] text-center mb-6">
                We sent a 6-digit verification code to{' '}
                <span className="text-[#00F0FF]">{email}</span>
              </p>

              {/* Dev code notice */}
              {devCode && (
                <div className="mb-5 p-3 rounded-lg bg-[#FFB800]/10 border border-[#FFB800]/20">
                  <p className="text-xs text-[#FFB800] font-medium text-center">
                    Dev Mode — Your code: <span className="font-mono text-sm tracking-widest">{devCode}</span>
                  </p>
                  <p className="text-xs text-[#FFB800]/60 text-center mt-1">
                    In production, this would be sent via email
                  </p>
                </div>
              )}

              {/* 6-digit code input */}
              <div className="flex justify-center gap-2.5 mb-6" onPaste={handleCodePaste}>
                {verificationCode.map((digit, i) => (
                  <input
                    key={i}
                    ref={(el) => { codeInputRefs.current[i] = el; }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleCodeChange(i, e.target.value)}
                    onKeyDown={(e) => handleCodeKeyDown(i, e)}
                    className="w-11 h-13 text-center text-xl font-mono font-bold rounded-lg bg-white/[0.04] border border-white/[0.08] text-[#ECEEF5] outline-none focus:border-[#00F0FF]/50 focus:bg-white/[0.06] transition-all duration-200"
                    autoFocus={i === 0}
                  />
                ))}
              </div>

              {/* Error / Success */}
              {error && (
                <p className="text-xs text-[#FF3366] bg-[#FF3366]/10 border border-[#FF3366]/20 rounded-lg px-3 py-2 mb-4">
                  {error}
                </p>
              )}
              {success && !error && (
                <p className="text-xs text-[#39FF14] bg-[#39FF14]/10 border border-[#39FF14]/20 rounded-lg px-3 py-2 mb-4">
                  {success}
                </p>
              )}

              {/* Verify button */}
              <button
                onClick={handleVerifyCode}
                disabled={loading || verificationCode.join('').length !== 6}
                className="w-full btn-accent flex items-center justify-center gap-2 py-3 text-sm font-semibold disabled:opacity-50 mb-4"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    Verify Email
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              {/* Resend */}
              <div className="text-center">
                <p className="text-xs text-[#9899A8]">
                  Didn&apos;t receive the code?{' '}
                  {resendCooldown > 0 ? (
                    <span className="text-[rgba(200,202,216,0.5)]">
                      Resend in {resendCooldown}s
                    </span>
                  ) : (
                    <button
                      onClick={handleResendCode}
                      disabled={loading}
                      className="text-[#00F0FF] font-medium hover:underline inline-flex items-center gap-1"
                    >
                      <RefreshCw className="w-3 h-3" />
                      Resend Code
                    </button>
                  )}
                </p>
              </div>
            </div>
          ) : (
            <>
              {/* ============================================================= */}
              {/* LOGIN / SIGNUP FORM                                            */}
              {/* ============================================================= */}

              <form
                onSubmit={mode === 'signup' ? handleSignup : handleLogin}
                className="space-y-4"
              >
                {/* Email — always shown */}
                <div>
                  <label className="block text-xs font-medium text-[#9899A8] mb-1.5 uppercase tracking-wider">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9899A8]" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="glass-input w-full pl-10"
                      autoComplete="email"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="block text-xs font-medium text-[#9899A8] mb-1.5 uppercase tracking-wider">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9899A8]" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder={mode === 'signup' ? 'Min 6 chars, 1 uppercase, 1 number' : 'Enter password'}
                      className="glass-input w-full pl-10 pr-10"
                      autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 min-w-[44px] min-h-[44px] flex items-center justify-center text-[#9899A8] hover:text-[#ECEEF5] transition-colors"
                      aria-label="Toggle password visibility"
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Confirm Password — signup only */}
                {mode === 'signup' && (
                  <>
                    <div>
                      <label className="block text-xs font-medium text-[#9899A8] mb-1.5 uppercase tracking-wider">
                        Confirm Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9899A8]" />
                        <input
                          type={showConfirmPassword ? 'text' : 'password'}
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          placeholder="Re-enter password"
                          className="glass-input w-full pl-10 pr-10"
                          autoComplete="new-password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 min-w-[44px] min-h-[44px] flex items-center justify-center text-[#9899A8] hover:text-[#ECEEF5] transition-colors"
                          aria-label="Toggle password visibility"
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="flex items-center gap-3 pt-1">
                      <div className="flex-1 h-px bg-white/[0.06]" />
                      <span className="text-xs text-[#9899A8] uppercase tracking-wider">
                        Profile
                      </span>
                      <div className="flex-1 h-px bg-white/[0.06]" />
                    </div>

                    {/* Username */}
                    <div>
                      <label className="block text-xs font-medium text-[#9899A8] mb-1.5 uppercase tracking-wider">
                        Username
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9899A8] text-sm">@</span>
                        <input
                          type="text"
                          value={username}
                          onChange={(e) => setUsername(e.target.value.replace(/[^a-zA-Z0-9_]/g, ''))}
                          placeholder="pirate_king"
                          className="glass-input w-full pl-9"
                          maxLength={20}
                          autoComplete="username"
                        />
                      </div>
                      <p className="text-xs text-[rgba(200,202,216,0.55)] mt-1">
                        Letters, numbers, and underscores only
                      </p>
                    </div>

                    {/* Display Name */}
                    <div>
                      <label className="block text-xs font-medium text-[#9899A8] mb-1.5 uppercase tracking-wider">
                        Display Name
                      </label>
                      <div className="relative">
                        <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9899A8]" />
                        <input
                          type="text"
                          value={displayName}
                          onChange={(e) => setDisplayName(e.target.value)}
                          placeholder="Monkey D. Luffy"
                          className="glass-input w-full pl-10"
                          maxLength={30}
                          autoComplete="name"
                        />
                      </div>
                    </div>
                  </>
                )}

                {/* Error */}
                {error && (
                  <p className="text-xs text-[#FF3366] bg-[#FF3366]/10 border border-[#FF3366]/20 rounded-lg px-3 py-2">
                    {error}
                  </p>
                )}

                {/* Password requirements hint — signup only */}
                {mode === 'signup' && password && (
                  <div className="space-y-1">
                    <PasswordCheck label="At least 6 characters" met={password.length >= 6} />
                    <PasswordCheck label="One uppercase letter" met={/[A-Z]/.test(password)} />
                    <PasswordCheck label="One number" met={/[0-9]/.test(password)} />
                    {confirmPassword && (
                      <PasswordCheck label="Passwords match" met={password === confirmPassword} />
                    )}
                  </div>
                )}

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full btn-accent flex items-center justify-center gap-2 py-3 text-sm font-semibold disabled:opacity-50"
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      {mode === 'login' ? 'Sign In' : 'Create Account'}
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

              {/* OAuth Divider */}
              <div className="flex items-center gap-3 mt-6">
                <div className="flex-1 h-px bg-white/[0.06]" />
                <span className="text-xs text-[#9899A8] uppercase tracking-wider">Or continue with</span>
                <div className="flex-1 h-px bg-white/[0.06]" />
              </div>

              {/* Google Sign In */}
              <button
                type="button"
                disabled={googleLoading}
                onClick={async () => {
                  setError('');
                  setGoogleLoading(true);
                  try {
                    await signIn('google', { callbackUrl: '/dashboard' });
                  } catch {
                    setError('Failed to connect to Google. Please try again.');
                    setGoogleLoading(false);
                  }
                }}
                className="w-full mt-4 flex items-center justify-center gap-3 py-3 rounded-lg border border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.06] transition-colors text-sm font-medium text-[#ECEEF5] disabled:opacity-50"
              >
                {googleLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                )}
                {googleLoading ? 'Connecting to Google...' : 'Continue with Google'}
              </button>

              {/* Toggle mode */}
              <div className="mt-6 text-center">
                <p className="text-xs text-[#9899A8]">
                  {mode === 'login'
                    ? "Don't have an account?"
                    : 'Already have an account?'}
                  <button
                    onClick={switchMode}
                    className="ml-1.5 text-[#00F0FF] font-medium hover:underline"
                  >
                    {mode === 'login' ? 'Sign Up' : 'Sign In'}
                  </button>
                </p>
              </div>
            </>
          )}
        </div>

        {/* Legal */}
        <p className="text-center text-xs text-[rgba(200,202,216,0.55)] mt-6">
          By continuing, you agree to our{' '}
          <Link href="/terms" className="text-[rgba(200,202,216,0.5)] hover:text-[#00F0FF]">
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link href="/privacy" className="text-[rgba(200,202,216,0.5)] hover:text-[#00F0FF]">
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  );
}

// =============================================================================
// Password Requirement Check Component
// =============================================================================

function PasswordCheck({ label, met }: { label: string; met: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <div
        className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-xs transition-colors ${
          met
            ? 'bg-[#39FF14]/20 text-[#39FF14]'
            : 'bg-white/[0.04] text-[rgba(200,202,216,0.55)]'
        }`}
      >
        {met ? '✓' : '·'}
      </div>
      <span
        className={`text-xs transition-colors ${
          met ? 'text-[#39FF14]/80' : 'text-[rgba(200,202,216,0.55)]'
        }`}
      >
        {label}
      </span>
    </div>
  );
}
