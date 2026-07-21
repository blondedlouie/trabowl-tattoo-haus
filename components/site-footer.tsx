import Link from "next/link";
import Image from "next/image";
import { Instagram, MessageCircle } from "lucide-react";
import { studioConfig } from "@/lib/config";

export function SiteFooter() {
  const primaryPhone = `+254${studioConfig.contactPhone.replace(/^0/, "")}`;
  const secondaryPhone = `+254${studioConfig.secondaryPhone.replace(/^0/, "")}`;

  return (
    <footer className="w-full bg-neutral-100 px-4 py-8 dark:bg-black sm:px-6 lg:px-8">
      {/* Floating Card Canvas matching the Dribbble reference layout */}
      <div className="mx-auto max-w-7xl rounded-[2.5rem] border border-neutral-200/60 bg-white p-8 shadow-sm dark:border-white/10 dark:bg-[#070707] sm:p-12">
        {/* Top Section: Branding + Links Grid */}
        <div className="grid gap-10 pb-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
          {/* Left Column: Brand Identity & Mission */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <Image
                src="/brand/trabowl-logo.png"
                alt={`${studioConfig.brandName} Logo`}
                width={110}
                height={32}
                className="object-contain"
                priority
              />
            </div>

            <h2 className="max-w-md font-display text-2xl font-semibold tracking-[-0.03em] text-neutral-900 dark:text-white sm:text-3xl">
              Intentional ink, crafted with calm precision.
            </h2>

            <p className="max-w-sm text-sm leading-6 text-neutral-600 dark:text-neutral-400">
              {studioConfig.address.replace("·", "•")}
            </p>

            {/* Social Media Row matching style profile */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href={studioConfig.instagramUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="Visit Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 text-neutral-600 transition duration-300 hover:-translate-y-0.5 hover:border-[#C5A880] hover:text-[#C5A880] dark:border-white/10 dark:text-neutral-400 dark:hover:text-white"
              >
                <Instagram size={16} />
              </a>
              <a
                href={`https://wa.me/${primaryPhone.replace("+", "")}`}
                target="_blank"
                rel="noreferrer"
                aria-label="Open WhatsApp"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 text-neutral-600 transition duration-300 hover:-translate-y-0.5 hover:border-[#C5A880] hover:text-[#C5A880] dark:border-white/10 dark:text-neutral-400 dark:hover:text-white"
              >
                <MessageCircle size={16} />
              </a>
            </div>
          </div>

          {/* Right Column: Structured Direct Contact Navigation */}
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:justify-items-end">
            <div className="space-y-4">
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#C5A880]">
                Direct Contact
              </p>
              <ul className="space-y-2.5 text-sm font-medium">
                <li>
                  <a
                    href={`mailto:${studioConfig.contactEmail}`}
                    className="text-neutral-600 transition hover:text-[#C5A880] dark:text-neutral-300 dark:hover:text-[#C5A880]"
                  >
                    {studioConfig.contactEmail}
                  </a>
                </li>
                <li>
                  <a
                    href={`tel:${primaryPhone}`}
                    className="text-neutral-600 transition hover:text-[#C5A880] dark:text-neutral-300 dark:hover:text-[#C5A880]"
                  >
                    {studioConfig.contactPhone}
                  </a>
                </li>
                <li>
                  <a
                    href={`tel:${secondaryPhone}`}
                    className="text-neutral-600 transition hover:text-[#C5A880] dark:text-neutral-300 dark:hover:text-[#C5A880]"
                  >
                    {studioConfig.secondaryPhone}
                  </a>
                </li>
              </ul>
            </div>

            <div className="space-y-4 lg:text-right">
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#C5A880]">
                Studio Policy
              </p>
              <div className="space-y-3">
                <p className="text-[10px] uppercase tracking-[0.18em] text-neutral-400 dark:text-neutral-500">
                  {studioConfig.depositRequirement} Deposit Needed
                </p>
                <Link
                  href="/book"
                  className="inline-block text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-900 underline decoration-[#C5A880] decoration-2 underline-offset-4 transition hover:text-[#C5A880] dark:text-white"
                >
                  Book Session →
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section: Clean Border + Copyright Line */}
        <div className="border-t border-neutral-100 pt-6 dark:border-white/5">
          <div className="flex flex-col gap-3 text-[10px] uppercase tracking-[0.2em] text-neutral-400 sm:flex-row sm:items-center sm:justify-between dark:text-neutral-500">
            <p>
              © {new Date().getFullYear()} {studioConfig.brandName}. All Rights
              Reserved.
            </p>
            <p className="text-neutral-300 dark:text-neutral-600 hidden sm:block">
              |
            </p>
            <p>Designed for Excellence • Healed with Care</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
