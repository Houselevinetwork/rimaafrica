"use client";
import { useEffect, useRef, useState } from "react";

export function useIntersection({
  threshold = 0.15,
  rootMargin = "0px",
  triggerOnce = true,
} = {}) {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce) observer.disconnect();
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin, triggerOnce]);

  return { ref, isVisible };
}

export function useCounter(target: number, duration = 1500, isActive = true) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!isActive) return;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const interval = setInterval(() => {
      current += increment;
      if (current >= target) { setCount(target); clearInterval(interval); }
      else { setCount(Math.floor(current)); }
    }, duration / steps);
    return () => clearInterval(interval);
  }, [target, duration, isActive]);
  return count;
}
