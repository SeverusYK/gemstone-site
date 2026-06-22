"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "코딩이나 데이터 분석 지식이 전혀 없어도 지원 가능한가요?",
    answer: "네, 지원 가능합니다. Query-data는 사전 지식이 아예 없는 기초 수준부터 탄탄하게 가르치는 커리큘럼을 제공합니다. 파이썬 문법, 데이터 구조 등의 기초 학습부터 차근차근 시작하므로 열정과 의지만 있으시다면 비전공자도 무리 없이 따라올 수 있습니다.",
  },
  {
    question: "프로젝트 진행 방식은 어떻게 되나요?",
    answer: "방학 동안에는 주 1회 정기 세션과 기본 과제를 진행하며 핵심 분석 기술을 습득합니다. 이후 학기 중에는 수집한 크롤링 데이터 분석이나 Kaggle 챌린지 등의 수준별 팀 프로젝트를 수행하게 됩니다. 현업 멘토진의 멘토링이 수시로 지원됩니다.",
  },
  {
    question: "주 정기 모임 요일과 장소는 언제인가요?",
    answer: "정기 모임은 매주 토요일 오후(약 3시간)에 온/오프라인 하이브리드로 진행됩니다. 오프라인 장소는 서울 시내의 스터디룸 또는 대학가 인근 세미나실을 대관하여 이용하며, 사정이 있거나 비대면 참석이 필요한 크루원들을 위해 실시간 스트리밍 및 영상 녹화본이 제공됩니다.",
  },
  {
    question: "포트폴리오 작성이나 프로젝트 실전 투입이 바로 가능한가요?",
    answer: "이미 기초 역량을 갖추셨거나 빠르게 포트폴리오를 작성해야 하는 크루원분들을 위해 방학 기간에 바로 실전 포폴용 프로젝트 그룹을 매칭하여 진행할 수 있도록 맞춤형 트랙을 제공하고 있습니다.",
  },
];

function FAQItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-border/80 last:border-0 py-4">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between text-left py-2.5 font-sans font-bold text-ink hover:text-accent transition-colors duration-200"
      >
        <span className="text-sm md:text-base flex items-center gap-3">
          <HelpCircle size={16} className="text-accent shrink-0" />
          {question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          className="text-subtle shrink-0"
        >
          <ChevronDown size={18} />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="pt-2 pb-4 pl-7 text-xs md:text-sm text-subtle leading-relaxed whitespace-pre-line">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="relative py-24 md:py-32 px-5 md:px-8 border-t border-border">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Header left */}
          <div className="lg:col-span-5">
            <p className="font-mono text-xs tracking-[0.12em] text-accent mb-3">05 / FAQ</p>
            <h2 className="font-display text-3xl md:text-5xl text-ink mb-6">
              Frequently<br />Asked Questions
            </h2>
            <p className="font-sans text-sm text-subtle max-w-sm leading-relaxed">
              Query-data 크루 합류와 활동에 대한 대표적인 질문들을 확인해 보세요. 추가적인 의문점은 공식 채널 또는 가입 문의 링크를 통해 연락해 주시기 바랍니다.
            </p>
          </div>

          {/* Accordion right */}
          <div className="lg:col-span-7 card-warm p-6 md:p-8 bg-card">
            {faqs.map((faq, i) => (
              <FAQItem
                key={i}
                question={faq.question}
                answer={faq.answer}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
