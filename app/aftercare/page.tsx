"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  aftercareTimeline,
  aftercareDos,
  aftercareDonts,
  aftercareFaqs,
} from "@/lib/data";

export default function AftercarePage() {
  const [activeTimelineStep, setActiveTimelineStep] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen pb-24 text-neutral-900 dark:text-neutral-100">
      {/* Header */}
      <div className="p-8 md:p-12 border-b border-neutral-300 dark:border-[rgba(197,168,128,0.12)]">
        <p className="text-[0.6rem] tracking-[0.3em] text-[#C5A880] mb-2 font-semibold">
          HEAL WELL
        </p>
        <h1 className="font-display text-[clamp(2.5rem,9vw,4.5rem)] font-black text-neutral-900 dark:text-[#F5F5F5] leading-[0.95] tracking-[-0.03em]">
          Aftercare <span className="italic text-[#C5A880]">Guide</span>
        </h1>

        <a
          href="/docs/trabowl_tattoo_aftercare.pdf"
          download
          className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#C5A880]/40 bg-[#C5A880]/10 px-4 py-2 text-sm font-semibold text-[#C5A880] transition hover:bg-[#C5A880]/20"
        >
          Download full aftercare PDF
        </a>
      </div>

      {/* Healing Timeline */}
      <section className="p-8 md:p-12">
        <p className="text-[0.6rem] tracking-[0.3em] text-[#C5A880] mb-6 font-semibold">
          HEALING TIMELINE
        </p>

        {/* Timeline track */}
        <div className="relative mb-8">
          <div className="flex justify-between relative">
            <div className="absolute top-4 left-4 right-4 h-0.5 bg-neutral-300 dark:bg-[rgba(197,168,128,0.15)]" />
            <div
              className="absolute top-4 left-4 h-0.5 bg-[#C5A880] transition-all duration-300"
              style={{
                width: `${(activeTimelineStep / (aftercareTimeline.length - 1)) * (100 - 32 / 3)}%`,
              }}
            />
            {aftercareTimeline.map((item, i) => {
              const isActive = i === activeTimelineStep;
              const isPassed = i < activeTimelineStep;

              return (
                <button
                  key={i}
                  onClick={() => setActiveTimelineStep(i)}
                  className="relative z-10 bg-transparent border-none cursor-pointer flex flex-col items-center gap-2"
                >
                  <div
                    className={`w-8 h-8 rounded-full transition-all duration-300 flex items-center justify-center border-2 ${
                      isPassed || isActive
                        ? "bg-[#C5A880] border-[#C5A880]"
                        : "bg-white dark:bg-[#161616] border-neutral-300 dark:border-[rgba(197,168,128,0.25)]"
                    }`}
                  >
                    {isPassed ? (
                      <span className="text-[#0B0B0B] text-xs font-bold">
                        ✓
                      </span>
                    ) : (
                      <span
                        className={`text-[0.65rem] font-bold ${
                          isActive
                            ? "text-[#0B0B0B]"
                            : "text-neutral-400 dark:text-neutral-600"
                        }`}
                      >
                        {i + 1}
                      </span>
                    )}
                  </div>
                  <span
                    className={`text-[0.5rem] tracking-[0.1em] font-semibold whitespace-nowrap ${
                      isActive
                        ? "text-[#C5A880]"
                        : "text-neutral-400 dark:text-neutral-600"
                    }`}
                  >
                    {item.label.toUpperCase()}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active step content */}
        <motion.div
          key={activeTimelineStep}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="border border-neutral-300 dark:border-[rgba(197,168,128,0.2)] bg-white dark:bg-[#161616] p-6 rounded-2xl shadow-sm"
          style={{ borderLeftWidth: "3px", borderLeftColor: "#C5A880" }}
        >
          <h3 className="font-display text-xl font-bold text-neutral-900 dark:text-[#F5F5F5] mb-3">
            {aftercareTimeline[activeTimelineStep].title}
          </h3>
          <p className="text-sm leading-[1.7] text-neutral-700 dark:text-neutral-300">
            {aftercareTimeline[activeTimelineStep].desc}
          </p>
        </motion.div>

        <div className="flex gap-2 justify-between mt-4">
          <button
            onClick={() => setActiveTimelineStep((s) => Math.max(0, s - 1))}
            disabled={activeTimelineStep === 0}
            className={`border px-5 py-2 text-[0.7rem] tracking-[0.1em] rounded-xl transition ${
              activeTimelineStep === 0
                ? "border-neutral-200 dark:border-neutral-800 text-neutral-300 dark:text-neutral-700 cursor-default"
                : "border-[#C5A880]/40 text-[#C5A880] hover:bg-[#C5A880]/10 cursor-pointer"
            }`}
          >
            ← PREVIOUS
          </button>
          <button
            onClick={() =>
              setActiveTimelineStep((s) =>
                Math.min(aftercareTimeline.length - 1, s + 1),
              )
            }
            disabled={activeTimelineStep === aftercareTimeline.length - 1}
            className={`border px-5 py-2 text-[0.7rem] tracking-[0.1em] rounded-xl transition ${
              activeTimelineStep === aftercareTimeline.length - 1
                ? "border-neutral-200 dark:border-neutral-800 text-neutral-300 dark:text-neutral-700 cursor-default"
                : "border-[#C5A880]/40 text-[#C5A880] hover:bg-[#C5A880]/10 cursor-pointer"
            }`}
          >
            NEXT →
          </button>
        </div>
      </section>

      {/* Dos and Don'ts */}
      <section className="p-8 md:p-12 border-t border-neutral-300 dark:border-[rgba(197,168,128,0.12)]">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="border border-neutral-300 dark:border-[rgba(197,168,128,0.15)] bg-white dark:bg-[#161616] p-6 rounded-2xl shadow-sm">
            <h3 className="font-display text-xl font-bold text-[#C5A880] mb-4">
              DO
            </h3>
            <ul className="space-y-3">
              {aftercareDos.map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-sm leading-[1.6] text-neutral-700 dark:text-neutral-300"
                >
                  <span className="text-[#C5A880] font-bold mt-0.5">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="border border-neutral-300 dark:border-[rgba(197,168,128,0.15)] bg-white dark:bg-[#161616] p-6 rounded-2xl shadow-sm">
            <h3 className="font-display text-xl font-bold text-[#C5A880] mb-4">
              DON'T
            </h3>
            <ul className="space-y-3">
              {aftercareDonts.map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-sm leading-[1.6] text-neutral-700 dark:text-neutral-300"
                >
                  <span className="text-[#C5A880] font-bold mt-0.5">✕</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Aftercare FAQ */}
      <section className="p-8 md:p-12 border-t border-neutral-300 dark:border-[rgba(197,168,128,0.12)]">
        <h3 className="font-display text-2xl font-bold text-neutral-900 dark:text-[#F5F5F5] mb-6">
          Common Questions
        </h3>
        <div className="space-y-4">
          {aftercareFaqs.map((faq, i) => {
            const isOpen = openFaq === i;
            return (
              <div
                key={i}
                className="border-b border-neutral-300 dark:border-[rgba(197,168,128,0.08)]"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : i)}
                  className="w-full bg-transparent border-none p-4 flex justify-between items-start text-left gap-4 cursor-pointer"
                >
                  <span className="text-sm font-medium leading-[1.4] text-neutral-900 dark:text-neutral-200">
                    {faq.q}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-[#C5A880] text-xl flex-shrink-0 leading-none mt-1"
                  >
                    +
                  </motion.span>
                </button>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    className="overflow-hidden"
                  >
                    <div className="pb-5 pl-4">
                      <div className="text-sm leading-[1.75] text-neutral-700 dark:text-neutral-300 border-l-2 border-[#C5A880] pl-4">
                        {faq.a}
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
