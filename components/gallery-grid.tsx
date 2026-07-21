"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";

export interface GalleryItem {
  id: string;
  title: string;
  src: string;
}

export function GalleryGrid({ images }: { images: GalleryItem[] }) {
  const [chosen, setChosen] = useState<number | null>(null);
  const [light, setLight] = useState(false);

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
    if (chosen === null) return;

    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") setChosen(null);
      if (e.key === "ArrowRight")
        setChosen((prev) =>
          prev === null ? null : (prev + 1) % images.length,
        );
      if (e.key === "ArrowLeft")
        setChosen((prev) =>
          prev === null ? null : (prev - 1 + images.length) % images.length,
        );
    };

    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  }, [chosen, images.length]);

  return (
    <>
      <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
        {images.map((item, i) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setChosen(i)}
            className="group relative mb-4 block w-full overflow-hidden text-left"
          >
            <div className="relative h-96 w-full overflow-hidden">
              <Image
                src={item.src}
                alt={item.title}
                fill
                className="object-cover transition duration-700 group-hover:scale-[1.03] group-hover:grayscale-0"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </button>
        ))}
      </div>

      <AnimatePresence>
        {chosen !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] grid place-items-center bg-black/95 p-4"
            onClick={() => setChosen(null)}
          >
            <button
              className="absolute right-6 top-6 text-neutral-900 dark:text-white"
              aria-label="Close"
              type="button"
            >
              <X />
            </button>
            <button
              className="absolute left-4 text-neutral-700 dark:text-white/70"
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setChosen((chosen - 1 + images.length) % images.length);
              }}
              aria-label="Previous"
            >
              <ChevronLeft size={32} />
            </button>

            <motion.div
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={(_, info) => {
                if (info.offset.x > 70)
                  setChosen((chosen - 1 + images.length) % images.length);
                if (info.offset.x < -70)
                  setChosen((chosen + 1) % images.length);
              }}
              onClick={(e) => e.stopPropagation()}
              className="relative h-[80vh] w-full max-w-4xl"
            >
              <Image
                src={images[chosen].src}
                alt={images[chosen].title}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </motion.div>

            <button
              className="absolute right-4 text-neutral-700 dark:text-white/70"
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setChosen((chosen + 1) % images.length);
              }}
              aria-label="Next"
            >
              <ChevronRight size={32} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
