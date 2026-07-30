import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { content, media } from "@/lib/herpage-content";

const particles = Array.from({ length: 14 }, (_, i) => ({
  left: `${(i * 37) % 96}%`,
  delay: `${(i % 7) * 1.6}s`,
  dur: `${13 + (i % 5) * 3}s`,
  size: 3 + (i % 3),
  dx: `${((i % 5) - 2) * 18}px`,
}));

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="grain relative min-h-[100svh] overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0">
        <motion.img
          src={media.hero}
          alt={`A photograph of ${content.recipient}`}
          initial={{ scale: 1.25, opacity: 0, filter: "blur(18px)" }}
          animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 2.6, ease: [0.16, 1, 0.3, 1] }}
          className="h-full w-full object-cover object-top"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/60 to-ink" />
      <div className="veil absolute inset-0" />

      {particles.map((p, i) => (
        <span
          key={i}
          className="animate-drift pointer-events-none absolute bottom-24 rounded-full bg-azure-soft/70 blur-[1px]"
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
            animationDelay: p.delay,
            animationDuration: p.dur,
            ["--dx" as string]: p.dx,
          }}
        />
      ))}

      <motion.div
        style={{ opacity: fade }}
        className="relative z-10 flex min-h-[100svh] flex-col items-center justify-center px-6 pt-24 pb-28 text-center"
      >
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1.1 }}
          className="text-[0.7rem] tracking-[0.42em] uppercase text-azure-soft"
        >
          {content.heroKicker}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30, letterSpacing: "0.2em" }}
          animate={{ opacity: 1, y: 0, letterSpacing: "-0.01em" }}
          transition={{ delay: 0.9, duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
          className="gilt-text mt-3 font-display text-[4.2rem] leading-[0.95] font-light sm:text-[7rem]"
        >
          {content.recipient}
        </motion.h1>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1.6, duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="hair-rule mt-6 w-52"
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.9, duration: 1.4 }}
          className="mt-5 font-hand text-2xl text-azure-soft"
        >
          {content.tagline}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.2, duration: 1.4 }}
          className="mt-7 max-w-lg text-[0.95rem] leading-relaxed text-muted-foreground"
        >
          {content.heroIntro}
        </motion.p>

        <motion.a
          href="#letter"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.6, duration: 1.2 }}
          whileTap={{ scale: 0.96 }}
          className="glass-card mt-10 rounded-full px-8 py-3.5 text-xs tracking-[0.24em] uppercase text-foreground transition-colors duration-500 hover:bg-azure/20"
        >
          {content.cta}
        </motion.a>
      </motion.div>
    </section>
  );
}
