import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { content } from "@/lib/herpage-content";

export function LittleThings() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });
  const l = content.littleThings;

  return (
    <section className="relative overflow-hidden px-5 py-24 sm:py-32">
      <div ref={ref} className="mx-auto max-w-3xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2 }}
          className="text-center font-display text-4xl leading-tight font-light text-foreground sm:text-5xl"
        >
          {l.title}
        </motion.h2>

        <div className="mt-14 flex flex-col gap-4">
          {l.items.map((item, i) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, x: i % 2 ? 40 : -40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3 + i * 0.14, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className={`glass-card w-full rounded-full px-6 py-4 sm:w-[82%] ${
                i % 2 ? "sm:ml-auto sm:text-right" : ""
              }`}
              style={{ animation: `breathe ${9 + (i % 4)}s ease-in-out ${i * 0.4}s infinite alternate` }}
            >
              <p className="text-[0.9rem] leading-relaxed text-foreground/90">{item}</p>
            </motion.div>
          ))}
        </div>

        <motion.blockquote
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.4, duration: 1.6 }}
          className="mt-20 text-center"
        >
          <p className="font-display text-2xl leading-snug font-light text-azure-soft sm:text-4xl">
            {content.quote.text}
          </p>
          <footer className="mt-5 text-[0.68rem] tracking-[0.34em] uppercase text-muted-foreground">
            {content.quote.attribution}
          </footer>
        </motion.blockquote>
      </div>
    </section>
  );
}
