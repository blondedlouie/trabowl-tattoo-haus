"use client";

import { STUDIO_CONFIG } from "@/lib/config";
import type { ReactNode } from "react";
import Image from "next/image";
import { MapPin, Phone, Mail, Instagram } from "lucide-react";

const hours = [
  { day: "Monday", time: "Closed" },
  { day: "Tuesday", time: "10:00 – 19:00" },
  { day: "Wednesday", time: "10:00 – 19:00" },
  { day: "Thursday", time: "10:00 – 19:00" },
  { day: "Friday", time: "10:00 – 20:00" },
  { day: "Saturday", time: "10:00 – 20:00" },
  { day: "Sunday", time: "12:00 – 17:00" },
];

const today = new Date().toLocaleDateString("en-US", { weekday: "long" });

const mockInstagramPosts = [
  "arabic.webp",
  "breathe.webp",
  "butterfly.webp",
  "flower arm.webp",
  "heart.webp",
  "cherry.webp",
];

const contactItems: Array<{
  icon: React.ElementType;
  label: string;
  value: ReactNode;
}> = [
  {
    icon: MapPin,
    label: "Address",
    value: "Trabowl Studio, Muranga/Nairobi\nNairobi, Kenya",
  },
  {
    icon: Phone,
    label: "Phone / WhatsApp",
    value: (
      <div className="space-y-1">
        <a
          href={`tel:+254${STUDIO_CONFIG.contactPhone.replace(/^0/, "")}`}
          className="block text-sm font-medium text-neutral-900 hover:text-[#C5A880] dark:text-[#F5F5F5]"
        >
          {STUDIO_CONFIG.contactPhone}
        </a>
        <a
          href={`tel:+254${STUDIO_CONFIG.secondaryPhone.replace(/^0/, "")}`}
          className="block text-sm font-medium text-neutral-900 hover:text-[#C5A880] dark:text-[#F5F5F5]"
        >
          {STUDIO_CONFIG.secondaryPhone}
        </a>
      </div>
    ),
  },
  {
    icon: Mail,
    label: "Email",
    value: (
      <a
        href={`mailto:${STUDIO_CONFIG.contactEmail}`}
        className="text-sm font-medium text-neutral-900 hover:text-[#C5A880] dark:text-[#F5F5F5]"
      >
        {STUDIO_CONFIG.contactEmail}
      </a>
    ),
  },
  {
    icon: Instagram,
    label: "Instagram",
    value: STUDIO_CONFIG.instagramHandle,
  },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen pb-24">
      {/* Header */}
      <div className="p-8 md:p-12 border-b border-neutral-300 dark:border-[rgba(197,168,128,0.12)]">
        <p className="text-[0.6rem] tracking-[0.3em] text-[#A47E4B] dark:text-[#C5A880] mb-2 font-semibold">
          GET IN TOUCH
        </p>
        <h1 className="font-display text-[clamp(2.5rem,9vw,4.5rem)] font-black text-neutral-900 dark:text-[#F5F5F5] leading-[0.95] tracking-[-0.03em]">
          Find <span className="italic text-[#C5A880]">Us</span>
        </h1>
      </div>

      <div className="p-6 md:p-12">
        {/* Contact card */}
        <div className="border p-7 mb-6 bg-white dark:bg-[#161616] border-neutral-300 dark:border-[rgba(197,168,128,0.15)] rounded-2xl shadow-sm">
          <p className="text-[0.55rem] tracking-[0.25em] text-[#A47E4B] dark:text-[#C5A880] mb-5 font-bold">
            CONTACT DETAILS
          </p>

          {contactItems.map((contact) => {
            const IconComponent = contact.icon;
            return (
              <div
                key={contact.label}
                className="flex gap-4 items-start pb-4 mb-4 border-b border-neutral-200 dark:border-[rgba(197,168,128,0.08)] last:border-b-0 last:mb-0 last:pb-0"
              >
                <div className="w-9 h-9 rounded-xl bg-[#C5A880]/10 flex items-center justify-center text-[#A47E4B] dark:text-[#C5A880] flex-shrink-0 mt-0.5">
                  <IconComponent className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[0.55rem] tracking-[0.15em] text-[#A47E4B] dark:text-[#C5A880] mb-1 font-semibold">
                    {contact.label.toUpperCase()}
                  </div>
                  <div className="text-sm text-neutral-900 dark:text-[#F5F5F5] leading-[1.5] whitespace-pre-line">
                    {contact.value}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Hours */}
        <div className="border p-7 mb-6 bg-white dark:bg-[#161616] border-neutral-300 dark:border-[rgba(197,168,128,0.15)] rounded-2xl shadow-sm">
          <p className="text-[0.55rem] tracking-[0.25em] text-[#A47E4B] dark:text-[#C5A880] mb-5 font-bold">
            OPERATING HOURS
          </p>
          {hours.map((h) => {
            const isToday = h.day === today;
            const isClosed = h.time === "Closed";
            return (
              <div
                key={h.day}
                className={`flex justify-between items-center pb-2.5 mb-2.5 border-b border-neutral-200 dark:border-[rgba(197,168,128,0.06)] last:border-b-0 last:mb-0 last:pb-0 ${
                  isToday
                    ? "bg-[#C5A880]/10 px-3 py-2 rounded-xl border-none my-1"
                    : ""
                }`}
              >
                <div className="flex items-center gap-2">
                  {isToday && (
                    <div
                      className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ background: isClosed ? "#ef4444" : "#22c55e" }}
                    />
                  )}
                  <span
                    className={`text-sm ${
                      isToday
                        ? "font-semibold text-neutral-900 dark:text-[#F5F5F5]"
                        : "text-neutral-700 dark:text-neutral-400"
                    }`}
                  >
                    {h.day}
                  </span>
                </div>
                <span
                  className={`text-sm ${
                    isClosed
                      ? "text-neutral-400 dark:text-neutral-600"
                      : isToday
                        ? "font-semibold text-[#A47E4B] dark:text-[#C5A880]"
                        : "text-neutral-800 dark:text-neutral-300"
                  }`}
                >
                  {h.time}
                </span>
              </div>
            );
          })}
        </div>

        {/* Instagram feed mockup */}
        <div className="mb-6 border border-neutral-300 dark:border-[rgba(197,168,128,0.15)] bg-white dark:bg-[#161616] p-6 rounded-2xl shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-sm text-neutral-900 dark:text-[#F5F5F5] font-semibold">
              {STUDIO_CONFIG.instagramHandle}
            </span>
            <span className="text-xs text-neutral-600 dark:text-neutral-400">
              on Instagram
            </span>
            <a
              href={STUDIO_CONFIG.instagramLink}
              target="_blank"
              rel="noreferrer"
              className="ml-auto text-[0.6rem] text-[#A47E4B] dark:text-[#C5A880] no-underline tracking-[0.15em] border border-[#A47E4B]/40 dark:border-[rgba(197,168,128,0.4)] px-3 py-1.5 rounded-lg transition hover:bg-[#A47E4B]/10"
            >
              FOLLOW →
            </a>
          </div>
          <div className="grid grid-cols-3 gap-1.5 overflow-hidden rounded-xl">
            {mockInstagramPosts.map((id) => (
              <div key={id} className="relative aspect-square">
                <Image
                  src={`/media/Tattoos/${id}`}
                  alt="Instagram post"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 33vw, 20vw"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
