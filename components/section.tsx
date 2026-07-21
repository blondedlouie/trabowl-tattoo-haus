import { ReactNode } from "react";

export function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-14 md:px-8">
      <h2 className="font-heading text-4xl uppercase tracking-wide text-paper md:text-5xl">{title}</h2>
      <div className="mt-6">{children}</div>
    </section>
  );
}
