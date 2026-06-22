"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { curriculumSteps } from "@/lib/data";

const codeLines = [
  { text: "# ✳️ 활동 구성", type: "comment" as const },
  { text: "activity_structure = {", type: "keyword" as const },
  { text: '    "1) 방학 집중 학습": {', type: "keyword" as const },
  { text: '        "모임": "주 1회 정기 모임",', type: "string" as const },
  { text: '        "학습": "Python, Pandas 데이터 조작/시각화",', type: "string" as const },
  { text: '        "특징": "실무 중심 이론 학습",', type: "string" as const },
  { text: '        "비고": "포폴용 프로젝트 즉시 진행 가능"', type: "string" as const },
  { text: "    },", type: "keyword" as const },
  { text: '    "2) 학기 중 프로젝트": {', type: "keyword" as const },
  { text: '        "모임": "격주 1회 정기 모임 (유동적)",', type: "string" as const },
  { text: '        "실습": "Kaggle 머신러닝 예제",', type: "string" as const },
  { text: '        "분석": "크롤링 데이터셋 확보 & EDA",', type: "string" as const },
  { text: '        "지원": "수준별 학습 및 멘토링"', type: "string" as const },
  { text: "    }", type: "keyword" as const },
  { text: "}", type: "keyword" as const },
];

export function Initialization() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      id="init"
      ref={sectionRef}
      className="relative py-24 md:py-32 px-5 md:px-8 border-t border-border"
    >
      <div className="mx-auto max-w-[1400px]">
        {/* Section header */}
        <motion.div
          className="mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="font-mono text-xs tracking-[0.12em] text-accent mb-3">03</p>
          <h2 className="font-display text-3xl md:text-5xl text-ink">
            Curriculum
          </h2>
          <p className="mt-4 text-subtle text-sm md:text-base max-w-md">
            모집 안내 및 커리큘럼 — 파이썬 코드 형식
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {/* Code block */}
          <motion.div
            className="rounded-2xl overflow-hidden shadow-lg"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            {/* Code header bar */}
            <div className="flex items-center gap-2 px-4 py-3 bg-[#1E1A17] border-b border-[#3a3530]">
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
              </div>
              <span className="font-mono text-[10px] tracking-wider text-[#7a7570] ml-2">
                curriculum.py
              </span>
            </div>

            {/* Code content */}
            <div className="p-5 md:p-6 overflow-x-auto whitespace-nowrap bg-code-bg">
              {codeLines.map((line, i) => (
                <motion.div
                  key={i}
                  className="flex"
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.08, duration: 0.4 }}
                >
                  <span className="font-mono text-xs text-[#5a5550] w-8 shrink-0 select-none text-right mr-4">
                    {i + 1}
                  </span>
                  <span
                    className={`font-mono text-xs md:text-sm leading-relaxed ${
                      line.type === "comment"
                        ? "text-[#7a7570]"
                        : line.type === "keyword"
                        ? "text-code-amber"
                        : line.type === "string"
                        ? "text-code-green"
                        : "text-[#e8e0d0]"
                    }`}
                  >
                    {line.text}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Curriculum steps */}
          <div className="flex flex-col gap-4">
            {curriculumSteps.map((item, i) => (
              <motion.div
                key={item.step}
                className="card-warm p-5 md:p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.12, duration: 0.5 }}
              >
                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center w-10 h-10 shrink-0 rounded-lg bg-accent/10 border border-accent/20">
                    <span className="font-mono text-sm font-bold text-accent">
                      {String(item.step).padStart(2, "0")}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-sans text-base font-bold text-ink mb-1">
                      {item.title}
                    </h4>
                    <p className="text-sm text-subtle leading-relaxed whitespace-pre-wrap">
                      {item.description}
                    </p>
                  </div>
                </div>

                {i < curriculumSteps.length - 1 && (
                  <div className="ml-5 mt-4 w-px h-4 bg-border" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
