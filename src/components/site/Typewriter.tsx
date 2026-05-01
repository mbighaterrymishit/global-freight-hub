import { useEffect, useState } from "react";

interface TypewriterProps {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
  showCursor?: boolean;
}

export function Typewriter({ text, speed = 55, delay = 0, className = "", showCursor = true }: TypewriterProps) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    let interval: ReturnType<typeof setInterval> | undefined;
    const start = setTimeout(() => {
      interval = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) {
          clearInterval(interval);
          setDone(true);
        }
      }, speed);
    }, delay);
    return () => {
      clearTimeout(start);
      if (interval) clearInterval(interval);
    };
  }, [text, speed, delay]);

  return (
    <span className={className} aria-label={text}>
      {displayed}
      {showCursor && (
        <span
          className={`inline-block w-[2px] h-[0.9em] align-middle ml-1 bg-gold ${done ? "animate-pulse" : ""}`}
          style={{ animation: done ? "blink 1s steps(2) infinite" : "none" }}
        />
      )}
    </span>
  );
}
