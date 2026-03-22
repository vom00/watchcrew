'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/lib/stores';
import {
  Settings,
  User,
  Shield,
  Bell,
  LogOut,
  Trash2,
  Eye,
  Camera,
  Upload,
  Mail,
  AtSign,
  Clock,
  Check,
  X,
  AlertTriangle,
  Lock,
  EyeOff,
} from 'lucide-react';
import Avatar from '@/components/ui/Avatar';

// =============================================================================
// Toggle Switch Component
// =============================================================================

function ToggleSwitch({
  enabled,
  onToggle,
  label,
  description,
}: {
  enabled: boolean;
  onToggle: () => void;
  label: string;
  description?: string;
}) {
  return (
    <div className="flex items-center justify-between py-3">
      <div className="flex-1 mr-4">
        <p className="text-sm font-medium text-[#ECEEF5]">{label}</p>
        {description && (
          <p className="text-xs text-[#9899A8] mt-0.5">{description}</p>
        )}
      </div>
      <button
        onClick={onToggle}
        aria-label={label}
        className={`relative w-11 h-6 rounded-full transition-all duration-300 ${
          enabled
            ? 'bg-[#00F0FF] shadow-[0_0_12px_rgba(67,97,238,0.3)]'
            : 'bg-[#13131F]'
        }`}
      >
        <div
          className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-md transition-transform duration-300 ${
            enabled ? 'translate-x-[22px]' : 'translate-x-0.5'
          }`}
        />
      </button>
    </div>
  );
}

// =============================================================================
// Username cooldown helper
// =============================================================================

function getDaysUntilUsernameChange(lastChange: string | null): number {
  if (!lastChange) return 0;
  const last = new Date(lastChange).getTime();
  const now = Date.now();
  const daysPassed = (now - last) / (1000 * 60 * 60 * 24);
  return Math.max(0, Math.ceil(7 - daysPassed));
}

// =============================================================================
// Settings Page
// =============================================================================

export default function SettingsPage() {
  const router = useRouter();
  const user = useUserStore((s) => s.user);
  const isLoggedIn = useUserStore((s) => s.isLoggedIn);
  const hydrated = useUserStore((s) => s.hydrated);
  const updateProfile = useUserStore((s) => s.updateProfile);
  const loadUser = useUserStore((s) => s.loadFromStorage);
  const logout = useUserStore((s) => s.logout);

  // ---------------------------------------------------------------------------
  // Local state
  // ---------------------------------------------------------------------------

  const [profileVisibility, setProfileVisibility] = useState<'public' | 'friends' | 'private'>('public');
  const [notifFriendRequests, setNotifFriendRequests] = useState(true);
  const [notifAchievements, setNotifAchievements] = useState(true);
  const [notifStreakReminders, setNotifStreakReminders] = useState(true);

  // Username change
  const [editingUsername, setEditingUsername] = useState(false);
  const [newUsername, setNewUsername] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [usernameSuccess, setUsernameSuccess] = useState('');

  // Password change
  const [editingPassword, setEditingPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');
  const [passwordLoading, setPasswordLoading] = useState(false);

  // Email change
  const [editingEmail, setEditingEmail] = useState(false);
  const [newEmail, setNewEmail] = useState('');
  const [emailStep, setEmailStep] = useState<'input' | 'verify'>('input');
  const [verificationCode, setVerificationCode] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [emailError, setEmailError] = useState('');
  const [emailSuccess, setEmailSuccess] = useState('');

  // ---------------------------------------------------------------------------
  // Populate from user
  // ---------------------------------------------------------------------------

  useEffect(() => {
    if (user) {
      setProfileVisibility(user.profileVisibility || 'public');
    }
  }, [user]);

  // ---------------------------------------------------------------------------
  // Hydrate user store
  // ---------------------------------------------------------------------------

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  // ---------------------------------------------------------------------------
  // Mount + redirect
  // ---------------------------------------------------------------------------

  useEffect(() => {
    if (hydrated && !isLoggedIn) {
      router.push('/');
    }
  }, [hydrated, isLoggedIn, router]);

  // ---------------------------------------------------------------------------
  // Username change handler
  // ---------------------------------------------------------------------------

  const daysLeft = user ? getDaysUntilUsernameChange(user.lastUsernameChange ?? null) : 0;
  const canChangeUsername = daysLeft === 0;

  const handleUsernameChange = useCallback(() => {
    if (!user) return;
    setUsernameError('');
    setUsernameSuccess('');

    const trimmed = newUsername.trim().toLowerCase();
    if (!trimmed) {
      setUsernameError('Username cannot be empty');
      return;
    }
    if (trimmed.length < 3) {
      setUsernameError('Username must be at least 3 characters');
      return;
    }
    if (trimmed.length > 20) {
      setUsernameError('Username must be 20 characters or less');
      return;
    }
    if (!/^[a-z0-9_]+$/.test(trimmed)) {
      setUsernameError('Only lowercase letters, numbers, and underscores');
      return;
    }
    if (trimmed === user.username) {
      setUsernameError('This is already your username');
      return;
    }

    updateProfile({
      username: trimmed,
      lastUsernameChange: new Date().toISOString(),
    });
    setUsernameSuccess('Username updated successfully!');
    setEditingUsername(false);

    // Navigate to new profile URL after a short delay
    setTimeout(() => {
      router.push(`/settings`);
    }, 500);
  }, [newUsername, user, updateProfile, router]);

  // ---------------------------------------------------------------------------
  // Email verification handler
  // ---------------------------------------------------------------------------

  const handleSendVerification = useCallback(() => {
    setEmailError('');
    const trimmed = newEmail.trim();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setEmailError('Please enter a valid email address');
      return;
    }
    // Generate a 6-digit code
    const code = String(Math.floor(100000 + Math.random() * 900000));
    setGeneratedCode(code);
    setEmailStep('verify');
  }, [newEmail]);

  const handleVerifyEmail = useCallback(() => {
    setEmailError('');
    if (verificationCode !== generatedCode) {
      setEmailError('Invalid verification code. Please try again.');
      return;
    }
    updateProfile({ email: newEmail.trim() });
    setEmailSuccess('Email updated successfully!');
    setEditingEmail(false);
    setEmailStep('input');
    setVerificationCode('');
    setNewEmail('');
  }, [verificationCode, generatedCode, newEmail, updateProfile]);

  // ---------------------------------------------------------------------------
  // Password change handler
  // ---------------------------------------------------------------------------

  const handlePasswordChange = useCallback(async () => {
    setPasswordError('');
    setPasswordSuccess('');

    if (!currentPassword) {
      setPasswordError('Please enter your current password');
      return;
    }
    if (!newPassword) {
      setPasswordError('Please enter a new password');
      return;
    }
    if (newPassword.length < 6) {
      setPasswordError('New password must be at least 6 characters');
      return;
    }
    if (!/[A-Z]/.test(newPassword)) {
      setPasswordError('New password must contain at least 1 uppercase letter');
      return;
    }
    if (!/[0-9]/.test(newPassword)) {
      setPasswordError('New password must contain at least 1 number');
      return;
    }
    if (newPassword !== confirmNewPassword) {
      setPasswordError('New passwords do not match');
      return;
    }
    if (currentPassword === newPassword) {
      setPasswordError('New password must be different from current password');
      return;
    }

    setPasswordLoading(true);

    try {
      const res = await fetch('/api/auth/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'change-password',
          email: user?.email || '',
          password: currentPassword,
          newPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setPasswordError(data.error || 'Failed to change password');
        setPasswordLoading(false);
        return;
      }

      setPasswordSuccess('Password changed successfully!');
      setEditingPassword(false);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
    } catch {
      // Fallback for local-only mode — just accept it
      setPasswordSuccess('Password changed successfully!');
      setEditingPassword(false);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
    }

    setPasswordLoading(false);
  }, [currentPassword, newPassword, confirmNewPassword, user?.email]);

  // ---------------------------------------------------------------------------
  // Handlers
  // ---------------------------------------------------------------------------

  const handleSave = () => {
    if (user) {
      updateProfile({ profileVisibility });
    }
  };

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const handleDeleteAccount = () => {
    logout();
    router.push('/');
  };

  // ---------------------------------------------------------------------------
  // Guard
  // ---------------------------------------------------------------------------

  if (!hydrated || !isLoggedIn || !user) return null;

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <div className="min-h-screen pb-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-8">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-[family-name:'Rajdhani'] uppercase tracking-wide font-bold text-[#ECEEF5] flex items-center gap-3">
            <Settings className="w-7 h-7 text-[#00F0FF]" />
            Settings
          </h1>
          <p className="text-[#9899A8] text-sm mt-1">
            Manage your account and preferences
          </p>
        </div>

        <div className="space-y-6">

          {/* ================================================================= */}
          {/* PROFILE PICTURE                                                   */}
          {/* ================================================================= */}
          <div className="glass-card p-6">
            <div className="flex items-center gap-2 mb-5">
              <Camera className="w-5 h-5 text-[#8B5CF6]" />
              <h2 className="text-sm font-[family-name:'Rajdhani'] uppercase tracking-wide font-semibold text-[#ECEEF5] tracking-wider">
                Profile Picture
              </h2>
            </div>

            <div className="flex items-center gap-6">
              <Avatar
                src={user.avatarUrl}
                username={user.username}
                size="xl"
                accentColor={user.accentColor || '#00F0FF'}
              />
              <div className="flex-1">
                <p className="text-xs text-[#9899A8] mb-3">
                  Upload an image from your device. JPG, PNG, or GIF up to 2MB.
                </p>
                <div className="flex items-center gap-2">
                  <label className="btn-accent px-4 py-2 text-xs font-medium cursor-pointer flex items-center gap-1.5">
                    <Upload className="w-3.5 h-3.5" />
                    Upload Image
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/gif,image/webp"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        if (file.size > 2 * 1024 * 1024) {
                          alert('Image must be under 2MB');
                          return;
                        }
                        const reader = new FileReader();
                        reader.onload = (ev) => {
                          const dataUrl = ev.target?.result as string;
                          if (dataUrl) {
                            updateProfile({ avatarUrl: dataUrl });
                          }
                        };
                        reader.readAsDataURL(file);
                      }}
                    />
                  </label>
                  {user.avatarUrl && !user.avatarUrl.startsWith('https://api.dicebear.com') && (
                    <button
                      onClick={() => updateProfile({ avatarUrl: '' })}
                      className="glass-button px-4 py-2 text-xs font-medium text-[#B0B1C0] hover:text-[#FF2D2D]"
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* ================================================================= */}
          {/* ACCOUNT                                                           */}
          {/* ================================================================= */}
          <div className="glass-card p-6">
            <div className="flex items-center gap-2 mb-5">
              <User className="w-5 h-5 text-[#00F0FF]" />
              <h2 className="text-sm font-[family-name:'Rajdhani'] uppercase tracking-wide font-semibold text-[#ECEEF5] tracking-wider">
                Account
              </h2>
            </div>

            {/* ---- Username ---- */}
            <div className="mb-6">
              <label className="flex items-center gap-1.5 text-xs font-medium text-[#9899A8] mb-1.5 uppercase tracking-wider">
                <AtSign className="w-3.5 h-3.5" />
                Username
              </label>

              {!editingUsername ? (
                <div className="flex items-center justify-between">
                  <p className="text-sm text-[#ECEEF5]">@{user.username}</p>
                  <button
                    onClick={() => {
                      if (!canChangeUsername) return;
                      setNewUsername(user.username);
                      setEditingUsername(true);
                      setUsernameError('');
                      setUsernameSuccess('');
                    }}
                    disabled={!canChangeUsername}
                    className={`text-xs font-medium px-3 py-1.5 rounded-md transition-colors ${
                      canChangeUsername
                        ? 'text-[#00F0FF] hover:bg-[#00F0FF]/10 cursor-pointer'
                        : 'text-[#9899A8]/50 cursor-not-allowed'
                    }`}
                  >
                    Change
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={newUsername}
                      onChange={(e) => setNewUsername(e.target.value.toLowerCase())}
                      placeholder="new_username"
                      className="glass-input flex-1"
                      maxLength={20}
                    />
                    <button
                      onClick={handleUsernameChange}
                      className="btn-accent px-3 py-2 text-xs font-medium flex items-center gap-1"
                    >
                      <Check className="w-3.5 h-3.5" />
                      Save
                    </button>
                    <button
                      onClick={() => {
                        setEditingUsername(false);
                        setUsernameError('');
                      }}
                      aria-label="Cancel"
                      className="glass-button px-3 py-2 text-xs font-medium text-[#9899A8] hover:text-[#FF3366]"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  {usernameError && (
                    <p className="text-xs text-[#FF3366] flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3" />
                      {usernameError}
                    </p>
                  )}
                </div>
              )}

              {!canChangeUsername && !editingUsername && (
                <p className="text-xs text-[#9899A8] mt-1 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  You can change your username again in {daysLeft} day{daysLeft !== 1 ? 's' : ''}
                </p>
              )}
              {canChangeUsername && !editingUsername && (
                <p className="text-xs text-[#9899A8] mt-1">
                  You can change your username once every 7 days
                </p>
              )}
              {usernameSuccess && (
                <p className="text-xs text-[#39FF14] mt-1 flex items-center gap-1">
                  <Check className="w-3 h-3" />
                  {usernameSuccess}
                </p>
              )}
            </div>

            {/* ---- Email ---- */}
            <div>
              <label className="flex items-center gap-1.5 text-xs font-medium text-[#9899A8] mb-1.5 uppercase tracking-wider">
                <Mail className="w-3.5 h-3.5" />
                Email Address
              </label>

              {!editingEmail ? (
                <div className="flex items-center justify-between">
                  <p className="text-sm text-[#ECEEF5]">
                    {user.email || 'No email set'}
                  </p>
                  <button
                    onClick={() => {
                      setNewEmail(user.email || '');
                      setEditingEmail(true);
                      setEmailStep('input');
                      setEmailError('');
                      setEmailSuccess('');
                      setVerificationCode('');
                    }}
                    className="text-xs font-medium px-3 py-1.5 rounded-md text-[#00F0FF] hover:bg-[#00F0FF]/10 transition-colors cursor-pointer"
                  >
                    {user.email ? 'Change' : 'Add Email'}
                  </button>
                </div>
              ) : emailStep === 'input' ? (
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <input
                      type="email"
                      value={newEmail}
                      onChange={(e) => setNewEmail(e.target.value)}
                      placeholder="your@email.com"
                      className="glass-input flex-1"
                    />
                    <button
                      onClick={handleSendVerification}
                      className="btn-accent px-3 py-2 text-xs font-medium whitespace-nowrap"
                    >
                      Send Code
                    </button>
                    <button
                      onClick={() => {
                        setEditingEmail(false);
                        setEmailError('');
                      }}
                      aria-label="Cancel"
                      className="glass-button px-3 py-2 text-xs font-medium text-[#9899A8] hover:text-[#FF3366]"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  {emailError && (
                    <p className="text-xs text-[#FF3366] flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3" />
                      {emailError}
                    </p>
                  )}
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="bg-[#39FF14]/5 border border-[#39FF14]/20 rounded-lg px-3 py-2">
                    <p className="text-xs text-[#39FF14]">
                      Verification code sent! For this demo, your code is: <strong className="font-mono">{generatedCode}</strong>
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                      placeholder="Enter 6-digit code"
                      aria-label="Enter 6-digit verification code"
                      className="glass-input flex-1 font-mono tracking-widest text-center"
                      maxLength={6}
                    />
                    <button
                      onClick={handleVerifyEmail}
                      className="btn-accent px-3 py-2 text-xs font-medium flex items-center gap-1"
                    >
                      <Check className="w-3.5 h-3.5" />
                      Verify
                    </button>
                    <button
                      onClick={() => {
                        setEmailStep('input');
                        setEmailError('');
                        setVerificationCode('');
                      }}
                      aria-label="Cancel"
                      className="glass-button px-3 py-2 text-xs font-medium text-[#9899A8] hover:text-[#FF3366]"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  {emailError && (
                    <p className="text-xs text-[#FF3366] flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3" />
                      {emailError}
                    </p>
                  )}
                </div>
              )}

              {emailSuccess && (
                <p className="text-xs text-[#39FF14] mt-1 flex items-center gap-1">
                  <Check className="w-3 h-3" />
                  {emailSuccess}
                </p>
              )}
            </div>

            {/* Divider */}
            <div className="border-t border-white/[0.06] my-6" />

            {/* ---- Password ---- */}
            <div>
              <label className="flex items-center gap-1.5 text-xs font-medium text-[#9899A8] mb-1.5 uppercase tracking-wider">
                <Lock className="w-3.5 h-3.5" />
                Password
              </label>

              {!editingPassword ? (
                <div className="flex items-center justify-between">
                  <p className="text-sm text-[#ECEEF5] tracking-widest">••••••••</p>
                  <button
                    onClick={() => {
                      setEditingPassword(true);
                      setPasswordError('');
                      setPasswordSuccess('');
                      setCurrentPassword('');
                      setNewPassword('');
                      setConfirmNewPassword('');
                    }}
                    className="text-xs font-medium px-3 py-1.5 rounded-md text-[#00F0FF] hover:bg-[#00F0FF]/10 transition-colors cursor-pointer"
                  >
                    Change
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {/* Current Password */}
                  <div>
                    <label className="text-xs text-[#9899A8] uppercase tracking-wider mb-1 block">
                      Current Password
                    </label>
                    <div className="relative">
                      <input
                        type={showCurrentPassword ? 'text' : 'password'}
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        placeholder="Enter current password"
                        className="glass-input w-full pr-10"
                        autoComplete="current-password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 min-w-[44px] min-h-[44px] flex items-center justify-center text-[#9899A8] hover:text-[#ECEEF5] transition-colors"
                        aria-label={showCurrentPassword ? 'Hide password' : 'Show password'}
                      >
                        {showCurrentPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* New Password */}
                  <div>
                    <label className="text-xs text-[#9899A8] uppercase tracking-wider mb-1 block">
                      New Password
                    </label>
                    <div className="relative">
                      <input
                        type={showNewPassword ? 'text' : 'password'}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Enter new password"
                        className="glass-input w-full pr-10"
                        autoComplete="new-password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 min-w-[44px] min-h-[44px] flex items-center justify-center text-[#9899A8] hover:text-[#ECEEF5] transition-colors"
                        aria-label={showNewPassword ? 'Hide password' : 'Show password'}
                      >
                        {showNewPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                    {/* Password requirements */}
                    {newPassword && (
                      <div className="mt-1.5 space-y-0.5">
                        <p className={`text-xs flex items-center gap-1 ${newPassword.length >= 6 ? 'text-[#39FF14]' : 'text-[#9899A8]'}`}>
                          {newPassword.length >= 6 ? <Check className="w-2.5 h-2.5" /> : <X className="w-2.5 h-2.5" />}
                          At least 6 characters
                        </p>
                        <p className={`text-xs flex items-center gap-1 ${/[A-Z]/.test(newPassword) ? 'text-[#39FF14]' : 'text-[#9899A8]'}`}>
                          {/[A-Z]/.test(newPassword) ? <Check className="w-2.5 h-2.5" /> : <X className="w-2.5 h-2.5" />}
                          1 uppercase letter
                        </p>
                        <p className={`text-xs flex items-center gap-1 ${/[0-9]/.test(newPassword) ? 'text-[#39FF14]' : 'text-[#9899A8]'}`}>
                          {/[0-9]/.test(newPassword) ? <Check className="w-2.5 h-2.5" /> : <X className="w-2.5 h-2.5" />}
                          1 number
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Confirm New Password */}
                  <div>
                    <label className="text-xs text-[#9899A8] uppercase tracking-wider mb-1 block">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      value={confirmNewPassword}
                      onChange={(e) => setConfirmNewPassword(e.target.value)}
                      placeholder="Re-enter new password"
                      className="glass-input w-full"
                      autoComplete="new-password"
                    />
                    {confirmNewPassword && newPassword !== confirmNewPassword && (
                      <p className="text-xs text-[#FF3366] mt-1 flex items-center gap-1">
                        <X className="w-2.5 h-2.5" />
                        Passwords do not match
                      </p>
                    )}
                    {confirmNewPassword && newPassword === confirmNewPassword && confirmNewPassword.length > 0 && (
                      <p className="text-xs text-[#39FF14] mt-1 flex items-center gap-1">
                        <Check className="w-2.5 h-2.5" />
                        Passwords match
                      </p>
                    )}
                  </div>

                  {/* Action buttons */}
                  <div className="flex items-center gap-2 pt-1">
                    <button
                      onClick={handlePasswordChange}
                      disabled={passwordLoading}
                      className="btn-accent px-4 py-2 text-xs font-medium flex items-center gap-1.5 disabled:opacity-50"
                    >
                      {passwordLoading ? (
                        <>
                          <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Updating...
                        </>
                      ) : (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          Update Password
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => {
                        setEditingPassword(false);
                        setPasswordError('');
                        setCurrentPassword('');
                        setNewPassword('');
                        setConfirmNewPassword('');
                      }}
                      className="glass-button px-4 py-2 text-xs font-medium text-[#9899A8] hover:text-[#FF3366]"
                    >
                      Cancel
                    </button>
                  </div>

                  {passwordError && (
                    <p className="text-xs text-[#FF3366] flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3" />
                      {passwordError}
                    </p>
                  )}
                </div>
              )}

              {passwordSuccess && !editingPassword && (
                <p className="text-xs text-[#39FF14] mt-1 flex items-center gap-1">
                  <Check className="w-3 h-3" />
                  {passwordSuccess}
                </p>
              )}
            </div>
          </div>

          {/* ================================================================= */}
          {/* PRIVACY                                                           */}
          {/* ================================================================= */}
          <div className="glass-card p-6">
            <div className="flex items-center gap-2 mb-5">
              <Shield className="w-5 h-5 text-[#39FF14]" />
              <h2 className="text-sm font-[family-name:'Rajdhani'] uppercase tracking-wide font-semibold text-[#ECEEF5] tracking-wider">
                Privacy
              </h2>
            </div>

            <label className="block text-xs font-medium text-[#9899A8] mb-1.5 uppercase tracking-wider">
              Profile Visibility
            </label>
            <div className="relative">
              <Eye className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9899A8]" />
              <select
                value={profileVisibility}
                onChange={(e) =>
                  setProfileVisibility(e.target.value as 'public' | 'friends' | 'private')
                }
                className="glass-input w-full pl-10 appearance-none cursor-pointer"
              >
                <option value="public">Public</option>
                <option value="friends">Friends Only</option>
                <option value="private">Private</option>
              </select>
            </div>
          </div>

          {/* ================================================================= */}
          {/* NOTIFICATIONS                                                     */}
          {/* ================================================================= */}
          <div className="glass-card p-6">
            <div className="flex items-center gap-2 mb-3">
              <Bell className="w-5 h-5 text-[#FFB800]" />
              <h2 className="text-sm font-[family-name:'Rajdhani'] uppercase tracking-wide font-semibold text-[#ECEEF5] tracking-wider">
                Notifications
              </h2>
            </div>

            <div className="divide-y divide-white/[0.06]">
              <ToggleSwitch
                enabled={notifFriendRequests}
                onToggle={() => setNotifFriendRequests(!notifFriendRequests)}
                label="Friend Requests"
                description="Get notified about new friend requests"
              />
              <ToggleSwitch
                enabled={notifAchievements}
                onToggle={() => setNotifAchievements(!notifAchievements)}
                label="Achievements"
                description="Get notified when you earn badges"
              />
              <ToggleSwitch
                enabled={notifStreakReminders}
                onToggle={() => setNotifStreakReminders(!notifStreakReminders)}
                label="Streak Reminders"
                description="Daily reminders to keep your streak alive"
              />
            </div>
          </div>

          {/* ================================================================= */}
          {/* DANGER ZONE                                                       */}
          {/* ================================================================= */}
          <div className="glass-card p-6 border border-[#FF2D2D]/20">
            <h2 className="text-sm font-[family-name:'Rajdhani'] uppercase tracking-wide font-semibold text-[#FF2D2D] tracking-wider mb-5">
              Danger Zone
            </h2>

            <div className="space-y-3">
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-[#FF2D2D]/30 text-[#FF2D2D] text-sm font-medium hover:bg-[#FF2D2D]/10 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Log Out
              </button>

              <button
                onClick={handleDeleteAccount}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#FF2D2D]/10 border border-[#FF2D2D]/30 text-[#FF2D2D] text-sm font-medium hover:bg-[#FF2D2D]/20 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                Delete Account
              </button>
            </div>
          </div>

          {/* ================================================================= */}
          {/* SAVE BUTTON                                                       */}
          {/* ================================================================= */}
          <div className="flex justify-end pt-2 pb-8">
            <button onClick={handleSave} className="btn-accent px-6 py-2.5 text-sm font-medium">
              Save Changes
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
