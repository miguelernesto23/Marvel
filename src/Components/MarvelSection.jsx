/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React, { useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  useInView,
} from "framer-motion";

/** Mapea iconos del JSON a Bootstrap Icons */
function getIconClass(name, fallback = "people-fill") {
  const map = {
    Film: "film",
    Tv: "tv",
    BookOpen: "book",
  };
  const bi = map[name] || fallback;
  return `bi bi-${bi}`;
}

/** Contador animado que se reinicia cada vez que entra en vista */
function CountUp({ value, isInView }) {
  const hasPlus = typeof value === "string" && value.trim().endsWith("+");
  const target = parseInt(String(value).replace(/[^\d]/g, ""), 10) || 0;

  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (v) => Math.floor(v).toLocaleString());

  useEffect(() => {
    if (isInView) {
      const controls = animate(mv, target, { duration: 1.6, ease: "easeOut" });
      return () => controls.stop();
    } else {
      mv.set(0); // reinicia contador al salir de vista
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, isInView]);

  return (
    <span>
      <motion.span>{rounded}</motion.span>
      {hasPlus ? "+" : ""}
    </span>
  );
}

export default function MarvelStatsSection() {
  const stats = [
    {
      icon: "Film",
      value: "30+",
      label: "Movies",
      description: "Blockbuster films",
    },
    {
      icon: "Tv",
      value: "20+",
      label: "Series",
      description: "Disney+ originals",
    },
    {
      icon: "",
      value: "8000+",
      label: "Characters",
      description: "In Marvel Comics",
    },
    {
      icon: "BookOpen",
      value: "80+",
      label: "Years",
      description: "Of storytelling",
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 14, scale: 0.98 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 220, damping: 20 },
    },
  };

  return (
    <section className="py-24 px-4 lg:px-8 bg-primary/5">
      <div className="container mx-auto">
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.3 }}
        >
          {stats.map((stat, index) => {
            const iconClass = getIconClass(stat.icon);
            const ref = useRef(null);
            const isInView = useInView(ref, { once: false, amount: 0.5 }); // detecta cada entrada

            return (
              <motion.div
                key={index}
                ref={ref}
                variants={item}
                whileHover={{ y: -4, scale: 1.03 }}
                transition={{ type: "spring", stiffness: 280, damping: 18 }}
                className="text-center space-y-4"
              >
                <motion.div
                  className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary"
                  initial={{ scale: 0.9, rotate: -6, opacity: 0 }}
                  animate={
                    isInView
                      ? { scale: 1, rotate: 0, opacity: 1 }
                      : { scale: 0.9, opacity: 0 }
                  }
                  transition={{ type: "spring", stiffness: 250, damping: 14 }}
                >
                  <i className={`${iconClass} text-2xl`} aria-hidden="true" />
                </motion.div>

                <div className="space-y-1">
                  <div className="text-4xl md:text-5xl font-bold text-primary">
                    <CountUp value={stat.value} isInView={isInView} />
                  </div>
                  <div className="text-lg font-semibold">{stat.label}</div>
                  <div className="text-sm text-muted-foreground">
                    {stat.description}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
