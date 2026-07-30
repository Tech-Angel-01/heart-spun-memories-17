import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { content, media } from "@/lib/herpage-content";

export function WelcomeGate({ onOpen }: { onOpen: () => void }) {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[80] grid place-items-center overflow-hidden px-6"
          exit={{ opacity: 0, filter: "blur(14px)" }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.img
            src={media.portrait}
            alt=""
            aria-hidden
            className="absolute inset-0 h-full w-full object-cover"
            initial={{ scale: 1.18, opacity: 0 }}
            animate={{ scale: 1.04, opacity: 1 }}
            transition={{ duration: 3, ease: "easeOut" }}
            style={{ filter: "blur(22px) saturate(0.8)" }}
          />
          <div className="absolute inset-0 bg-ink/80" />
          <div className="veil absolute inset-0" />

          <div className="relative z-10 max-w-md text-center">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="mx-auto mb-8 h-px w-16 bg-azure-soft/60"
            />
            <motion.h1
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-[2.1rem] leading-[1.15] tracking-tight text-foreground sm:text-5xl"
            >
              {content.welcome.title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4, duration: 1.2 }}
              className="mt-5 font-hand text-xl text-azure-soft"
            >
              {content.welcome.sub}
            </motion.p>

            <motion.button
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2, duration: 1 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => {
                setOpen(false);
                onOpen();
              }}
              className="glass-card mt-10 rounded-full px-9 py-4 text-sm tracking-[0.22em] uppercase text-foreground transition-colors duration-500 hover:bg-azure/20"
            >
              {content.welcome.button}
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
