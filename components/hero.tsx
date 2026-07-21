"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

const heroSlides = [
  {
    src: "/media/Tattoos/trabo 1.webp",
    caption: "Custom Ink · Nairobi",
  },
  {
    src: "/media/Tattoos/trabo 2.webp",
    caption: "Precision Craft",
  },
  {
    src: "/media/Tattoos/trabo 3.webp",
    caption: "Your Vision. Our Art.",
  },
];

export function Hero() {
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSlideIndex((i) => (i + 1) % heroSlides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="grain relative isolate min-h-[calc(100svh-70px)] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={slideIndex}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Image
            src={heroSlides[slideIndex].src}
            alt={heroSlides[slideIndex].caption}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />

          {/* Theme-aware overlay mask (pure Tailwind CSS transition) */}
          <div className="absolute inset-0 backdrop-blur-[1px] sm:backdrop-blur-none transition-colors duration-300 bg-gradient-to-t from-neutral-100/95 via-neutral-100/75 to-neutral-100/40 dark:from-[#0B0B0B] dark:via-[#0B0B0B]/75 dark:to-[#0B0B0B]/40" />
        </motion.div>
      </AnimatePresence>

      {/* Hero content */}
      <div className="frame flex min-h-[calc(100svh-70px)] flex-col justify-end py-12 md:py-20 relative z-10">
        <motion.div
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          <p className="eyebrow mb-5">LUXURY TATTOO HAUS ·</p>

          {/* FIXED: Explicit light and dark heading text color */}
          <h1 className="display text-6xl leading-[.78] sm:text-7xl md:text-9xl text-neutral-900 dark:text-white">
            Wear Your
            <br />
            <em className="font-normal text-bronze">Story.</em>
          </h1>

          {/* Subtext contrast optimized */}
          <p className="mt-8 max-w-md text-sm leading-6 text-neutral-800 dark:text-neutral-200 md:text-base font-medium sm:font-normal">
            Nairobi's premier tattoo haus. Custom designs and cover-ups crafted
            with surgical precision.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/book" className="button-gold">
              BOOK APPOINTMENT <ArrowUpRight size={15} />
            </Link>
            <Link href="/portfolio" className="button-ghost">
              VIEW PORTFOLIO
            </Link>
          </div>
        </motion.div>

        {/* Slide indicators */}
        <div className="flex gap-1.5 mt-8">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setSlideIndex(i)}
              className={`h-0.5 transition-all duration-300 ${
                i === slideIndex
                  ? "w-6 bg-bronze"
                  : "w-2 bg-neutral-400 dark:bg-white/30"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
