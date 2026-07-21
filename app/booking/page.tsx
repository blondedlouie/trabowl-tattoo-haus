"use client";

import { BookingForm } from "@/components/booking-form";
import { useState, useEffect } from "react";

export default function BookingPage() {
  const [light, setLight] = useState(false);

  useEffect(() => {
    const checkTheme = () => {
      setLight(document.body.dataset.theme === "light");
    };
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => observer.disconnect();
  }, []);

  return (
    <section className="frame grid gap-10 py-16 md:grid-cols-[.75fr_1.25fr] md:py-24">
      <div>
        <p className="eyebrow">Start a conversation</p>
        <h1 className="display mt-3 text-6xl leading-[.82] md:text-7xl">
          Bring the
          <br />
          <em className="text-bronze">idea.</em>
        </h1>
        <p className="mt-7 max-w-xs text-sm leading-6 text-neutral-700 dark:text-neutral-300">
          A few details help us pair your vision with the right artist and time.
        </p>
      </div>
      <BookingForm />
    </section>
  );
}
