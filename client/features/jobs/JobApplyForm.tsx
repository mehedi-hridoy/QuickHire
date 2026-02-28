'use client';

import { useState } from 'react';
import { toast } from '@/lib/toast';

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:5000';

const INPUT =
  'w-full border border-[#D6DDEB] rounded-lg px-4 py-3 text-sm text-[#25324B] ' +
  'placeholder:text-[#A8ADB7] focus:outline-none focus:ring-2 focus:ring-[#4640DE]/20 ' +
  'focus:border-[#4640DE] transition-all duration-150';

const INPUT_ERR = 'border-red-400 focus:ring-red-100 focus:border-red-400';

function isValidEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}
function isValidUrl(v: string) {
  try { new URL(v); return true; } catch { return false; }
}

interface Props {
  jobId: string;
  jobTitle: string;
  company: string;
}

interface FormState {
  name: string;
  email: string;
  resumeLink: string;
  coverNote: string;
}

const BLANK: FormState = { name: '', email: '', resumeLink: '', coverNote: '' };

function Field({
  label,
  required,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-semibold text-[#25324B]">
        {label}
        {required && <span className="text-red-400 ml-0.5">*</span>}
      </label>
      {children}
      {error && (
        <p className="text-xs text-red-500 flex items-center gap-1">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <circle cx="6" cy="6" r="5" stroke="#EF4444" strokeWidth="1.2"/>
            <path d="M6 4V6.5M6 8.5V8" stroke="#EF4444" strokeWidth="1.2" strokeLinecap="round"/>
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}

export default function JobApplyForm({ jobId, jobTitle, company }: Props) {
  const [form, setForm] = useState<FormState>(BLANK);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const set = (f: keyof FormState) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm(p => ({ ...p, [f]: e.target.value }));
    if (errors[f]) setErrors(p => ({ ...p, [f]: undefined }));
  };

  const validate = (): Partial<FormState> => {
    const e: Partial<FormState> = {};
    if (!form.name.trim())          e.name       = 'Full name is required';
    if (!form.email.trim())         e.email      = 'Email is required';
    else if (!isValidEmail(form.email))  e.email = 'Enter a valid email address';
    if (!form.resumeLink.trim())    e.resumeLink = 'Resume link is required';
    else if (!isValidUrl(form.resumeLink)) e.resumeLink = 'Enter a valid URL (e.g. https://...)';
    if (!form.coverNote.trim())     e.coverNote  = 'Cover note is required';
    else if (form.coverNote.trim().length < 20) e.coverNote = 'Write at least 20 characters';
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/applications`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jobId,
          name:       form.name.trim(),
          email:      form.email.trim(),
          resumeLink: form.resumeLink.trim(),
          coverNote:  form.coverNote.trim(),
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.message ?? 'Submission failed');
      setSubmitted(true);
      toast.success('Your application has been submitted! 🎉');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  /* ── Success state ── */
  if (submitted) {
    return (
      <div className="sticky top-24 bg-white rounded-xl border border-[#D6DDEB] p-8 flex flex-col items-center text-center gap-6">
        <div className="w-20 h-20 rounded-full bg-[#ECFDF5] flex items-center justify-center">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <path
              d="M9 20.5L16 27.5L31 13"
              stroke="#10B981"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div>
          <h3 className="text-xl font-bold text-[#25324B]">Application Submitted!</h3>
          <p className="text-[#515B6F] text-sm mt-2 leading-relaxed">
            Your application for{' '}
            <span className="font-semibold text-[#25324B]">{jobTitle}</span> at{' '}
            <span className="font-semibold text-[#25324B]">{company}</span> has been received.
          </p>
          <p className="text-[#7C8493] text-sm mt-1">We&apos;ll be in touch soon. Good luck! 🤞</p>
        </div>
        <button
          onClick={() => { setSubmitted(false); setForm(BLANK); setErrors({}); }}
          className="text-sm text-[#4640DE] font-semibold hover:underline underline-offset-4"
        >
          Apply for another position →
        </button>
      </div>
    );
  }

  /* ── Form ── */
  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="sticky top-24 bg-white rounded-xl border border-[#D6DDEB] p-8 flex flex-col gap-5"
    >
      <div>
        <h2 className="text-xl font-bold text-[#25324B]">Apply for this position</h2>
        <p className="text-sm text-[#515B6F] mt-1">
          Applying for{' '}
          <span className="font-semibold text-[#25324B]">{jobTitle}</span> at {company}
        </p>
      </div>

      {/* Full name */}
      <Field label="Full Name" required error={errors.name}>
        <input
          type="text"
          placeholder="Jane Smith"
          value={form.name}
          onChange={set('name')}
          className={`${INPUT} ${errors.name ? INPUT_ERR : ''}`}
        />
      </Field>

      {/* Email */}
      <Field label="Email Address" required error={errors.email}>
        <input
          type="email"
          placeholder="jane@example.com"
          value={form.email}
          onChange={set('email')}
          className={`${INPUT} ${errors.email ? INPUT_ERR : ''}`}
        />
      </Field>

      {/* Resume link */}
      <Field label="Resume / LinkedIn URL" required error={errors.resumeLink}>
        <input
          type="url"
          placeholder="https://linkedin.com/in/yourprofile"
          value={form.resumeLink}
          onChange={set('resumeLink')}
          className={`${INPUT} ${errors.resumeLink ? INPUT_ERR : ''}`}
        />
      </Field>

      {/* Cover note */}
      <Field label="Cover Note" required error={errors.coverNote}>
        <textarea
          placeholder="Tell us why you're a great fit for this role…"
          value={form.coverNote}
          onChange={set('coverNote')}
          rows={5}
          className={`${INPUT} resize-none leading-relaxed ${errors.coverNote ? INPUT_ERR : ''}`}
        />
        <p className="text-xs text-[#A8ADB7] text-right">{form.coverNote.length} chars</p>
      </Field>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="w-full py-4 bg-[#4640DE] text-white font-semibold rounded-lg hover:bg-[#3730c4] active:bg-[#2e29a8] disabled:opacity-60 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2 mt-1"
      >
        {loading ? (
          <>
            <svg className="animate-spin w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="3" />
              <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Submitting…
          </>
        ) : (
          'Submit Application'
        )}
      </button>

      <p className="text-xs text-[#A8ADB7] text-center">
        All fields are required. Your information is kept private.
      </p>
    </form>
  );
}
