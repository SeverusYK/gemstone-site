"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { coreParameters } from "@/lib/data";

function AnimatedBar({
  value,
  maxValue,
  delay,
}: {
  value: number;
  maxValue: number;
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const percent = (value / maxValue) * 100;

  return (
    <div ref={ref} className="relative h-1.5 w-full bg-border rounded-full overflow-hidden">
      <motion.div
        className="absolute left-0 top-0 h-full bg-accent rounded-full"
        initial={{ width: 0 }}
        animate={isInView ? { width: `${percent}%` } : {}}
        transition={{ duration: 1.2, delay, ease: "easeOut" }}
      />
    </div>
  );
}

function CountUpValue({ target }: { target: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const step = Math.max(1, Math.floor(target / 40));
    const interval = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(interval);
      } else {
        setCount(start);
      }
    }, 30);
    return () => clearInterval(interval);
  }, [isInView, target]);

  return <span ref={ref}>{count}</span>;
}

export function CoreParameters() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      id="parameters"
      ref={sectionRef}
      className="relative py-24 md:py-32 px-5 md:px-8"
    >
      <div className="mx-auto max-w-[1400px]">
        {/* Section header */}
        <motion.div
          className="mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="font-mono text-xs tracking-[0.12em] text-accent mb-3">01</p>
          <h2 className="font-display text-3xl md:text-5xl text-ink">
            About Us
          </h2>
          <p className="mt-4 text-subtle text-sm md:text-base max-w-md">
            누구나 쉽게 시작할 수 있는 데이터 분석 크루
          </p>
        </motion.div>

        {/* Parameter cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {coreParameters.map((param, i) => (
            <motion.div
              key={param.id}
              className="card-warm p-6 md:p-8"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.15, duration: 0.6 }}
            >
              {/* Parameter header */}
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-[11px] tracking-[0.1em] text-subtle">
                  {param.label}
                </span>
                <span className="font-mono text-sm font-semibold text-accent">
                  {param.value}
                </span>
              </div>

              {/* Progress bar */}
              <AnimatedBar
                value={param.numericValue}
                maxValue={param.maxValue}
                delay={0.4 + i * 0.15}
              />

              {/* Count up value */}
              <div className="mt-6 mb-4">
                <motion.span
                  className="font-mono text-2xl md:text-3xl font-bold text-ink"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.3 + i * 0.15, duration: 0.3 }}
                >
                  <CountUpValue target={param.numericValue} />%
                </motion.span>
              </div>

              {/* Description */}
              <p className="text-sm text-subtle leading-relaxed">
                {param.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
