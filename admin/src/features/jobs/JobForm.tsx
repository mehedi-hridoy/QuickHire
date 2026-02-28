'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { jobService } from '@/services/jobService';
import type { Job, JobType } from '@/types/job';

const TAGS = ['Marketing', 'Design', 'Business', 'Technology', 'Engineering', 'Finance'];

const initialForm = {
  title: '',
  company: '',
  location: '',
  description: '',
  type: 'Full Time' as JobType,
  tags: [] as string[],
};

interface Props {
  onSuccess: (job: Job) => void;
  onCancel: () => void;
}

export default function JobForm({ onSuccess, onCancel }: Props) {
  const [form, setForm] = useState(initialForm);
  const [logo, setLogo] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const set =
    (field: string) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((p) => ({ ...p, [field]: e.target.value }));

  const toggleTag = (tag: string) =>
    setForm((p) => ({
      ...p,
      tags: p.tags.includes(tag) ? p.tags.filter((t) => t !== tag) : [...p.tags, tag],
    }));

  const handleLogo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLogo(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, Array.isArray(v) ? JSON.stringify(v) : v));
      if (logo) fd.append('logo', logo);
      onSuccess(await jobService.create(fd));
    } finally {
      setLoading(false);
    }
  };

  const input = 'w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition';

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Logo upload */}
      <div className="flex items-center gap-3">
        <div
          onClick={() => fileRef.current?.click()}
          className="w-16 h-16 rounded-xl border-2 border-dashed border-gray-200 flex items-center justify-center cursor-pointer bg-gray-50 hover:bg-gray-100 overflow-hidden transition-colors shrink-0"
        >
          {preview ? (
            <Image src={preview} alt="logo preview" width={64} height={64} className="object-cover w-full h-full" />
          ) : (
            <span className="text-[10px] text-gray-400 text-center leading-tight px-1">Company Logo</span>
          )}
        </div>
        <p className="text-xs text-gray-400">Click to upload · PNG, JPG, SVG · max 2MB</p>
        <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleLogo} />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <input required placeholder="Job Title" value={form.title} onChange={set('title')} className={input} />
        <input required placeholder="Company Name" value={form.company} onChange={set('company')} className={input} />
        <input required placeholder="Location (e.g. Madrid, Spain)" value={form.location} onChange={set('location')} className={input} />
        <select value={form.type} onChange={set('type')} className={input}>
          <option>Full Time</option>
          <option>Part Time</option>
        </select>
      </div>

      <textarea
        required
        placeholder="Job description — what will the candidate be doing?"
        value={form.description}
        onChange={set('description')}
        rows={3}
        className={`${input} resize-none`}
      />

      <div>
        <p className="text-xs font-medium text-gray-500 mb-2">Tags</p>
        <div className="flex flex-wrap gap-2">
          {TAGS.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => toggleTag(tag)}
              className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
                form.tags.includes(tag)
                  ? 'bg-blue-500 text-white border-blue-500'
                  : 'text-gray-500 border-gray-200 hover:border-blue-300 hover:text-blue-500'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-2 border-t border-gray-100">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
        >
          {loading ? 'Posting...' : 'Post Job'}
        </button>
      </div>
    </form>
  );
}
