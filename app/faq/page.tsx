"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { faqs } from "@/lib/data";
import Link from "next/link";

export default function FaqPage() {
  const [openItem, setOpenItem] = useState<string | null>(null);

  const toggle = (key: string) => setOpenItem(openItem === key ? null : key);

  return (
    <div className="min-h-screen pb-24 text-neutral-900 dark:text-neutral-100">
      {/* Header */}
      <div className="p-8 md:p-12 border-b border-neutral-300 dark:border-[rgba(197,168,128,0.12)]">
        <p className="text-[0.6rem] tracking-[0.3em] text-[#C5A880] mb-2 font-semibold">
          GOT QUESTIONS?
        </p>
        <h1 className="font-display text-[clamp(2.5rem,9vw,4.5rem)] font-black text-neutral-900 dark:text-[#F5F5F5] leading-[0.95] tracking-[-0.03em]">
          Frequently <span className="italic text-[#C5A880]">Asked</span>
        </h1>
      </div>

      <div className="p-8 md:p-12">
        {faqs.map((section) => (
          <div key={section.category} className="mb-10">
            <div className="text-[0.55rem] tracking-[0.3em] text-[#A47E4B] dark:text-[#C5A880] font-bold mb-3 pb-3 border-b border-neutral-300 dark:border-[rgba(197,168,128,0.12)]">
              {section.category.toUpperCase()}
            </div>

            <div className="rounded-2xl bg-white dark:bg-[#161616] p-4 border border-neutral-300 dark:border-[rgba(197,168,128,0.15)] shadow-sm">
              {section.items.map((item, i) => {
                const key = `${section.category}-${i}`;
                const isOpen = openItem === key;

                return (
                  <div
                    key={i}
                    className="border-b border-neutral-200 dark:border-[rgba(197,168,128,0.08)] last:border-b-0"
                  >
                    <button
                      onClick={() => toggle(key)}
                      className="w-full bg-transparent border-none p-4 flex justify-between items-start text-left gap-4 cursor-pointer"
                    >
                      <span className="text-sm font-medium leading-[1.4] transition-colors text-neutral-900 dark:text-neutral-100">
                        {item.q}
                      </span>
                      <motion.span
                        animate={{ rotate: isOpen ? 45 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="text-[#C5A880] text-xl flex-shrink-0 leading-none mt-1"
                      >
                        +
                      </motion.span>
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{
                            duration: 0.28,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          className="overflow-hidden"
                        >
                          <div className="pb-5 pl-4">
                            <div className="text-sm leading-[1.75] text-neutral-700 dark:text-neutral-300 border-l-2 border-[#C5A880] pl-4">
                              {item.a}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        {/* Still have questions? */}
        <div className="mt-12 p-6 bg-white dark:bg-[#161616] border border-neutral-300 dark:border-[rgba(197,168,128,0.2)] text-center rounded-2xl shadow-sm">
          <p className="mb-4 text-sm font-medium text-neutral-800 dark:text-neutral-200">
            Still have questions?
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/contact"
              className="bg-[#C5A880] text-[#0B0B0B] border-none px-6 py-3 text-[0.7rem] tracking-[0.18em] font-bold cursor-pointer transition hover:bg-neutral-200 dark:hover:bg-[#F5F5F5] rounded-xl"
            >
              CONTACT US
            </Link>
            <Link
              href="/book"
              className="bg-transparent text-neutral-900 dark:text-[#F5F5F5] border border-neutral-300 dark:border-[rgba(245,245,245,0.3)] px-6 py-3 text-[0.7rem] tracking-[0.18em] font-medium cursor-pointer transition hover:border-[#C5A880] rounded-xl"
            >
              BOOK APPOINTMENT
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
