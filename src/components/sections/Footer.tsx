"use client";

import { motion } from "framer-motion";
import { siteConfig, navItems, links } from "@/lib/data";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border bg-ink text-cream overflow-hidden">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(188,108,37,0.08)_0%,transparent_60%)]" />

      <div className="relative z-10 mx-auto max-w-[1400px] px-5 md:px-8">
        {/* Main footer content */}
        <div className="py-12 md:py-16 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <h3 className="font-display text-2xl text-cream mb-3">
              {siteConfig.name}
            </h3>
            <p className="font-sans text-sm text-cream/50 leading-relaxed max-w-xs">
              {siteConfig.description}
            </p>
            <p className="mt-4 font-mono text-[10px] tracking-[0.2em] text-cream/30">
              &quot;{siteConfig.tagline}&quot;
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-mono text-[10px] tracking-[0.2em] text-cream/40 mb-4">
              NAVIGATION
            </h4>
            <ul className="space-y-2.5">
              {navItems.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="font-sans text-sm text-cream/60 hover:text-accent transition-colors duration-200"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="/archive"
                  className="font-sans text-sm text-cream/60 hover:text-accent transition-colors duration-200"
                >
                  Full Archive
                </a>
              </li>
            </ul>
          </div>

          {/* Contact / CTA */}
          <div>
            <h4 className="font-mono text-[10px] tracking-[0.2em] text-cream/40 mb-4">
              JOIN US
            </h4>
            <p className="font-sans text-sm text-cream/50 leading-relaxed mb-5">
              데이터에 올바른 질문을 던질
              <br />
              새로운 동료를 기다립니다.
            </p>
            <a
              href={links.applyForm}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-cream/10 border border-cream/20 rounded-full font-sans text-xs font-semibold text-cream/80 hover:bg-accent hover:border-accent hover:text-cream transition-all duration-300"
            >
              <span>지원하기</span>
              <span>→</span>
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-cream/10 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-mono text-[10px] tracking-[0.12em] text-cream/30">
            {siteConfig.name} &copy; {year}
          </p>
          <p className="font-mono text-[10px] tracking-[0.12em] text-cream/20">
            Built with Next.js · Deployed on Vercel
          </p>
        </div>
      </div>
    </footer>
  );
}
