"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { projects } from "@/lib/data";

const stats = [
  {
    label: "누적 프로젝트",
    getValue: () => projects.length,
    suffix: "개",
    icon: "📊",
  },
  {
    label: "평균 정확도",
    getValue: () => {
      const accs = projects
        .map((p) => p.accuracy)
        .filter((a) => a && a !== "—")
        .map((a) => parseFloat(a!));
      return accs.length > 0
        ? Math.round((accs.reduce((s, v) => s + v, 0) / accs.length) * 10) / 10
        : 0;
    },
    suffix: "%",
    icon: "🎯",
  },
  {
    label: "활용 기술",
    getValue: () => {
      const techs = new Set(projects.flatMap((p) => p.tech));
      return techs.size;
    },
    suffix: "개+",
    icon: "⚙️",
  },
  {
    label: "분석 분야",
    getValue: () => {
      const fields = new Set(projects.map((p) => p.field));
      return fields.size;
    },
    suffix: "개",
    icon: "🌐",
  },
];

function AnimatedNumber({
  value,
  inView,
}: {
  value: number;
  inView: boolean;
}) {
  return (
    <motion.span
      className="font-display text-3xl md:text-5xl font-bold text-ink tabular-nums"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {inView ? value : 0}
    </motion.span>
  );
}

export function StatsBar() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <section
      ref={ref}
      className="relative py-16 md:py-20 px-5 md:px-8 overflow-hidden"
    >
      {/* Subtle animated background accent */}
      <motion.div
        className="absolute inset-0 opacity-[0.03]"
        style={{ y: bgY }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,var(--color-accent)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,var(--color-accent)_0%,transparent_50%)]" />
      </motion.div>

      <div className="relative z-10 mx-auto max-w-[1400px]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6">
          {stats.map((stat, i) => {
            const value = stat.getValue();
            return (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <span className="text-2xl mb-3 block">{stat.icon}</span>
                <div className="flex items-baseline justify-center gap-1">
                  <AnimatedNumber value={value} inView={isInView} />
                  <span className="font-mono text-xs text-accent font-semibold">
                    {stat.suffix}
                  </span>
                </div>
                <p className="mt-2 font-sans text-xs text-subtle tracking-wide">
                  {stat.label}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
