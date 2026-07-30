import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { content } from "@/lib/herpage-content";

export function FinalLetter() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const f = content.finalLetter;

  return (
    <section className="relative px-6 py-32 sm:py-44">
      <div className="veil pointer-events-none absolute inset-0 rotate-180 opacity-50" />
      <div ref={ref} className="relative mx-auto max-w-xl text-center">
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1.4 }}
          className="text-[0.68rem] tracking-[0.4em] uppercase text-azure-soft"
        >
          {f.title}
        </motion.p>

        {f.body.map((p, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ delay: 0.8 + i * 1.1, duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
            className={
              i === 0
                ? "mt-10 font-display text-2xl leading-snug font-light text-foreground sm:text-3xl"
                : "mt-7 text-[0.98rem] leading-[2] text-muted-foreground"
            }
          >
            {p}
          </motion.p>
        ))}

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 4, duration: 2 }}
          className="mt-14"
        >
          <div className="hair-rule mx-auto w-32" />
          <p className="mt-8 text-sm text-muted-foreground">{f.signOff}</p>
          <p className="mt-2 font-hand text-4xl text-azure-soft">{f.signature}</p>
        </motion.div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="relative px-6 pt-10 pb-40 text-center">
      <div className="hair-rule mx-auto mb-10 w-24" />
      <p className="font-display text-xl text-foreground">{content.footer.line}</p>
      <p className="mt-2 font-hand text-lg text-azure-soft">{content.footer.tagline}</p>
    </footer>
  );
}
