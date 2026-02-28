"use client";

import { useState } from "react";

interface Props {
  src: string | null;
  alt: string;
  company: string;
  size?: number;
  className?: string;
}

export default function JobLogoImage({ src, alt, company, size = 48, className = "" }: Props) {
  const [error, setError] = useState(false);

  const initials = company
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");

  if (!src || error) {
    return (
      <div
        className={`flex items-center justify-center bg-[#F0F4FF] text-[#4640DE] font-bold text-sm rounded ${className}`}
        style={{ width: size, height: size }}
      >
        {initials}
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      width={size}
      height={size}
      className={`object-contain ${className}`}
      onError={() => setError(true)}
    />
  );
}
