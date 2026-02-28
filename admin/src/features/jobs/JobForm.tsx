'use client';

import { useState } from 'react';
import LogoUploader from '@/components/ui/LogoUploader';
import { jobService } from '@/services/jobService';
import { JOB_TAGS, JOB_CATEGORIES, JOB_TYPES, INPUT_CLASS, SERVER_URL } from '@/lib/constants';
import type { Job, JobType } from '@/types/job';

const blankForm = {
  title: '',
  company: '',
  location: '',
  category: '',
  description: '',
  type: 'Full Time' as JobType,
  tags: [] as string[],
};

interface Props {
  initialData?: Job;          // present → edit mode
  onSuccess: (job: Job) => void;
  onCancel: () => void;
}

function TagSelector({ value, onChange }: { value: string[]; onChange: (next: string[]) => void }) {
  const toggle = (tag: string) =>
    onChange(value.includes(tag) ? value.filter((t) => t !== tag) : [...value, tag]);

  return (
    <div>
      <p className="text-xs font-medium text-gray-500 mb-2">Tags</p>
      <div className="flex flex-wrap gap-2">
        {JOB_TAGS.map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => toggle(tag)}
            className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
              value.includes(tag)
                ? 'bg-blue-500 text-white border-blue-500'
                : 'text-gray-500 border-gray-200 hover:border-blue-300 hover:text-blue-500'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function JobForm({ initialData, onSuccess, onCancel }: Props) {
  const isEdit = !!initialData;

  const [form, setForm] = useState(
    initialData
      ? {
          title: initialData.title,
          company: initialData.company,
          location: initialData.location,
          category: initialData.category,
          description: initialData.description,
          type: initialData.type,
          tags: initialData.tags ?? [],
        }
      : blankForm,
  );
  const [logo, setLogo] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const setField =
    (field: keyof typeof blankForm) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((p) => ({ ...p, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) =>
        fd.append(k, Array.isArray(v) ? JSON.stringify(v) : v),
      );
      if (logo) fd.append('logo', logo);

      const result = isEdit
        ? await jobService.update(initialData!._id, fd)
        : await jobService.create(fd);
      onSuccess(result);
    } finally {
      setLoading(false);
    }
  };

  const existingLogoUrl =
    initialData?.logo ? `${SERVER_URL}${initialData.logo}` : null;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <LogoUploader label="Company Logo" initialUrl={existingLogoUrl} onChange={setLogo} />

      <div className="grid grid-cols-2 gap-3">
        <input required placeholder="Job Title" value={form.title} onChange={setField('title')} className={INPUT_CLASS} />
        <input required placeholder="Company Name" value={form.company} onChange={setField('company')} className={INPUT_CLASS} />
        <input
          required
          placeholder="Location (e.g. Madrid, Spain)"
          value={form.location}
          onChange={setField('location')}
          className={INPUT_CLASS}
        />
        <select required value={form.type} onChange={setField('type')} className={INPUT_CLASS}>
          {JOB_TYPES.map((t) => <option key={t}>{t}</option>)}
        </select>
        <select required value={form.category} onChange={setField('category')} className={INPUT_CLASS}>
          <option value="" disabled>Category</option>
          {JOB_CATEGORIES.map((c) => <option key={c}>{c}</option>)}
        </select>
      </div>

      <textarea
        required
        placeholder="Job description"
        value={form.description}
        onChange={setField('description')}
        rows={3}
        className={`${INPUT_CLASS} resize-none`}
      />

      <TagSelector value={form.tags} onChange={(tags) => setForm((p) => ({ ...p, tags }))} />

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
          {loading ? (isEdit ? 'Saving...' : 'Posting...') : (isEdit ? 'Save Changes' : 'Post Job')}
        </button>
      </div>
    </form>
  );
}
