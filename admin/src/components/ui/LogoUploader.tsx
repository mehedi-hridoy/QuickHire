'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

interface Props {
  initialUrl?: string | null;
  label?: string;
  hint?: string;
  onChange: (file: File) => void;
}

export default function LogoUploader({
  initialUrl,
  label = 'Logo',
  hint = 'Click to upload · PNG, JPG, SVG · max 2MB',
  onChange,
}: Props) {
  const fileRef = useRef<HTMLInputElement>(null);
  const blobRef = useRef<string | null>(null);
  const [preview, setPreview] = useState<string | null>(initialUrl ?? null);

  useEffect(() => {
    return () => {
      if (blobRef.current) URL.revokeObjectURL(blobRef.current);
    };
  }, []);

  const handle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (blobRef.current) URL.revokeObjectURL(blobRef.current);
    blobRef.current = URL.createObjectURL(file);
    setPreview(blobRef.current);
    onChange(file);
  };

  return (
    <div className="flex items-center gap-3">
      <div
        onClick={() => fileRef.current?.click()}
        className="w-16 h-16 rounded-xl border-2 border-dashed border-gray-200 flex items-center justify-center cursor-pointer bg-gray-50 hover:bg-gray-100 overflow-hidden transition-colors shrink-0"
      >
        {preview ? (
          <Image src={preview} alt="preview" width={64} height={64} className="object-cover w-full h-full" />
        ) : (
          <span className="text-[10px] text-gray-400 text-center leading-tight px-1">{label}</span>
        )}
      </div>
      <p className="text-xs text-gray-400">{hint}</p>
      <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handle} />
    </div>
  );
}
