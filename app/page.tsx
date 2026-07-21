import { Hero } from "@/components/hero";
import { Testimonials } from "@/components/testimonials";
import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <Hero />
      <section className="frame grid gap-8 py-20 md:grid-cols-[1fr_.8fr] md:py-28">
        <div>
          <p className="eyebrow">The haus standard</p>
          <h2 className="display mt-3 text-5xl leading-[.86] md:text-7xl">
            Quiet confidence.
            <br />
            Loud <em className="text-bronze">craft.</em>
          </h2>
        </div>
        <div className="space-y-5 self-end text-sm leading-7 text-neutral-700 dark:text-neutral-300">
          <p className="text-neutral-700 dark:text-neutral-300">
            Trabowl is an intentional space for custom tattoo experience. From
            first message to healed piece, our process stays considered,
            collaborative and beautifully clean.
          </p>
          <Link
            href="/about"
            className="inline-block border-b border-bronze pb-1 text-xs font-bold uppercase tracking-editorial text-bronze"
          >
            Meet the studio ↗
          </Link>
        </div>
      </section>
      <section className="bg-charcoal py-20">
        <div className="frame">
          <p className="eyebrow">In their words</p>
          <Testimonials />
        </div>
      </section>
    </>
  );
}
