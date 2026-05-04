import Link from 'next/link';

export function Logo({ className = '' }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="JMVC — Inicio"
      className={`group inline-flex items-center gap-2 ${className}`}
    >
      <span className="relative inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500 via-brand-600 to-accent-500 shadow-lg shadow-brand-700/30 ring-1 ring-white/15">
        <span aria-hidden className="text-[13px] font-bold tracking-tight text-white">
          J
        </span>
        <span
          aria-hidden
          className="absolute inset-0 rounded-lg bg-white/0 transition group-hover:bg-white/10"
        />
      </span>
      <span className="text-lg font-semibold tracking-tight text-white">JMVC</span>
    </Link>
  );
}
