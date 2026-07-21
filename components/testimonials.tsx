"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { testimonials } from "@/lib/data";

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5 mb-3">
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} className="text-bronze text-sm">★</span>
      ))}
    </div>
  );
}

export function Testimonials() {
  const [active, setActive] = useState(0);
  const [light, setLight] = useState(false);
  const t = testimonials[active];

  useEffect(() => {
    const checkTheme = () => {
      setLight(document.body.dataset.theme === "light");
    };
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.body, { attributes: true, attributeFilter: ["data-theme"] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((i) => (i + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const prev = () => setActive((i) => (i - 1 + testimonials.length) % testimonials.length);
  const next = () => setActive((i) => (i + 1) % testimonials.length);

  return (
    <div className="mt-8 max-w-3xl">
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, x: 18 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -18 }}
          transition={{ duration: 0.4 }}
        >
          {t.rating && <StarRating count={t.rating} />}
          <motion.blockquote className="display text-4xl leading-tight md:text-5xl">
            "{t.quote}"
          </motion.blockquote>
          <div className="mt-8 flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-editorial text-neutral-700 dark:text-neutral-300">
                {t.name} · <span className="text-[#A47E4B] dark:text-[#C5A880]">{t.service}</span>
              </p>
              {t.handle && (
                <p className="text-[10px] text-neutral-600 dark:text-neutral-400 mt-1">{t.handle}</p>
              )}
            </div>
            <div className="flex gap-2">
              <button
                aria-label="Previous testimonial"
                onClick={prev}
                className="grid h-10 w-10 place-items-center rounded-full border border-neutral-300 dark:border-white/20 hover:border-bronze transition-colors"
              >
                <ArrowLeft size={15} />
              </button>
              <button
                aria-label="Next testimonial"
                onClick={next}
                className="grid h-10 w-10 place-items-center rounded-full border border-neutral-300 dark:border-white/20 hover:border-bronze transition-colors"
              >
                <ArrowRight size={15} />
              </button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}