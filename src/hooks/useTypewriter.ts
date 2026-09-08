import { useEffect, useState } from "react";

interface UseTypewriterOptions {
  words: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseTime?: number;
}

export function useTypewriter({
  words,
  typingSpeed = 70,
  deletingSpeed = 40,
  pauseTime = 1600,
}: UseTypewriterOptions) {
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState("");
  const [phase, setPhase] = useState<"typing" | "pausing" | "deleting">("typing");

  const reduceMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    if (reduceMotion) {
      setText(words[0] ?? "");
      return;
    }

    const current = words[wordIndex % words.length];
    let timeout: ReturnType<typeof setTimeout>;

    if (phase === "typing") {
      if (text.length < current.length) {
        timeout = setTimeout(() => setText(current.slice(0, text.length + 1)), typingSpeed);
      } else {
        timeout = setTimeout(() => setPhase("pausing"), pauseTime);
      }
    } else if (phase === "pausing") {
      timeout = setTimeout(() => setPhase("deleting"), pauseTime / 3);
    } else {
      if (text.length > 0) {
        timeout = setTimeout(() => setText(current.slice(0, text.length - 1)), deletingSpeed);
      } else {
        setPhase("typing");
        setWordIndex((i) => (i + 1) % words.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [text, phase, wordIndex, words, typingSpeed, deletingSpeed, pauseTime, reduceMotion]);

  return text;
}
