"use client";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-grid py-6 px-5 md:px-8">
      <div className="mx-auto max-w-[1400px] flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="font-mono text-[10px] tracking-[0.15em] text-grid">
          SESSION_END // GEMSTONE &copy; {year}
        </p>
        <p className="font-mono text-[10px] tracking-[0.15em] text-grid">
          BUILT WITH NEXT.JS // DEPLOYED ON VERCEL
        </p>
      </div>
    </footer>
  );
}
