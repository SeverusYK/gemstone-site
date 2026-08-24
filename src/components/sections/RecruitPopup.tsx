"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Bell } from "lucide-react";

export function RecruitPopup() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* 백드롭 */}
          <motion.div
            className="absolute inset-0 bg-ink/60 backdrop-blur-sm"
            onClick={() => setVisible(false)}
          />

          {/* 팝업 카드 */}
          <motion.div
            className="relative w-full max-w-lg z-10 rounded-2xl overflow-hidden shadow-2xl"
            initial={{ scale: 0.88, opacity: 0, y: 24 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0, y: 16 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            {/* 상단 강조 배너 */}
            <div className="bg-accent px-6 py-4 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <Bell size={18} className="text-cream shrink-0" />
                <span className="font-mono text-[11px] tracking-[0.2em] text-cream font-semibold uppercase">
                  ✴️ 추가 모집 안내
                </span>
              </div>
              <button
                onClick={() => setVisible(false)}
                className="text-cream/70 hover:text-cream transition-colors"
                aria-label="팝업 닫기"
              >
                <X size={18} />
              </button>
            </div>

            {/* 본문 */}
            <div className="bg-card px-7 py-8">
              {/* 메인 문구 */}
              <h2 className="font-display text-2xl md:text-3xl text-ink leading-snug mb-1">
                2학기 개강 맞이
              </h2>
              <h2 className="font-display text-2xl md:text-3xl text-ink leading-snug mb-5">
                <span className="text-accent italic">추가 모집</span>을 시작합니다!
              </h2>

              {/* 구분선 */}
              <div className="w-12 h-0.5 bg-accent/40 mb-6 rounded-full" />

              {/* 모집 상세 정보 */}
              <ul className="space-y-3 mb-7">
                {[
                  {
                    label: "추가모집 기간",
                    value: "2026.8.26(수) ~ 9.6(일)",
                  },
                  {
                    label: "합격자 발표",
                    value: "9.7(월) — 합격자에 한해 운영진이 개별 연락 예정",
                  },
                  {
                    label: "모집 대상",
                    value: "수도권 소재 대학교 재학생 및 취업 준비생",
                  },
                  {
                    label: "지원 방법",
                    value: "지원 폼 작성 후 제출",
                  },
                  {
                    label: "추가 모집 인원",
                    value: "약 8명",
                  },
                ].map((item) => (
                  <li key={item.label} className="flex gap-3 items-start">
                    <span className="mt-0.5 text-accent font-bold text-sm shrink-0">✔️</span>
                    <div>
                      <span className="font-mono text-[10px] tracking-wider text-accent font-semibold block mb-0.5 uppercase">
                        {item.label}
                      </span>
                      <span className="font-sans text-sm text-ink-light leading-snug">
                        {item.value}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>

              {/* 지원 링크 버튼 */}
              <a
                href="https://tally.so/r/D46BRq"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full py-3.5 rounded-xl bg-accent text-cream font-sans text-sm font-bold tracking-wide text-center hover:bg-accent-hover transition-colors duration-200 mb-3"
              >
                🚀 지원 폼 바로가기
              </a>

              <button
                onClick={() => setVisible(false)}
                className="block w-full py-3 rounded-xl bg-ink/8 text-subtle font-sans text-xs tracking-wide text-center hover:bg-ink/12 transition-colors duration-200"
              >
                나중에 보기
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
