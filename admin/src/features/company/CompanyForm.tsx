'use client';

import { useState } from 'react';
import LogoUploader from '@/components/ui/LogoUploader';
import { SERVER_URL, INPUT_CLASS } from '@/lib/constants';
import type { CompanyProfile } from '@/types/company';

interface Props {
  initial: CompanyProfile | null;
  onSave: (data: FormData) => Promise<void>;
}

export default function CompanyForm({ initial, onSave }: Props) {
  const [form, setForm] = useState<CompanyProfile>(
    initial ?? { name: '', website: '', email: '', phone: '', location: '', about: '', logo: null }
  );
  const [logo, setLogo] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);

  const setField =
    (field: keyof CompanyProfile) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((p) => ({ ...p, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v ?? ''));
      if (logo) fd.append('logo', logo);
      await onSave(fd);
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <LogoUploader
        initialUrl={initial?.logo ? `${SERVER_URL}${initial.logo}` : null}
        label="Company Logo"
        onChange={setLogo}
      />

      <div className="grid grid-cols-2 gap-3">
        <input required placeholder="Company Name" value={form.name} onChange={setField('name')} className={INPUT_CLASS} />
        <input required placeholder="Website" value={form.website} onChange={setField('website')} className={INPUT_CLASS} />
        <input required placeholder="Email" value={form.email} onChange={setField('email')} className={INPUT_CLASS} />
        <input required placeholder="Phone" value={form.phone} onChange={setField('phone')} className={INPUT_CLASS} />
        <input required placeholder="Location" value={form.location} onChange={setField('location')} className={INPUT_CLASS} />
      </div>

      <textarea
        required
        placeholder="About the company"
        value={form.about}
        onChange={setField('about')}
        rows={4}
        className={`${INPUT_CLASS} resize-none`}
      />

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={saving}
          className="px-4 py-2 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
        >
          {saving ? 'Saving...' : 'Save'}
        </button>
      </div>
    </form>
  );
}

