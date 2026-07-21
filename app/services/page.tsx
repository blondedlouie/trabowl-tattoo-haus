import { ServiceCards } from "@/components/service-cards";

export default function ServicesPage() {
  return (
    <div className="min-h-screen pb-24">
      {/* Header */}
      <div className="p-8 md:p-12 border-b border-[rgba(197,168,128,0.12)]">
        <p className="text-[0.6rem] tracking-[0.3em] text-[#A47E4B] dark:text-[#C5A880] mb-2 font-semibold">
          WHAT WE OFFER
        </p>
        <h1 className="font-display text-[clamp(2.5rem,9vw,4.5rem)] font-black text-neutral-900 dark:text-[#F5F5F5] leading-[0.95] tracking-[-0.03em]">
          Services & <span className="italic text-[#C5A880]">Pricing</span>
        </h1>
      </div>

      {/* Service cards */}
      <ServiceCards />
    </div>
  );
}
