"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase";

export default function BookingWizard() {
  // Step 1: Setup Service Type and Core Concepts State
  const [serviceType, setServiceType] = useState<"tattoo" | "piercing">(
    "tattoo",
  );
  const [placement, setPlacement] = useState("");
  const [size, setSize] = useState(10);

  // Step 2: Reference Image States
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  // Step 3: Schedule & Client States
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");

  // Handler to instantly host reference images on user upload
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const supabase = createClient();

      const fileExt = file.name.split(".").pop();
      const fileName = `booking-${Date.now()}.${fileExt}`;
      const filePath = `references/${fileName}`;

      const { data, error } = await supabase.storage
        .from("portfolio")
        .upload(filePath, file);

      if (error) throw error;

      const {
        data: { publicUrl },
      } = supabase.storage.from("portfolio").getPublicUrl(filePath);

      setImageUrl(publicUrl);
    } catch (err) {
      console.error("Reference upload failed:", err);
      alert("Failed to upload reference image. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  // Step 4: Compile and build the Deep Link trigger without emojis
  const handleWhatsAppSubmit = () => {
    if (!name || !phone || !date) {
      alert("Please complete all personal scheduling fields first.");
      return;
    }

    const studioPhone = "254700000000"; // Replace with your actual WhatsApp line format

    // Clean text layout for the message payload
    const messageText = `NEW BOOKING REQUEST
-----------------------------
Client Name: ${name}
Phone: ${phone}
Preferred Date: ${date}

Service Type: ${serviceType.toUpperCase()}
Placement Area: ${placement || "Not Specified"}
Approx. Size: ${serviceType === "tattoo" ? `${size} cm` : "Standard"}

Reference Image Design Link: 
${imageUrl ? imageUrl : "None provided"}
-----------------------------
Sent from Trabowl Tattoo Haus Workspace`;

    const encodedMessage = encodeURIComponent(messageText);
    const whatsappUrl = `https://wa.me/${studioPhone}?text=${encodedMessage}`;

    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="max-w-xl mx-auto p-6 space-y-8">
      {/* --- STEP 01 / CONCEPT UI --- */}
      <div className="border p-6 rounded-[2rem] space-y-4">
        <p className="text-[0.6rem] tracking-[0.3em] text-[#C5A880] font-semibold">
          01 / CONCEPT
        </p>
        <h2 className="text-xl font-bold">What are we making?</h2>

        {/* Tattoo vs Piercing Toggle */}
        <div className="flex gap-3 bg-neutral-100 p-1.5 rounded-2xl dark:bg-neutral-900">
          <button
            type="button"
            onClick={() => setServiceType("tattoo")}
            className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider rounded-xl transition-all ${serviceType === "tattoo" ? "bg-[#C5A880] text-white shadow-sm" : "text-neutral-500"}`}
          >
            Tattoo Studio
          </button>
          <button
            type="button"
            onClick={() => setServiceType("piercing")}
            className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider rounded-xl transition-all ${serviceType === "piercing" ? "bg-[#C5A880] text-white shadow-sm" : "text-neutral-500"}`}
          >
            Body Piercing
          </button>
        </div>

        {/* Dynamic Placement Selection Grid */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
            Placement Location
          </label>
          <div className="flex flex-wrap gap-2">
            {(serviceType === "tattoo"
              ? ["Arm", "Forearm", "Chest", "Leg", "Neck", "Ribcage"]
              : ["Earlobe", "Helix", "Nose", "Septum", "Navel", "Tongue"]
            ).map((loc) => (
              <button
                key={loc}
                type="button"
                onClick={() => setPlacement(loc)}
                className={`px-4 py-2 text-xs rounded-full border transition-all ${placement === loc ? "border-[#C5A880] bg-[#C5A880]/10 text-[#C5A880]" : "border-neutral-200 dark:border-neutral-800"}`}
              >
                {loc}
              </button>
            ))}
          </div>
        </div>

        {/* Size Slider Metric Layout */}
        {serviceType === "tattoo" && (
          <div className="space-y-2 pt-2">
            <div className="flex justify-between text-xs font-bold text-neutral-400 uppercase tracking-wider">
              <span>Size Metric</span>
              <span className="text-[#C5A880]">{size} CM</span>
            </div>
            <input
              type="range"
              min="5"
              max="30"
              value={size}
              onChange={(e) => setSize(Number(e.target.value))}
              className="w-full h-1 bg-neutral-200 dark:bg-neutral-800 rounded-lg appearance-none accent-[#C5A880]"
            />
          </div>
        )}
      </div>

      {/* --- STEP 02 / REFERENCE UI --- */}
      <div className="border p-6 rounded-[2rem] space-y-4">
        <p className="text-[0.6rem] tracking-[0.3em] text-[#C5A880] font-semibold">
          02 / REFERENCE
        </p>
        <h2 className="text-xl font-bold">Show us the energy.</h2>

        <label className="group flex flex-col items-center justify-center border-2 border-dashed border-neutral-300 dark:border-neutral-800 rounded-[2rem] p-8 text-center cursor-pointer hover:border-[#C5A880] transition-colors relative overflow-hidden min-h-[200px]">
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
            disabled={isUploading}
          />

          {imageUrl ? (
            <div className="space-y-2">
              <p className="text-xs font-semibold text-green-600">
                Reference Uploaded and Linked
              </p>
              <p className="text-[10px] text-neutral-400 truncate max-w-[250px]">
                {imageUrl}
              </p>
            </div>
          ) : isUploading ? (
            <p className="text-xs font-medium text-neutral-500 animate-pulse">
              Syncing to Studio Vault...
            </p>
          ) : (
            <div className="space-y-2">
              {/* Replaced raw emoji icon with a clean SVG upload icon */}
              <svg
                className="w-6 h-6 mx-auto text-neutral-400 group-hover:text-[#C5A880] transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v1m-4-8l-4-4m0 0L8 8m4-4v12"
                />
              </svg>
              <p className="text-xs font-bold tracking-wide uppercase text-neutral-700 dark:text-neutral-300">
                Drop Reference / Tap to Upload
              </p>
            </div>
          )}
        </label>
      </div>

      {/* --- STEP 03 / SCHEDULE UI --- */}
      <div className="border p-6 rounded-[2rem] space-y-4">
        <p className="text-[0.6rem] tracking-[0.3em] text-[#C5A880] font-semibold">
          03 / SCHEDULE
        </p>
        <h2 className="text-xl font-bold">Make it official.</h2>

        <div className="space-y-3">
          <input
            type="text"
            placeholder="NAME"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 border rounded-xl text-xs bg-transparent focus:outline-none focus:border-[#C5A880]"
          />
          <input
            type="tel"
            placeholder="PHONE"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-4 py-3 border rounded-xl text-xs bg-transparent focus:outline-none focus:border-[#C5A880]"
          />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-4 py-3 border rounded-xl text-xs bg-transparent focus:outline-none focus:border-[#C5A880]"
          />
        </div>

        <button
          type="button"
          onClick={handleWhatsAppSubmit}
          className="w-full py-4 bg-[#C5A880] hover:bg-[#B3956B] text-white text-xs font-bold tracking-widest uppercase rounded-xl transition-colors shadow-md mt-4"
        >
          WhatsApp Direct
        </button>
      </div>
    </div>
  );
}
