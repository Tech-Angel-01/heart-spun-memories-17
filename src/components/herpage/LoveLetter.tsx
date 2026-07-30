import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { content } from "@/lib/herpage-content";

export function LoveLetter() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });
  const l = content.letterOpening;

  return (
    <section id="letter" className="relative px-5 py-28 sm:py-36">
      <div ref={ref} className="mx-auto max-w-2xl">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="text-center text-[0.68rem] tracking-[0.4em] uppercase text-azure-soft"
        >
          The letter
        </motion.p>

        <div className="relative mt-10">
          {/* envelope flap */}
          <motion.div
            initial={{ rotateX: 0 }}
            animate={inView ? { rotateX: -168 } : {}}
            transition={{ delay: 0.5, duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: "top center", transformStyle: "preserve-3d" }}
            className="pointer-events-none absolute inset-x-0 top-0 z-20 mx-auto h-24 w-full"
          >
            <div
              className="h-full w-full"
              style={{
                background: "linear-gradient(180deg, var(--midnight), var(--ink-soft))",
                clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                borderRadius: "1rem 1rem 0 0",
              }}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.96 }}
            animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ delay: 1.4, duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
            className="paper-card relative z-10 rounded-[1.4rem] px-6 py-12 sm:px-14 sm:py-16"
            style={{
              boxShadow: "var(--shadow-lift)",
              maskImage: "none",
            }}
          >
            <div
              className="pointer-events-none absolute inset-0 rounded-[1.4rem] opacity-[0.35]"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(180deg, transparent 0 31px, oklch(0.29 0.062 256 / 0.12) 31px 32px)",
              }}
            />
            <div className="relative">
              <p className="font-hand text-3xl text-midnight">{l.salutation}</p>
              {l.body.map((p, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 2 + i * 0.5, duration: 1.2 }}
                  className="mt-5 text-[0.98rem] leading-[1.85] text-ink-soft"
                >
                  {p}
                </motion.p>
              ))}
              <motion.div
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 3.8, duration: 1.2 }}
                className="mt-10"
              >
                <p className="text-sm text-ink-soft/70">{l.signOff}</p>
                <p className="mt-1 font-hand text-3xl text-midnight">{l.signature}</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
