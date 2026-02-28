"use client";

export default function NewsletterForm() {
  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="flex items-stretch gap-0 mt-1"
    >
      <input
        type="email"
        placeholder="Email Address"
        className="flex-1 min-w-0 px-4 py-3 text-sm text-[#25324B] bg-white rounded-l outline-none placeholder:text-[#A8ADB7]"
      />
      <button
        type="submit"
        className="shrink-0 px-5 py-3 bg-[#4640DE] hover:bg-[#3730c4] text-white text-sm font-semibold rounded-r transition-colors"
      >
        Subscribe
      </button>
    </form>
  );
}
