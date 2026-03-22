'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { ZoomIn, ZoomOut, Move, Check, X, RotateCcw } from 'lucide-react';

// =============================================================================
// Image Cropper / Positioner
// Allows users to scale and reposition an uploaded image before saving.
// =============================================================================

interface ImageCropperProps {
  src: string;
  onSave: (croppedDataUrl: string) => void;
  onCancel: () => void;
  aspectRatio?: number; // width / height, e.g. 1 for avatar, 3 for banner
  shape?: 'circle' | 'rectangle';
  outputWidth?: number;
  outputHeight?: number;
}

export default function ImageCropper({
  src,
  onSave,
  onCancel,
  aspectRatio = 1,
  shape = 'circle',
  outputWidth = 400,
  outputHeight,
}: ImageCropperProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const [loaded, setLoaded] = useState(false);

  const imgRef = useRef<HTMLImageElement | null>(null);

  const finalOutputHeight = outputHeight || Math.round(outputWidth / aspectRatio);

  // Load image
  useEffect(() => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      imgRef.current = img;
      setImageSize({ width: img.naturalWidth, height: img.naturalHeight });

      // Calculate initial scale to fill the crop area
      const containerWidth = 360;
      const containerHeight = containerWidth / aspectRatio;
      const scaleX = containerWidth / img.naturalWidth;
      const scaleY = containerHeight / img.naturalHeight;
      const initialScale = Math.max(scaleX, scaleY);
      setScale(initialScale);
      setPosition({ x: 0, y: 0 });
      setLoaded(true);
    };
    img.src = src;
  }, [src, aspectRatio]);

  // ---------------------------------------------------------------------------
  // Drag handlers
  // ---------------------------------------------------------------------------

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      e.preventDefault();
      setIsDragging(true);
      setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
    },
    [position]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging) return;
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    },
    [isDragging, dragStart]
  );

  const handlePointerUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // ---------------------------------------------------------------------------
  // Scale controls
  // ---------------------------------------------------------------------------

  const handleZoomIn = () => setScale((s) => Math.min(s * 1.15, 5));
  const handleZoomOut = () => setScale((s) => Math.max(s * 0.87, 0.1));
  const handleReset = () => {
    const containerWidth = 360;
    const containerHeight = containerWidth / aspectRatio;
    if (imgRef.current) {
      const scaleX = containerWidth / imgRef.current.naturalWidth;
      const scaleY = containerHeight / imgRef.current.naturalHeight;
      setScale(Math.max(scaleX, scaleY));
    }
    setPosition({ x: 0, y: 0 });
  };

  // ---------------------------------------------------------------------------
  // Scroll wheel zoom
  // ---------------------------------------------------------------------------

  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.95 : 1.05;
    setScale((s) => Math.max(0.1, Math.min(5, s * delta)));
  }, []);

  // ---------------------------------------------------------------------------
  // Save — render cropped region to canvas
  // ---------------------------------------------------------------------------

  const handleSave = () => {
    if (!imgRef.current || !canvasRef.current) return;

    const canvas = canvasRef.current;
    canvas.width = outputWidth;
    canvas.height = finalOutputHeight;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const containerWidth = 360;
    const containerHeight = containerWidth / aspectRatio;

    // Calculate source rectangle
    const drawWidth = imageSize.width * scale;
    const drawHeight = imageSize.height * scale;

    // Image is drawn centered + offset
    const imgLeft = (containerWidth - drawWidth) / 2 + position.x;
    const imgTop = (containerHeight - drawHeight) / 2 + position.y;

    // Map crop area back to source image coords
    const srcX = (0 - imgLeft) / scale;
    const srcY = (0 - imgTop) / scale;
    const srcW = containerWidth / scale;
    const srcH = containerHeight / scale;

    ctx.drawImage(
      imgRef.current,
      srcX,
      srcY,
      srcW,
      srcH,
      0,
      0,
      outputWidth,
      finalOutputHeight
    );

    // If circle, apply circular clip
    if (shape === 'circle') {
      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = outputWidth;
      tempCanvas.height = finalOutputHeight;
      const tempCtx = tempCanvas.getContext('2d');
      if (tempCtx) {
        tempCtx.beginPath();
        tempCtx.arc(
          outputWidth / 2,
          finalOutputHeight / 2,
          Math.min(outputWidth, finalOutputHeight) / 2,
          0,
          Math.PI * 2
        );
        tempCtx.closePath();
        tempCtx.clip();
        tempCtx.drawImage(canvas, 0, 0);

        // Clear original and draw clipped
        ctx.clearRect(0, 0, outputWidth, finalOutputHeight);
        ctx.drawImage(tempCanvas, 0, 0);
      }
    }

    const dataUrl = canvas.toDataURL('image/png');
    onSave(dataUrl);
  };

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  const containerWidth = 360;
  const containerHeight = containerWidth / aspectRatio;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm px-4">
      <div className="glass-card w-full max-w-[420px] p-5 rounded-xl">
        <h3 className="text-sm font-semibold text-[#ECEEF5] mb-1 flex items-center gap-2">
          <Move className="w-4 h-4 text-[#00F0FF]" />
          Position & Scale Image
        </h3>
        <p className="text-xs text-[#9899A8] mb-4">
          Drag to reposition, scroll or use buttons to zoom
        </p>

        {/* Crop area */}
        <div
          ref={containerRef}
          className="relative mx-auto overflow-hidden cursor-grab active:cursor-grabbing border border-white/[0.08]"
          style={{
            width: containerWidth,
            height: containerHeight,
            borderRadius: shape === 'circle' ? '50%' : '12px',
          }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onWheel={handleWheel}
        >
          {/* Checkered background */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'linear-gradient(45deg, #1a1a2e 25%, transparent 25%), linear-gradient(-45deg, #1a1a2e 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #1a1a2e 75%), linear-gradient(-45deg, transparent 75%, #1a1a2e 75%)',
              backgroundSize: '16px 16px',
              backgroundPosition: '0 0, 0 8px, 8px -8px, -8px 0px',
            }}
          />

          {loaded && imgRef.current && (
            <img
              src={src}
              alt="Crop preview"
              draggable={false}
              className="absolute pointer-events-none select-none"
              style={{
                width: imageSize.width * scale,
                height: imageSize.height * scale,
                left: `calc(50% - ${(imageSize.width * scale) / 2 - position.x}px)`,
                top: `calc(50% - ${(imageSize.height * scale) / 2 - position.y}px)`,
              }}
            />
          )}
        </div>

        {/* Zoom controls */}
        <div className="flex items-center justify-center gap-3 mt-4">
          <button
            onClick={handleZoomOut}
            className="p-2 rounded-lg bg-white/[0.04] border border-white/[0.06] text-[#9899A8] hover:text-[#ECEEF5] hover:bg-white/[0.08] transition-colors"
            title="Zoom out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>

          {/* Zoom slider */}
          <input
            type="range"
            min={10}
            max={500}
            value={Math.round(scale * 100)}
            onChange={(e) => setScale(parseInt(e.target.value) / 100)}
            className="w-32 accent-[#00F0FF] h-1"
          />

          <button
            onClick={handleZoomIn}
            className="p-2 rounded-lg bg-white/[0.04] border border-white/[0.06] text-[#9899A8] hover:text-[#ECEEF5] hover:bg-white/[0.08] transition-colors"
            title="Zoom in"
          >
            <ZoomIn className="w-4 h-4" />
          </button>

          <button
            onClick={handleReset}
            className="p-2 rounded-lg bg-white/[0.04] border border-white/[0.06] text-[#9899A8] hover:text-[#ECEEF5] hover:bg-white/[0.08] transition-colors"
            title="Reset"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        <p className="text-[10px] text-center text-[rgba(200,202,216,0.3)] mt-2">
          {Math.round(scale * 100)}% zoom
        </p>

        {/* Action buttons */}
        <div className="flex items-center justify-end gap-2 mt-4">
          <button
            onClick={onCancel}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-medium text-[#9899A8] hover:text-[#ECEEF5] bg-white/[0.04] hover:bg-white/[0.08] transition-colors"
          >
            <X className="w-3.5 h-3.5" />
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="btn-accent flex items-center gap-1.5 px-4 py-2 text-xs font-medium"
          >
            <Check className="w-3.5 h-3.5" />
            Apply
          </button>
        </div>

        {/* Hidden canvas for export */}
        <canvas ref={canvasRef} className="hidden" />
      </div>
    </div>
  );
}
