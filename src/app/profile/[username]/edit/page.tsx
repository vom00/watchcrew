'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useUserStore } from '@/lib/stores';
import {
  ArrowLeft,
  Save,
  User,
  Camera,
  Upload,
  Palette,
  Type,
  Trash2,
  ImageIcon,
} from 'lucide-react';
import Avatar from '@/components/ui/Avatar';
import ImageCropper from '@/components/ui/ImageCropper';

// =============================================================================
// Accent Color Swatches (no duplicates, expanded palette)
// =============================================================================

const COLOR_SWATCHES = [
  '#FF3366', // Hot Pink
  '#00F0FF', // Cyan
  '#8B5CF6', // Purple
  '#FFB800', // Gold
  '#39FF14', // Neon Green
  '#FF006E', // Magenta
  '#4361EE', // Royal Blue
  '#FF6B35', // Tangerine
  '#06D6A0', // Emerald
  '#E040FB', // Orchid
  '#00B4D8', // Ocean Blue
  '#F72585', // Fuchsia
];

// =============================================================================
// Profile Edit Page
// =============================================================================

export default function ProfileEditPage() {
  const router = useRouter();
  const params = useParams();
  const user = useUserStore((s) => s.user);
  const isLoggedIn = useUserStore((s) => s.isLoggedIn);
  const hydrated = useUserStore((s) => s.hydrated);
  const updateProfile = useUserStore((s) => s.updateProfile);
  const loadUser = useUserStore((s) => s.loadFromStorage);

  // ---------------------------------------------------------------------------
  // Local state
  // ---------------------------------------------------------------------------

  const [displayName, setDisplayName] = useState('');
  const [bio, setBio] = useState('');
  const [customStatus, setCustomStatus] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [bannerUrl, setBannerUrl] = useState('');
  const [accentColor, setAccentColor] = useState('#FF3366');

  // Image cropper state
  const [cropperImage, setCropperImage] = useState<string | null>(null);
  const [cropperTarget, setCropperTarget] = useState<'avatar' | 'banner'>('avatar');

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
  // Populate form from user
  // ---------------------------------------------------------------------------

  useEffect(() => {
    if (user) {
      setDisplayName(user.displayName || '');
      setBio(user.bio || '');
      setCustomStatus(user.customStatus || '');
      setAvatarUrl(user.avatarUrl || '');
      setBannerUrl(user.bannerUrl || '');
      setAccentColor(user.accentColor || '#FF3366');
    }
  }, [user]);

  // ---------------------------------------------------------------------------
  // Handlers
  // ---------------------------------------------------------------------------

  const handleSave = () => {
    updateProfile({
      displayName,
      bio,
      customStatus,
      avatarUrl,
      bannerUrl,
      accentColor,
    });
    router.push(`/profile/${params.username}`);
  };

  const handleCancel = () => {
    router.push(`/profile/${params.username}`);
  };

  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    target: 'avatar' | 'banner',
    maxSizeMB = 2
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > maxSizeMB * 1024 * 1024) {
      alert(`Image must be under ${maxSizeMB}MB`);
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => {
      const dataUrl = ev.target?.result as string;
      if (dataUrl) {
        setCropperImage(dataUrl);
        setCropperTarget(target);
      }
    };
    reader.readAsDataURL(file);
    // Reset the input so same file can be re-selected
    e.target.value = '';
  };

  const handleCropSave = (croppedDataUrl: string) => {
    if (cropperTarget === 'avatar') {
      setAvatarUrl(croppedDataUrl);
    } else {
      setBannerUrl(croppedDataUrl);
    }
    setCropperImage(null);
  };

  const handleCropCancel = () => {
    setCropperImage(null);
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

        {/* Back button */}
        <button
          onClick={handleCancel}
          className="flex items-center gap-2 text-sm text-[#9899A8] hover:text-[#ECEEF5] transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Profile
        </button>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-[family-name:'Rajdhani'] uppercase tracking-wide font-bold text-[#ECEEF5]">
            Edit Profile
          </h1>
          <p className="text-[#9899A8] text-sm mt-1">
            Customize how others see you
          </p>
        </div>

        <div className="space-y-6">

          {/* ================================================================= */}
          {/* BANNER IMAGE                                                      */}
          {/* ================================================================= */}
          <div className="glass-card p-6">
            <div className="flex items-center gap-2 mb-5">
              <ImageIcon className="w-5 h-5 text-[#8B5CF6]" />
              <h2 className="text-sm font-[family-name:'Rajdhani'] uppercase tracking-wide font-semibold text-[#ECEEF5] tracking-wider">
                Profile Banner
              </h2>
            </div>

            {/* Banner preview */}
            <div className="relative w-full h-32 sm:h-40 rounded-lg overflow-hidden mb-4 border border-white/[0.06]">
              {bannerUrl ? (
                <img
                  src={bannerUrl}
                  alt="Banner preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div
                  className="w-full h-full"
                  style={{
                    background: `linear-gradient(180deg, ${accentColor}40 0%, ${accentColor}10 60%, transparent 100%)`,
                  }}
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>

            <p className="text-xs text-[#9899A8] mb-3">
              Upload a banner image. You can reposition and scale after uploading. JPG, PNG, or WebP up to 4MB.
            </p>
            <div className="flex items-center gap-2">
              <label className="btn-accent px-4 py-2 text-xs font-medium cursor-pointer flex items-center gap-1.5">
                <Upload className="w-3.5 h-3.5" />
                Upload Banner
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  className="hidden"
                  onChange={(e) => handleImageUpload(e, 'banner', 4)}
                />
              </label>
              {bannerUrl && (
                <button
                  type="button"
                  onClick={() => setBannerUrl('')}
                  className="glass-button px-4 py-2 text-xs font-medium text-[#B0B1C0] hover:text-[#FF2D2D] flex items-center gap-1.5"
                >
                  <Trash2 className="w-3 h-3" />
                  Remove
                </button>
              )}
            </div>
          </div>

          {/* ================================================================= */}
          {/* FORM FIELDS                                                       */}
          {/* ================================================================= */}
          <div className="glass-card p-6">
            <div className="flex items-center gap-2 mb-5">
              <User className="w-5 h-5 text-[#00F0FF]" />
              <h2 className="text-sm font-[family-name:'Rajdhani'] uppercase tracking-wide font-semibold text-[#ECEEF5] tracking-wider">
                Profile Details
              </h2>
            </div>

            <div className="space-y-5">

              {/* Display Name */}
              <div>
                <label className="flex items-center gap-1.5 text-xs font-medium text-[#9899A8] mb-1.5 uppercase tracking-wider">
                  <Type className="w-3.5 h-3.5" />
                  Display Name
                </label>
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="Your display name"
                  className="glass-input w-full"
                  maxLength={30}
                />
              </div>

              {/* Bio */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-medium text-[#9899A8] uppercase tracking-wider">
                    Bio
                  </label>
                  <span
                    className={`text-xs ${
                      bio.length > 260 ? 'text-[#FF3366]' : 'text-[#9899A8]'
                    }`}
                  >
                    {bio.length} / 280
                  </span>
                </div>
                <textarea
                  value={bio}
                  onChange={(e) => {
                    if (e.target.value.length <= 280) setBio(e.target.value);
                  }}
                  placeholder="Tell others about yourself..."
                  rows={3}
                  className="glass-input w-full resize-none"
                />
              </div>

              {/* Custom Status */}
              <div>
                <label className="text-xs font-medium text-[#9899A8] mb-1.5 uppercase tracking-wider block">
                  Custom Status
                </label>
                <input
                  type="text"
                  value={customStatus}
                  onChange={(e) => setCustomStatus(e.target.value)}
                  placeholder="What are you watching?"
                  className="glass-input w-full"
                  maxLength={60}
                />
              </div>

              {/* Profile Picture */}
              <div>
                <label className="flex items-center gap-1.5 text-xs font-medium text-[#9899A8] mb-3 uppercase tracking-wider">
                  <Camera className="w-3.5 h-3.5" />
                  Profile Picture
                </label>
                <div className="flex items-center gap-5">
                  <Avatar
                    src={avatarUrl}
                    username={displayName || user.username}
                    size="xl"
                    accentColor={accentColor}
                  />
                  <div className="flex-1">
                    <p className="text-xs text-[#9899A8] mb-3">
                      Upload an image. You can reposition and scale after uploading. JPG, PNG, or GIF up to 2MB.
                    </p>
                    <div className="flex items-center gap-2">
                      <label className="btn-accent px-4 py-2 text-xs font-medium cursor-pointer flex items-center gap-1.5">
                        <Upload className="w-3.5 h-3.5" />
                        Upload Image
                        <input
                          type="file"
                          accept="image/jpeg,image/png,image/gif,image/webp"
                          className="hidden"
                          onChange={(e) => handleImageUpload(e, 'avatar')}
                        />
                      </label>
                      {avatarUrl && !avatarUrl.startsWith('https://api.dicebear.com') && (
                        <button
                          type="button"
                          onClick={() => setAvatarUrl('')}
                          className="glass-button px-4 py-2 text-xs font-medium text-[#B0B1C0] hover:text-[#FF2D2D] flex items-center gap-1.5"
                        >
                          <Trash2 className="w-3 h-3" />
                          Remove
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ================================================================= */}
          {/* ACCENT COLOR                                                      */}
          {/* ================================================================= */}
          <div className="glass-card p-6">
            <div className="flex items-center gap-2 mb-4">
              <Palette className="w-5 h-5 text-[#FF3366]" />
              <h2 className="text-sm font-[family-name:'Rajdhani'] uppercase tracking-wide font-semibold text-[#ECEEF5] tracking-wider">
                Accent Color
              </h2>
            </div>

            <div className="flex flex-wrap gap-3">
              {COLOR_SWATCHES.map((color, i) => (
                <button
                  key={`${color}-${i}`}
                  onClick={() => setAccentColor(color)}
                  className="relative"
                >
                  <div
                    className={`w-11 h-11 rounded-full transition-all duration-200 ${
                      accentColor === color
                        ? 'ring-2 ring-white ring-offset-2 ring-offset-[#0C0C14] scale-110'
                        : 'hover:scale-105'
                    }`}
                    style={{
                      backgroundColor: color,
                      boxShadow:
                        accentColor === color ? `0 0 20px ${color}55` : 'none',
                    }}
                  />
                </button>
              ))}
            </div>

            {/* Custom color picker */}
            <div className="mt-4 flex items-center gap-3">
              <label className="text-xs text-[#9899A8] uppercase tracking-wider">Custom:</label>
              <input
                type="color"
                value={accentColor}
                onChange={(e) => setAccentColor(e.target.value)}
                className="w-8 h-8 rounded-full cursor-pointer bg-transparent border border-white/[0.1]"
              />
              <span className="text-xs text-[#9899A8] font-mono">{accentColor}</span>
            </div>
          </div>

          {/* ================================================================= */}
          {/* ACTION BUTTONS                                                    */}
          {/* ================================================================= */}
          <div className="flex items-center justify-end gap-3 pt-2 pb-8">
            <button
              onClick={handleCancel}
              className="glass-button px-5 py-2.5 rounded-lg text-sm font-medium text-[#9899A8] hover:text-[#ECEEF5] transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="btn-accent flex items-center gap-2 px-6 py-2.5 text-sm font-medium"
            >
              <Save className="w-4 h-4" />
              Save Changes
            </button>
          </div>

        </div>
      </div>

      {/* ===================================================================== */}
      {/* IMAGE CROPPER MODAL                                                   */}
      {/* ===================================================================== */}
      {cropperImage && (
        <ImageCropper
          src={cropperImage}
          onSave={handleCropSave}
          onCancel={handleCropCancel}
          aspectRatio={cropperTarget === 'avatar' ? 1 : 3}
          shape={cropperTarget === 'avatar' ? 'circle' : 'rectangle'}
          outputWidth={cropperTarget === 'avatar' ? 400 : 1200}
          outputHeight={cropperTarget === 'avatar' ? 400 : 400}
        />
      )}
    </div>
  );
}
