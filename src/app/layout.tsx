import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { siteConfig } from "@/lib/data";
import "./globals.css";

/* ── Fonts ──────────────────────────────────────────────────────
 *  Display: Space Grotesk — geometric, technical headline font
 *  Mono:    JetBrains Mono — IDE/terminal feel for labels & code
 *  Body:    Pretendard — loaded via CDN in globals.css
 * ───────────────────────────────────────────────────────────── */
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

/* ── SEO Metadata ─────────────────────────────────────
 *  1. .env.local의 NEXT_PUBLIC_SITE_URL을 실제 도메인으로 변경하세요.
 *  2. public/og-image.png (1200×630px) 이미지를 추가하면
 *     카카오톡/SNS 공유 시 미리보기가 표시됩니다.
 *  3. Google Search Console → 소유권 확인 → HTML 태그에서 코드 복사
 *     → .env.local의 GOOGLE_SITE_VERIFICATION에 붙여넣기
 *  4. 네이버 서치어드바이저 → 사이트 등록 → HTML 태그에서 코드 복사
 *     → .env.local의 NAVER_SITE_VERIFICATION에 붙여넣기
 * ──────────────────────────────────────────────────── */
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://your-domain.com'

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [siteConfig.name, "데이터 분석", "머신러닝", "파이썬", "대학 동아리"],
  authors: [{ name: siteConfig.name }],
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: BASE_URL,
    siteName: siteConfig.name,
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
  },
  ...(process.env.GOOGLE_SITE_VERIFICATION && {
    verification: { google: process.env.GOOGLE_SITE_VERIFICATION },
  }),
  ...(process.env.NAVER_SITE_VERIFICATION && {
    other: { 'naver-site-verification': process.env.NAVER_SITE_VERIFICATION },
  }),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
