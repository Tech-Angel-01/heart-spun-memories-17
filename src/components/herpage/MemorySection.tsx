import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "motion/react";
import { content, media } from "@/lib/herpage-content";

export function MemorySection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-8%", "10%"]);
  const m = content.memory;

  return (
    <section className="relative px-5 py-24 sm:py-32">
      <div ref={ref} className="mx-auto grid max-w-5xl items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <motion.figure
          initial={{ opacity: 0, clipPath: "inset(12% 12% 12% 12% round 2rem)" }}
          animate={inView ? { opacity: 1, clipPath: "inset(0% 0% 0% 0% round 2rem)" } : {}}
          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden rounded-[2rem] shadow-[var(--shadow-lift)]"
        >
          <motion.img
            style={{ y: imgY }}
            src={media.llb}
            alt={`${content.recipient} in his LLB days`}
            loading="lazy"
            className="h-[26rem] w-full scale-110 object-cover object-top sm:h-[34rem]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
          <figcaption className="absolute inset-x-0 bottom-0 p-6 font-hand text-xl text-mist">
            LLB days, and I was already proud
          </figcaption>
        </motion.figure>

        <div>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1 }}
            className="text-[0.68rem] tracking-[0.4em] uppercase text-azure-soft"
          >
            {m.title}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.25, duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="mt-4 font-display text-3xl leading-[1.2] font-light text-foreground sm:text-[2.7rem]"
          >
            {m.lead}
          </motion.h2>
          <div className="hair-rule my-8 w-40" />
          {m.body.map((p, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 18 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 + i * 0.35, duration: 1.2 }}
              className="mt-5 text-[0.95rem] leading-[1.85] text-muted-foreground"
            >
              {p}
            </motion.p>
          ))}
        </div>
      </div>
    </section>
  );
}
