"use client";

import { motion } from "framer-motion";

const techItems = [
  "Python", "Pandas", "NumPy", "Scikit-Learn", "TensorFlow", "PyTorch",
  "Keras", "XGBoost", "LightGBM", "CatBoost", "Matplotlib", "Seaborn",
  "Plotly", "OpenCV", "HuggingFace", "FastAPI", "Streamlit", "Docker",
  "SQL", "MongoDB", "PostgreSQL", "Airflow", "Spark", "Kaggle",
  "Jupyter", "Git", "Linux", "AWS", "GCP", "Tableau",
];

export function TechMarquee() {
  // Double the array for seamless looping
  const doubled = [...techItems, ...techItems];

  return (
    <section className="relative overflow-hidden border-t border-b border-border py-5 bg-cream-deep/50">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-cream to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-cream to-transparent pointer-events-none" />

      <motion.div
        className="flex gap-6 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 30,
            ease: "linear",
          },
        }}
      >
        {doubled.map((tech, i) => (
          <span
            key={`${tech}-${i}`}
            className="inline-flex items-center gap-2 font-mono text-[11px] tracking-wider text-subtle/70 shrink-0"
          >
            <span className="w-1 h-1 rounded-full bg-accent/40" />
            {tech}
          </span>
        ))}
      </motion.div>
    </section>
  );
}
