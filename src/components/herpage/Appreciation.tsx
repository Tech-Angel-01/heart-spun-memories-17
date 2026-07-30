import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { content } from "@/lib/herpage-content";

export function Appreciation() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });
  const a = content.appreciation;

  return (
    <section className="relative px-5 py-24 sm:py-32">
      <div className="veil pointer-events-none absolute inset-0 opacity-60" />
      <div ref={ref} className="relative mx-auto max-w-4xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2 }}
          className="text-center font-display text-4xl leading-tight font-light text-foreground sm:text-6xl"
        >
          {a.title}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4, duration: 1.2 }}
          className="mx-auto mt-5 max-w-md text-center text-sm leading-relaxed text-muted-foreground"
        >
          {a.intro}
        </motion.p>

        <div className="mt-14 space-y-5 sm:columns-2 sm:gap-5 sm:space-y-5">
          {a.cards.map((c, i) => (
            <motion.article
              key={c.title}
              initial={{ opacity: 0, y: 34, rotate: i % 2 ? 1.4 : -1.4 }}
              animate={inView ? { opacity: 1, y: 0, rotate: i % 2 ? 0.6 : -0.6 } : {}}
              transition={{ delay: 0.5 + i * 0.16, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              className="glass-card grain break-inside-avoid rounded-2xl px-6 py-7 sm:mb-5"
            >
              <span className="font-display text-sm text-azure-soft/70">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-2 font-display text-2xl leading-snug text-foreground">{c.title}</h3>
              <p className="mt-3 text-[0.9rem] leading-relaxed text-muted-foreground">{c.body}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
