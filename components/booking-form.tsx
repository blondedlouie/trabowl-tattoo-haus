"use client";
import { useState, useEffect } from "react";
import { Check, ChevronLeft, ChevronRight, Upload } from "lucide-react";
import { STUDIO_CONFIG } from "@/lib/config";
import Image from "next/image";

const PLACEMENTS = [
  "Arm",
  "Forearm",
  "Wrist",
  "Chest",
  "Back",
  "Leg",
  "Ankle",
  "Neck",
  "Behind Ear",
  "Ribcage",
];

export function BookingForm() {
  const [step, setStep] = useState(1);
  const [size, setSize] = useState(10);
  const [placement, setPlacement] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [details, setDetails] = useState({
    name: "",
    phone: "",
    date: "",
  });
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

  const message = `Hello Trabowl, I would like to book a tattoo session. Placement: ${placement || "TBD"}; Size: ${size}cm; preferred date: ${details.date || "to discuss"}; name: ${details.name}; phone: ${details.phone || "to discuss"}.`;
  const whatsappUrl = `https://wa.me/${STUDIO_CONFIG.whatsapp}?text=${encodeURIComponent(message)}`;

  const fields = (label: keyof typeof details, type = "text") => (
    <label className="block text-xs uppercase tracking-editorial text-neutral-700 dark:text-neutral-300">
      {label}
      <input
        type={type}
        value={details[label]}
        onChange={(e) => setDetails({ ...details, [label]: e.target.value })}
        className="mt-2 w-full border-b border-neutral-400 text-neutral-900 focus:border-[#A47E4B] dark:border-neutral-800 dark:text-white outline-none"
      />
    </label>
  );

  return (
    <div className="panel p-5 sm:p-8 text-black dark:text-white">
      <div className="mb-10 flex gap-2">
        {["Concept", "Reference", "Schedule"].map((x, i) => (
          <div key={x} className="flex flex-1 items-center gap-2">
               <span
               className={`grid h-7 w-7 place-items-center rounded-full text-xs ${i + 1 <= step ? "bg-bronze text-obsidian" : "border border-neutral-400 text-neutral-800 dark:border-neutral-800 dark:text-neutral-200"}`}
             >
              {i + 1 < step ? <Check size={14} /> : i + 1}
            </span>
            <span className="hidden text-[10px] uppercase tracking-editorial text-neutral-700 dark:text-neutral-300 sm:block">
               {x}
             </span>
          </div>
        ))}
      </div>

      {step === 1 && (
        <div className="space-y-8">
          <div>
            <p className="eyebrow">01 / Concept</p>
            <h2 className="display mt-1 text-4xl">What are we making?</h2>
          </div>

          {/* Placement selector */}
          <div>
            <label className="block text-xs uppercase tracking-editorial text-neutral-700 dark:text-neutral-300 mb-3">
               Placement
             </label>
            <div className="flex flex-wrap gap-2">
              {PLACEMENTS.map((p) => (
                <button
                  key={p}
                  onClick={() => setPlacement(p)}
                  className={`rounded-full px-4 py-2 text-xs ${placement === p ? "bg-bronze text-obsidian" : "border border-neutral-400 text-neutral-800 dark:border-neutral-800 dark:text-neutral-200"}`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Size selector */}
          <label className="block text-xs uppercase tracking-editorial text-neutral-700 dark:text-neutral-300">
             Size · {size} cm
            <input
              type="range"
              min="2"
              max="35"
              value={size}
              onChange={(e) => setSize(+e.target.value)}
              className="mt-4 w-full accent-[#C5A880]"
            />
          </label>
        </div>
      )}

      {step === 2 && (
        <div>
          <p className="eyebrow">02 / Reference</p>
          <h2 className="display mt-1 text-4xl">Show us the energy.</h2>
          <label className="mt-8 grid min-h-52 cursor-pointer place-items-center border border-dashed border-neutral-400 text-center dark:border-neutral-800 bg-neutral-50 dark:bg-white/[.02]">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) {
                  setFile(f);
                  setFileUrl(URL.createObjectURL(f));
                }
              }}
            />
            {fileUrl ? (
              <Image
                src={fileUrl}
                alt="Reference preview"
                unoptimized
                width={192}
                height={192}
                className="h-48 max-w-full object-contain"
              />
            ) : (
              <span>
                <Upload className="mx-auto mb-3 text-bronze" />
                <span className="text-xs uppercase tracking-editorial text-neutral-900 dark:text-white">
                  Drop reference / tap to upload
                </span>
              </span>
            )}
          </label>
          <p className="mt-3 text-xs text-neutral-700 dark:text-neutral-300">
            Your image stays private and helps our artist prepare a more useful
            consultation.
          </p>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-6">
          <div>
            <p className="eyebrow">03 / Schedule</p>
            <h2 className="display mt-1 text-4xl">Make it official.</h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {fields("name")}
            {fields("phone", "tel")}
            {fields("date", "date")}
          </div>
          <div className="border-l-2 border-bronze bg-bronze/10 p-4 text-sm leading-6 text-neutral-700 dark:text-neutral-300">
             A <strong>{STUDIO_CONFIG.depositRequirement} deposit</strong>{" "}
            confirms your appointment and is applied to your final session cost.
            We'll confirm availability before requesting payment.
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              className="button-gold"
              onClick={async () => {
                if (
                  file &&
                  navigator.share &&
                  navigator.canShare?.({ files: [file] })
                ) {
                  try {
                    await navigator.share({
                      title: "Trabowl Tattoo Appointment",
                      text: message,
                      files: [file],
                    });
                    return;
                  } catch (error) {
                    console.error("Web Share failed", error);
                  }
                }
                window.open(whatsappUrl, "_blank", "noreferrer");
              }}
            >
              WhatsApp direct
            </button>
            <a
              className="button-ghost"
              target="_blank"
              rel="noreferrer noopener"
              href={STUDIO_CONFIG.instagramLink}
            >
              Instagram DM
            </a>
          </div>
        </div>
      )}

      <div className="mt-10 flex justify-between border-t border-white/10 pt-5">
        {step > 1 ? (
          <button
            onClick={() => setStep(step - 1)}
            className="button-ghost py-2"
          >
            <ChevronLeft size={15} /> Back
          </button>
        ) : (
          <span />
        )}
        {step < 3 && (
          <button
            onClick={() => setStep(step + 1)}
            className="button-gold py-2"
          >
            Continue <ChevronRight size={15} />
          </button>
        )}
      </div>
    </div>
  );
}
