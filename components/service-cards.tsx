"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { STUDIO_CONFIG } from "@/lib/config";

const services = [
  {
    title: "Custom Tattoos",
    subtitle: "One-of-a-kind originals",
    description:
      "Collaborate directly with our lead artists to bring your vision to life. We work through concept sketches, placement consultations, and custom line work to produce a tattoo that is uniquely yours, never reproduced, never templated.",
    tags: ["Black & Grey", "Colour", "Realism", "Fine Line"],
    images: [
      "/media/Tattoos/black koi.webp",
      "/media/Tattoos/butterfly.webp",
      "/media/Tattoos/cheetah.webp",
    ],
    price: "Contact for pricing",
    ctaLabel: "Get Quote for Custom Design",
  },
  {
    title: "Cover-Up Tattoos",
    subtitle: "Transformations & renewals",
    description:
      "Every tattoo has a story, including the ones you'd rather leave behind. Our specialists assess your existing ink and craft a bold, beautiful design that gives your skin a fresh chapter. Discretion and artistry guaranteed.",
    tags: ["Assessment", "Design Overlay", "Bold Colour", "Black Work"],
    images: [
      "/media/Tattoos/lion cover.webp",
      "/media/Tattoos/cross.webp",
      "/media/Tattoos/Flower.webp",
    ],
    price: "Contact for pricing",
    ctaLabel: "Consult on Cover-Up",
  },
  {
    title: "Flash Tattoos",
    subtitle: "Walk-in ready designs",
    description:
      "Our rotating flash sheet features pre-drawn designs ready to be tattooed same-day. Hand-curated by our artists, each flash piece is a limited run. Once it's claimed, it's gone. Walk in, pick your piece, leave with ink.",
    tags: ["Same-Day", "Limited Editions", "Walk-In Welcome"],
    images: [
      "/media/Tattoos/breathe.webp",
      "/media/Tattoos/Koi.webp",
      "/media/Tattoos/roman.webp",
    ],
    price: "Contact for pricing",
    ctaLabel: "See Current Flash Sheet",
  },
  {
    title: "Piercings",
    subtitle: "Piercing consultations",
    description:
      "From ear lobes to cartilage and nose piercings, we guide you through placement, healing, and aftercare with a clean, comfortable studio experience.",
    tags: ["Lobe", "Cartilage", "Nose", "Aftercare"],
    images: [
      "/media/Tattoos/belly 1.jpg",
      "/media/Tattoos/nose 2.jpg",
      "/media/Tattoos/nose 3.jpg",
    ],
    price: `From ${STUDIO_CONFIG.pricingPlaceholders.piercingBase}`,
    ctaLabel: "Book a piercing consultation",
  },
];

const getSrc = (img: string, w: number, h: number) => {
  if (!img) return "";
  return img.startsWith("/")
    ? encodeURI(img)
    : `https://images.unsplash.com/${img}?w=${w}&h=${h}&fit=crop&auto=format`;
};

export function ServiceCards() {
  return (
    <div className="p-6 md:p-12 flex flex-col gap-8">
      {services.map((service, i) => (
        <motion.div
          key={service.title}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: i * 0.08 }}
          className="border overflow-hidden rounded-[2rem] bg-white dark:bg-[#161616] border-neutral-300 dark:border-[rgba(197,168,128,0.14)] shadow-sm"
        >
          {/* 3-image mini grid */}
          <div className="grid grid-cols-[2fr_1fr] gap-0.5 h-[220px] md:h-[320px]">
            <div className="relative w-full h-full overflow-hidden rounded-l-[1.5rem] bg-neutral-950/5">
              <Image
                src={getSrc(service.images[0], 400, 440)}
                alt={service.title}
                fill
                className="object-cover"
                unoptimized
                sizes="(min-width: 768px) 50vw, 100vw"
              />
            </div>
            <div className="grid grid-rows-2 gap-0.5">
              {service.images.slice(1).map((img, j) => (
                <div
                  key={j}
                  className={`relative w-full h-full overflow-hidden ${
                    j === 0 ? "rounded-tr-[1.5rem]" : "rounded-br-[1.5rem]"
                  } bg-neutral-950/5`}
                >
                  <Image
                    src={getSrc(img, 200, 220)}
                    alt=""
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="p-6 text-neutral-900 dark:text-neutral-100">
            <p className="mb-1 text-[0.55rem] font-semibold uppercase tracking-[0.25em] text-[#A47E4B] dark:text-[#C5A880]">
              {service.subtitle.toUpperCase()}
            </p>
            <h2 className="mb-3 font-display text-xl font-bold leading-[1.1] text-neutral-900 dark:text-[#F5F5F5]">
              {service.title}
            </h2>

            {/* Tags */}
            <div className="flex gap-1.5 flex-wrap mb-4">
              {service.tags.map((tag) => (
                <span
                  key={tag}
                  className="border border-[#A47E4B]/45 px-2 py-1 text-[0.55rem] tracking-[0.12em] text-neutral-800 dark:border-[rgba(197,168,128,0.2)] dark:text-neutral-400"
                >
                  {tag.toUpperCase()}
                </span>
              ))}
            </div>

            <p className="mb-5 text-sm leading-[1.65] text-neutral-700 dark:text-neutral-300">
              {service.description}
            </p>

            {/* Pricing */}
            <div className="bg-[rgba(197,168,128,0.12)] border border-[rgba(197,168,128,0.25)] p-3 mb-5 flex items-center gap-2 rounded-xl">
              <span className="font-display text-sm font-semibold text-neutral-900 dark:text-white">
                {service.price}
              </span>
            </div>

            <Link
              href="/book"
              className="w-full bg-[#C5A880] text-[#0B0B0B] border-none p-3 text-[0.65rem] tracking-[0.18em] font-bold cursor-pointer transition hover:bg-neutral-200 dark:hover:bg-[#F5F5F5] block text-center rounded-xl"
            >
              {service.ctaLabel.toUpperCase()}
            </Link>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
