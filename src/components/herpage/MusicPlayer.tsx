import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Play, Pause, Volume2, VolumeX, ChevronDown, Music2 } from "lucide-react";
import { media } from "@/lib/herpage-content";

function fmt(t: number) {
  if (!isFinite(t)) return "0:00";
  const m = Math.floor(t / 60);
  const s = Math.floor(t % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function MusicPlayer({ started }: { started: boolean }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [needsNudge, setNeedsNudge] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [time, setTime] = useState(0);
  const [dur, setDur] = useState(0);
  const [vol, setVol] = useState(0.7);
  const [muted, setMuted] = useState(false);

  const toggle = useCallback(() => {
    const a = audioRef.current;
    if (!a) return;
    if (a.paused) {
      a.play()
        .then(() => {
          setPlaying(true);
          setNeedsNudge(false);
        })
        .catch(() => setNeedsNudge(true));
    } else {
      a.pause();
      setPlaying(false);
    }
  }, []);

  useEffect(() => {
    if (!started) return;
    const a = audioRef.current;
    if (!a) return;
    a.volume = vol;
    a.play()
      .then(() => setPlaying(true))
      .catch(() => setNeedsNudge(true));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [started]);

  useEffect(() => {
    const a = audioRef.current;
    if (a) a.volume = muted ? 0 : vol;
  }, [vol, muted]);

  if (!started) return <audio ref={audioRef} src={media.song} loop preload="auto" />;

  return (
    <>
      <audio
        ref={audioRef}
        src={media.song}
        loop
        preload="auto"
        onTimeUpdate={(e) => setTime(e.currentTarget.currentTime)}
        onDurationChange={(e) => setDur(e.currentTarget.duration)}
        onCanPlay={(e) => setDur(e.currentTarget.duration)}
        onLoadedMetadata={(e) => setDur(e.currentTarget.duration)}
      />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="fixed bottom-4 left-1/2 z-[60] w-[min(92vw,26rem)] -translate-x-1/2"
      >
        <div className="glass-card grain overflow-hidden rounded-3xl px-4 py-3">
          <AnimatePresence initial={false} mode="wait">
            {collapsed ? (
              <motion.button
                key="mini"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setCollapsed(false)}
                className="flex w-full items-center justify-between gap-3"
              >
                <span className="flex items-center gap-2 text-xs tracking-[0.18em] uppercase text-muted-foreground">
                  <Music2 className="h-4 w-4 shrink-0 text-azure-soft" />
                  Me And My Brother
                </span>
                <span className="text-xs text-azure-soft">Open</span>
              </motion.button>
            ) : (
              <motion.div
                key="full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
                  <div className="min-w-0">
                    <p className="truncate font-display text-lg leading-tight text-foreground">
                      Me And My Brother
                    </p>
                    <p className="truncate text-[0.7rem] tracking-[0.18em] uppercase text-muted-foreground">
                      5ive
                    </p>
                  </div>
                  <button
                    onClick={() => setCollapsed(true)}
                    aria-label="Collapse player"
                    className="shrink-0 rounded-full p-2 text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <ChevronDown className="h-4 w-4" />
                  </button>
                </div>

                <div className="mt-3 flex items-center gap-3">
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={toggle}
                    aria-label={playing ? "Pause" : "Play"}
                    className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-azure text-primary-foreground shadow-[var(--shadow-lift)]"
                  >
                    {playing ? <Pause className="h-5 w-5" /> : <Play className="ml-0.5 h-5 w-5" />}
                  </motion.button>

                  <div className="min-w-0 flex-1">
                    <input
                      type="range"
                      min={0}
                      max={dur || 0}
                      step={0.1}
                      value={time}
                      aria-label="Seek"
                      onChange={(e) => {
                        const a = audioRef.current;
                        if (a) a.currentTime = Number(e.target.value);
                        setTime(Number(e.target.value));
                      }}
                      className="h-1 w-full cursor-pointer appearance-none rounded-full bg-mist/25 accent-[var(--azure-soft)]"
                    />
                    <div className="mt-1 flex justify-between text-[0.65rem] tabular-nums text-muted-foreground">
                      <span>{fmt(time)}</span>
                      <span>{fmt(dur)}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setMuted((m) => !m)}
                    aria-label={muted ? "Unmute" : "Mute"}
                    className="shrink-0 text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                  </button>
                  <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.01}
                    value={muted ? 0 : vol}
                    aria-label="Volume"
                    onChange={(e) => {
                      setMuted(false);
                      setVol(Number(e.target.value));
                    }}
                    className="hidden h-1 w-16 shrink-0 cursor-pointer appearance-none rounded-full bg-mist/25 accent-[var(--azure-soft)] sm:block"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {needsNudge && !playing && (
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: [0.5, 1, 0.5], y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ opacity: { repeat: Infinity, duration: 2.4 } }}
              className="mt-2 text-center font-hand text-lg text-azure-soft"
            >
              Press play, this song is part of it
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
