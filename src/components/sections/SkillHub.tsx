"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Code, Database, Brain, BarChart3, Terminal, Cpu } from "lucide-react";

const skills = [
  {
    category: "DATA PREPROCESSING & EDA",
    title: "데이터 정제 및 시각화",
    icon: Database,
    description: "결측치 처리, 피처 엔지니어링, 그리고 실전 Pandas/NumPy 데이터 파이프라인 조작을 마스터합니다. 복잡한 분포를 직관적으로 나타내는 고급 EDA 기술을 익힙니다.",
    tech: ["Pandas", "NumPy", "Matplotlib", "Seaborn", "Plotly"],
    color: "var(--color-accent)",
  },
  {
    category: "MACHINE LEARNING",
    title: "머신러닝 예측 모델링",
    icon: Cpu,
    description: "회귀 분석부터 시작해 Gradient Boosting 트리 모델(XGBoost, LightGBM, CatBoost)과 앙상블 기법을 학습하여 예측 및 분류 프로젝트 성능을 극대화합니다.",
    tech: ["Scikit-Learn", "XGBoost", "LightGBM", "CatBoost", "Optuna"],
    color: "#e67e22",
  },
  {
    category: "DEEP LEARNING & AI",
    title: "딥러닝 및 생성형 AI",
    icon: Brain,
    description: "이미지 분류/세그멘테이션을 처리하는 Computer Vision 알고리즘과 KoBERT/HuggingFace 등의 NLP 파인튜닝, 대용량 자연어 모델링(LLM)을 탐구합니다.",
    tech: ["PyTorch", "TensorFlow", "HuggingFace", "YOLOv8", "Transformers"],
    color: "#2ecc71",
  },
  {
    category: "DATA ENGINEERING",
    title: "데이터 파이프라인 & 배포",
    icon: Terminal,
    description: "분석된 모델을 실제로 동작하는 API 서버로 구축하고 웹에서 인터랙티브하게 조작할 수 있는 실시간 프로토타입 대시보드와 자동화 파이프라인을 배포합니다.",
    tech: ["FastAPI", "Streamlit", "Docker", "MongoDB", "PostgreSQL"],
    color: "#3498db",
  },
];

export function SkillHub() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section className="relative py-24 md:py-32 px-5 md:px-8 border-t border-border bg-cream-deep/20 overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1400px]">
        {/* Header */}
        <div className="mb-16">
          <p className="font-mono text-xs tracking-[0.12em] text-accent mb-3">03 / TECH MATRIX</p>
          <h2 className="font-display text-3xl md:text-5xl text-ink">
            What You Will <span className="italic font-normal">Master</span>
          </h2>
          <p className="mt-4 text-subtle text-sm md:text-base max-w-lg">
            단순 이론 학습을 넘어 현업 수준의 데이터 전처리, 모델 설계 및 배포 파이프라인까지의 전 과정을 학습합니다.
          </p>
        </div>

        {/* Tab selector and card content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Tab Button Menu */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            {skills.map((skill, index) => {
              const Icon = skill.icon;
              const isActive = activeTab === index;
              return (
                <button
                  key={skill.category}
                  onClick={() => setActiveTab(index)}
                  className={`w-full text-left p-5 rounded-xl border transition-all duration-300 flex items-center gap-4 ${
                    isActive
                      ? "bg-card border-accent shadow-md translate-x-2"
                      : "bg-card/40 border-border/80 text-subtle hover:bg-card/70 hover:text-ink"
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${
                      isActive ? "bg-accent text-cream" : "bg-cream border border-border text-subtle"
                    }`}
                  >
                    <Icon size={20} />
                  </div>
                  <div>
                    <span className="font-mono text-[9px] tracking-widest text-accent block font-semibold mb-1">
                      {skill.category}
                    </span>
                    <span className="font-sans text-sm font-bold text-ink">
                      {skill.title}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Tab Content Display Card */}
          <div className="lg:col-span-7">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="card-warm p-8 md:p-10 relative overflow-hidden min-h-[380px] flex flex-col justify-between"
            >
              {/* Highlight corner */}
              <div 
                className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-transparent to-accent/5 rounded-bl-full pointer-events-none" 
                style={{ filter: "blur(20px)" }}
              />

              <div>
                <span className="font-mono text-[10px] tracking-[0.2em] text-accent block font-bold mb-4 uppercase">
                  {skills[activeTab].category}
                </span>
                <h3 className="font-display text-2xl md:text-3xl text-ink mb-6">
                  {skills[activeTab].title}
                </h3>
                <p className="font-sans text-sm md:text-base text-ink-light leading-relaxed mb-8">
                  {skills[activeTab].description}
                </p>
              </div>

              <div>
                <h4 className="font-mono text-[10px] tracking-[0.2em] text-subtle/80 mb-3 uppercase">
                  STACKS &amp; TOOLKITS
                </h4>
                <div className="flex flex-wrap gap-2.5">
                  {skills[activeTab].tech.map((t) => (
                    <span
                      key={t}
                      className="px-3.5 py-1.5 bg-cream border border-border rounded-full font-mono text-xs text-ink-light font-semibold hover:border-accent hover:text-accent transition-colors duration-200"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
