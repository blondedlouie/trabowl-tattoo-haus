"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  ShieldCheck,
  Syringe,
  Layers,
  Hospital,
  Stethoscope,
  ClipboardList,
} from "lucide-react";

const hygieneItems = [
  {
    icon: ShieldCheck,
    title: "Autoclave Sterilization",
    desc: "All reusable equipment is Class B autoclave sterilized after every client, exceeding EU EN 13060 standards.",
  },
  {
    icon: Syringe,
    title: "Single-Use Needles",
    desc: "Every session uses factory-sealed, single-use needles that are disposed of in sharps containers immediately after use.",
  },
  {
    icon: Layers,
    title: "Medical-Grade Barriers",
    desc: "ASTM D6319-certified nitrile gloves, disposable machine covers, and single-use ink caps for every tattoo.",
  },
  {
    icon: Hospital,
    title: "Sterile Field Protocol",
    desc: "Each station is disinfected with hospital-grade EPA-registered virucidal solution between every client.",
  },
  {
    icon: Stethoscope,
    title: "Artist Health Checks",
    desc: "All artists are certified in bloodborne pathogen training and hold valid first-aid certifications.",
  },
  {
    icon: ClipboardList,
    title: "Aftercare Guidance",
    desc: "Written aftercare instructions provided with every tattoo and piercing. We follow up at Day 3 and Week 1.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero image section */}
      <div className="relative h-[60vw] max-h-[350px] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1741991109902-98bf764fb35d?w=800&h=600&fit=crop&auto=format"
          alt="Nairobi cityscape at night"
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#eeeae2] dark:to-[#0B0B0B]" />
      </div>

      {/* Section A — Vision */}
      <motion.div
        initial={{ y: 24, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="p-8 md:p-12 text-neutral-900 dark:text-neutral-100"
      >
        <p className="text-[0.6rem] tracking-[0.3em] text-[#A47E4B] dark:text-[#C5A880] mb-2 font-semibold">
          OUR VISION
        </p>
        <h1 className="font-display text-[clamp(2.5rem,9vw,4.5rem)] font-black text-neutral-900 dark:text-[#F5F5F5] leading-[0.95] tracking-[-0.03em] mb-6">
          Art. Identity. <span className="italic text-[#C5A880]">Nairobi.</span>
        </h1>
        <p className="text-base leading-[1.75] max-w-[500px] text-neutral-800 dark:text-neutral-200">
          Trabowl Tattoo Haus was born from a simple belief that tattoo art
          deserves the same reverence as any fine art form. We set out to build
          a space where Kenyan creativity, international craft standards, and
          bold self-expression converge.
        </p>
      </motion.div>

      <div className="h-px bg-[rgba(197,168,128,0.2)] mx-6 md:mx-12" />

      {/* Section B — Kenyan Tattoo Culture */}
      <motion.div
        initial={{ y: 24, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="p-8 md:p-12"
      >
        <p className="text-[0.6rem] tracking-[0.3em] text-[#A47E4B] dark:text-[#C5A880] mb-2 font-semibold">
          THE MOVEMENT
        </p>
        <h2 className="font-display text-[clamp(1.8rem,6vw,3rem)] font-bold text-neutral-900 dark:text-[#F5F5F5] leading-[1.05] tracking-[-0.02em] mb-5">
          Kenya's Tattoo Renaissance
        </h2>
        <p className="mb-4 text-sm leading-[1.75] text-neutral-800 dark:text-neutral-300">
          Kenya's tattoo scene has undergone a seismic transformation. What was
          once viewed with suspicion is now worn as a badge of cultural
          identity, creative ambition, and personal narrative by a generation
          unafraid to be visible.
        </p>
        <p className="text-sm leading-[1.75] text-neutral-800 dark:text-neutral-300">
          From Kilimani, Langata, Buruburu etc, Nairobi's creative class is
          embracing ink as a medium for storytelling. We are here not just to
          tattoo but to archive those stories with precision, care, and the
          artistic gravity they deserve.
        </p>

        {/* Stats Grid - Automatically changes card background via Tailwind */}
        <div className="mt-8 grid grid-cols-2 gap-px bg-[rgba(197,168,128,0.25)] border border-[rgba(197,168,128,0.25)]">
          {[
            { label: "Founded", value: "2023" },
            { label: "Location", value: "Muranga/Nairobi" },
            { label: "Artist", value: "Specialist" },
            { label: "Styles", value: "10+ Disciplines" },
          ].map((stat) => (
            <div key={stat.label} className="p-5 bg-white dark:bg-[#161616]">
              <div className="text-[0.55rem] tracking-[0.2em] text-[#A47E4B] dark:text-[#C5A880] mb-1 font-semibold">
                {stat.label.toUpperCase()}
              </div>
              <div className="font-display text-xl font-bold text-neutral-900 dark:text-[#F5F5F5]">
                {stat.value}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      <div className="h-px bg-[rgba(197,168,128,0.2)] mx-6 md:mx-12" />

      {/* Section C — Hygiene */}
      <motion.div
        initial={{ y: 24, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="p-8 md:p-12"
      >
        <div className="inline-flex items-center gap-2 bg-[rgba(197,168,128,0.1)] border border-[rgba(197,168,128,0.3)] px-3.5 py-1.5 mb-6">
          <Hospital className="w-4 h-4 text-[#A47E4B] dark:text-[#C5A880]" />
          <span className="text-[0.55rem] tracking-[0.2em] text-[#A47E4B] dark:text-[#C5A880] font-bold">
            HOSPITAL GRADE HYGIENE STANDARDS
          </span>
        </div>

        <h2 className="font-display text-[clamp(1.8rem,6vw,3rem)] font-bold text-neutral-900 dark:text-[#F5F5F5] leading-[1.05] tracking-[-0.02em] mb-3">
          Your Safety is Our{" "}
          <span className="italic text-[#C5A880]">Standard</span>
        </h2>
        <p className="mb-8 text-sm leading-[1.6] text-neutral-800 dark:text-neutral-300">
          We hold ourselves to medical facility hygiene protocols not industry
          minimums.
        </p>

        {/* Hygiene Cards Grid - Automatically uses white cards in light mode and dark cards in dark mode */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {hygieneItems.map((item, i) => {
            const IconComponent = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="border p-5 rounded-2xl bg-white dark:bg-[#161616] border-neutral-300 dark:border-[rgba(197,168,128,0.15)] shadow-sm"
              >
                <div className="w-10 h-10 rounded-xl bg-[#C5A880]/10 flex items-center justify-center text-[#A47E4B] dark:text-[#C5A880] mb-4">
                  <IconComponent className="w-5 h-5" />
                </div>
                <h3 className="font-display text-base font-bold text-neutral-900 dark:text-[#F5F5F5] mb-2">
                  {item.title}
                </h3>
                <p className="text-sm leading-[1.6] text-neutral-700 dark:text-neutral-300">
                  {item.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </>
  );
}
