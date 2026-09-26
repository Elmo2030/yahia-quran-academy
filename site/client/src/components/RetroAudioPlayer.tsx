import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import "./retro-audio-player.css";

const formatTime = (seconds: number) => {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
};

/** Styled like an old valve radio: a dial you turn to seek, and a little
 *  "on air" lamp instead of a plain progress bar. The native <audio> element
 *  stays off-screen — it only decodes and plays the file. */
export function RetroAudioPlayer({ src, title, seekLabel }: { src: string; title: string; seekLabel: string }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onTime = () => setCurrent(audio.currentTime);
    const onLoaded = () => setDuration(audio.duration || 0);
    const onEnd = () => setPlaying(false);
    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("loadedmetadata", onLoaded);
    audio.addEventListener("ended", onEnd);
    return () => {
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("loadedmetadata", onLoaded);
      audio.removeEventListener("ended", onEnd);
    };
  }, [src]);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) audio.pause();
    else void audio.play();
    setPlaying(!playing);
  };

  const seek = (event: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    const value = Number(event.target.value);
    if (audio) audio.currentTime = value;
    setCurrent(value);
  };

  const progress = duration > 0 ? Math.min(100, (current / duration) * 100) : 0;

  return (
    <div className="retro-audio-player">
      <h2>{title}</h2>
      <div className="retro-radio">
        <div className="retro-radio__face">
          <div className="retro-radio__grille" aria-hidden="true">
            {Array.from({ length: 24 }).map((_, i) => <span key={i} />)}
          </div>
          <button type="button" className="retro-radio__knob" onClick={toggle} aria-label={playing ? "إيقاف مؤقت" : "تشغيل"}>
            {playing ? <Pause size={22} aria-hidden="true" /> : <Play size={22} aria-hidden="true" />}
          </button>
        </div>
        <div className="retro-radio__panel">
          <span className={`retro-radio__lamp${playing ? " is-on" : ""}`} aria-hidden="true" />
          <input
            type="range"
            className="retro-radio__dial"
            min={0}
            max={duration || 0}
            step={0.1}
            value={current}
            onChange={seek}
            style={{ "--progress": `${progress}%` } as React.CSSProperties}
            aria-label={seekLabel}
          />
          <span className="retro-radio__time" dir="ltr">{formatTime(current)} / {formatTime(duration)}</span>
        </div>
      </div>
      <audio ref={audioRef} preload="none" src={src} />
    </div>
  );
}
