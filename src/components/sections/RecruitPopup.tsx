"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Bell } from "lucide-react";

export function RecruitPopup() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // 짧은 딜레이 후 팝업 표시 (페이지 로드 후 자연스럽게)
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
            className="relative w-full max-w-md z-10 rounded-2xl overflow-hidden shadow-2xl"
            initial={{ scale: 0.88, opacity: 0, y: 24 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0, y: 16 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            {/* 상단 강조 배너 */}
            <div className="bg-accent px-6 py-4 flex items-center gap-3">
              <Bell size={18} className="text-cream shrink-0" />
              <span className="font-mono text-[11px] tracking-[0.2em] text-cream font-semibold uppercase">
                Recruitment Notice
              </span>
            </div>

            {/* 본문 */}
            <div className="bg-card px-7 py-8">
              {/* 닫기 버튼 */}
              <button
                onClick={() => setVisible(false)}
                className="absolute top-4 right-4 text-subtle hover:text-ink transition-colors"
                aria-label="팝업 닫기"
              >
                <X size={20} />
              </button>

              {/* 메인 문구 */}
              <h2 className="font-display text-2xl md:text-3xl text-ink leading-snug mb-4">
                이번 기수 모집이<br />
                <span className="text-accent italic">마감</span>되었습니다.
              </h2>

              {/* 구분선 */}
              <div className="w-12 h-0.5 bg-accent/40 mb-5 rounded-full" />

              {/* 본문 설명 */}
              <p className="font-sans text-sm md:text-base text-ink-light leading-relaxed mb-2">
                Query-data 신규 크루원 모집이 이번 기수 기준으로 마감되었습니다.
              </p>
              <p className="font-sans text-sm md:text-base text-ink-light leading-relaxed">
                다음 모집은{" "}
                <span className="font-bold text-ink">2학기 개강에 맞춰</span>{" "}
                진행될 예정입니다. 관심 있으신 분들은 사이트를 즐겨찾기해두시고 추후 공지를 확인해 주세요!
              </p>

              {/* 하단 태그 */}
              <div className="mt-6 flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200 font-mono text-[10px] tracking-wider text-amber-700 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                  2학기 추가 모집 예정
                </span>
              </div>

              {/* 확인 버튼 */}
              <button
                onClick={() => setVisible(false)}
                className="mt-6 w-full py-3 rounded-xl bg-ink text-cream font-sans text-sm font-semibold tracking-wide hover:bg-accent transition-colors duration-250"
              >
                확인했습니다
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
