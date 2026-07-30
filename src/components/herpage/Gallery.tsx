import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "motion/react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { gallery } from "@/lib/herpage-content";

export function Gallery() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.08 });
  const [active, setActive] = useState<number | null>(null);
  const touchX = useRef(0);

  const next = () => setActive((i) => (i === null ? i : (i + 1) % gallery.length));
  const prev = () => setActive((i) => (i === null ? i : (i - 1 + gallery.length) % gallery.length));

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active]);

  return (
    <section className="relative px-4 py-24 sm:py-32">
      <div ref={ref} className="mx-auto max-w-5xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2 }}
          className="text-center font-display text-4xl font-light text-foreground sm:text-6xl"
        >
          The Album
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4, duration: 1.2 }}
          className="mt-4 text-center font-hand text-xl text-azure-soft"
        >
          Tap any one of these and stay a while
        </motion.p>

        <div className="mt-12 columns-2 gap-3 sm:columns-3 sm:gap-5">
          {gallery.map((item, i) => (
            <motion.button
              key={item.src}
              initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
              animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
              transition={{ delay: 0.2 + i * 0.18, duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => setActive(i)}
              className="group mb-3 block w-full break-inside-avoid overflow-hidden rounded-2xl sm:mb-5"
            >
              <div className="relative">
                {item.type === "image" ? (
                  <img
                    src={item.src}
                    alt={item.caption}
                    loading="lazy"
                    className={`w-full object-cover transition-transform duration-[1.2s] ease-[var(--ease-silk)] group-hover:scale-105 ${
                      item.span === "tall" ? "aspect-[3/4]" : "aspect-square"
                    }`}
                  />
                ) : (
                  <video
                    src={item.src}
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    onMouseEnter={(e) => void e.currentTarget.play()}
                    onMouseLeave={(e) => e.currentTarget.pause()}
                    className={`w-full object-cover ${item.span === "tall" ? "aspect-[3/4]" : "aspect-square"}`}
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-transparent to-transparent opacity-80" />
                <p className="absolute inset-x-0 bottom-0 p-3 text-left text-[0.7rem] leading-snug text-mist/90">
                  {item.caption}
                </p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] grid place-items-center bg-ink/95 px-3 py-16 backdrop-blur-xl"
            onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
            onTouchEnd={(e) => {
              const d = e.changedTouches[0].clientX - touchX.current;
              if (d < -50) next();
              if (d > 50) prev();
            }}
          >
            <button
              onClick={() => setActive(null)}
              aria-label="Close"
              className="glass-card absolute top-5 right-5 grid h-11 w-11 place-items-center rounded-full text-foreground"
            >
              <X className="h-5 w-5" />
            </button>

            <motion.div
              key={active}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-3xl"
            >
              {gallery[active].type === "image" ? (
                <img
                  src={gallery[active].src}
                  alt={gallery[active].caption}
                  className="max-h-[72svh] w-full rounded-2xl object-contain"
                />
              ) : (
                <video
                  src={gallery[active].src}
                  controls
                  autoPlay
                  playsInline
                  className="max-h-[72svh] w-full rounded-2xl"
                />
              )}
              <p className="mt-5 text-center font-hand text-xl text-azure-soft">
                {gallery[active].caption}
              </p>
            </motion.div>

            <button
              onClick={prev}
              aria-label="Previous"
              className="glass-card absolute left-3 grid h-11 w-11 place-items-center rounded-full text-foreground"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={next}
              aria-label="Next"
              className="glass-card absolute right-3 grid h-11 w-11 place-items-center rounded-full text-foreground"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
