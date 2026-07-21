"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase";

export default function BookingWizard() {
  const [serviceType, setServiceType] = useState<"tattoo" | "piercing">(
    "tattoo",
  );
  const [placement, setPlacement] = useState("");
  const [size, setSize] = useState(10);

  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  // Calendar State Management
  const [currentDate, setCurrentDate] = useState(new Date(2026, 6, 19)); // Defaults to July 2026 based on your UI
  const [selectedDateStr, setSelectedDateStr] = useState("");

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1),
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1),
    );
  };

  // Generate complete calendar grid array (including padding days from prev/next months)
  const generateCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDayIndex = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();
    const prevTotalDays = new Date(year, month, 0).getDate();

    const days = [];

    // Padding from previous month
    for (let i = firstDayIndex - 1; i >= 0; i--) {
      days.push({
        day: prevTotalDays - i,
        isCurrentMonth: false,
        monthOffset: -1,
      });
    }

    // Days of current month
    for (let i = 1; i <= totalDays; i++) {
      days.push({ day: i, isCurrentMonth: true, monthOffset: 0 });
    }

    // Padding for next month to fill complete rows
    const totalSlots = 42;
    const nextDaysNeeded = totalSlots - days.length;
    for (let i = 1; i <= nextDaysNeeded; i++) {
      days.push({ day: i, isCurrentMonth: false, monthOffset: 1 });
    }

    return days;
  };

  const handleDateSelect = (dayObj: {
    day: number;
    isCurrentMonth: boolean;
    monthOffset: number;
  }) => {
    const targetDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + dayObj.monthOffset,
      dayObj.day,
    );
    // Format clearly for the final WhatsApp output
    const formatted = targetDate.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    setSelectedDateStr(formatted);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const supabase = createClient();
      if (!supabase || !supabase.storage) {
        throw new Error("Supabase client failed to initialize properly.");
      }

      const fileExt = file.name.split(".").pop();
      const fileName = `booking-${Date.now()}.${fileExt}`;
      const filePath = `references/${fileName}`;

      const { data, error } = await supabase.storage
        .from("portfolio-gallery")
        .upload(filePath, file);

      if (error) throw error;

      const {
        data: { publicUrl },
      } = supabase.storage.from("portfolio-gallery").getPublicUrl(filePath);

      setImageUrl(publicUrl);
    } catch (err) {
      console.error("Reference upload failed:", err);
      alert(
        "Failed to upload reference image. Please verify your connection setup.",
      );
    } finally {
      setIsUploading(false);
    }
  };

  const handleWhatsAppSubmit = () => {
    if (!name || !phone || !selectedDateStr) {
      alert(
        "Please complete all personal scheduling and date selections first.",
      );
      return;
    }

    const studioPhone = "254796062689";

    const messageText = `NEW BOOKING REQUEST
-----------------------------
Client Name: ${name}
Phone: ${phone}
Preferred Date: ${selectedDateStr}

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
    <div className="max-w-xl mx-auto p-6 space-y-8 bg-transparent text-neutral-900 dark:text-white min-h-screen">
      {/* --- STEP 01 / CONCEPT UI --- */}
      <div className="border border-neutral-300 dark:border-neutral-800 bg-neutral-100/60 dark:bg-neutral-900/30 p-6 rounded-[2rem] space-y-4 shadow-sm">
        <p className="text-[0.6rem] tracking-[0.3em] text-[#C5A880] font-semibold">
          01 / CONCEPT
        </p>
        <h2 className="text-xl font-bold tracking-tight text-neutral-900 dark:text-white">
          What are we making?
        </h2>

        <div className="flex gap-3 bg-neutral-200 dark:bg-neutral-900 p-1.5 rounded-2xl">
          <button
            type="button"
            onClick={() => setServiceType("tattoo")}
            className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider rounded-xl transition-all ${
              serviceType === "tattoo"
                ? "bg-[#C5A880] text-black shadow-sm"
                : "text-neutral-600 dark:text-neutral-500 hover:text-neutral-900 dark:hover:text-white"
            }`}
          >
            Tattoo Studio
          </button>
          <button
            type="button"
            onClick={() => setServiceType("piercing")}
            className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider rounded-xl transition-all ${
              serviceType === "piercing"
                ? "bg-[#C5A880] text-black shadow-sm"
                : "text-neutral-600 dark:text-neutral-500 hover:text-neutral-900 dark:hover:text-white"
            }`}
          >
            Body Piercing
          </button>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-neutral-600 dark:text-neutral-500 uppercase tracking-wider">
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
                className={`px-4 py-2 text-xs rounded-full border transition-all ${
                  placement === loc
                    ? "border-[#C5A880] bg-[#C5A880]/10 text-[#C5A880]"
                    : "border-neutral-300 dark:border-neutral-800 text-neutral-700 dark:text-neutral-400 hover:border-neutral-400 dark:hover:border-neutral-700"
                }`}
              >
                {loc}
              </button>
            ))}
          </div>
        </div>

        {serviceType === "tattoo" && (
          <div className="space-y-2 pt-2">
            <div className="flex justify-between text-xs font-bold text-neutral-600 dark:text-neutral-500 uppercase tracking-wider">
              <span>Size Metric</span>
              <span className="text-[#C5A880]">{size} CM</span>
            </div>
            <input
              type="range"
              min="5"
              max="30"
              value={size}
              onChange={(e) => setSize(Number(e.target.value))}
              className="w-full h-1 bg-neutral-300 dark:bg-neutral-800 rounded-lg appearance-none accent-[#C5A880]"
            />
          </div>
        )}
      </div>

      {/* --- STEP 02 / REFERENCE UI --- */}
      <div className="border border-neutral-300 dark:border-neutral-800 bg-neutral-100/60 dark:bg-neutral-900/30 p-6 rounded-[2rem] space-y-4 shadow-sm">
        <p className="text-[0.6rem] tracking-[0.3em] text-[#C5A880] font-semibold">
          02 / REFERENCE
        </p>
        <h2 className="text-xl font-bold tracking-tight text-neutral-900 dark:text-white">
          Show us the energy.
        </h2>

        <label className="group flex flex-col items-center justify-center border-2 border-dashed border-neutral-300 dark:border-neutral-800 rounded-[2rem] p-8 text-center cursor-pointer hover:border-[#C5A880] transition-colors relative overflow-hidden min-h-[160px]">
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
            disabled={isUploading}
          />

          {imageUrl ? (
            <div className="space-y-2">
              <p className="text-xs font-semibold text-green-600 dark:text-green-500">
                Reference Uploaded and Linked
              </p>
              <p className="text-[10px] text-neutral-600 dark:text-neutral-500 truncate max-w-[250px]">
                {imageUrl}
              </p>
            </div>
          ) : isUploading ? (
            <p className="text-xs font-medium text-neutral-600 dark:text-neutral-400 animate-pulse">
              Syncing to Studio Vault...
            </p>
          ) : (
            <div className="space-y-2">
              <svg
                className="w-5 h-5 mx-auto text-neutral-500 group-hover:text-[#C5A880] transition-colors"
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
              <p className="text-xs font-bold tracking-wide uppercase text-neutral-600 dark:text-neutral-400">
                Drop Reference / Tap to Upload
              </p>
            </div>
          )}
        </label>
      </div>

      {/* --- STEP 03 / TRABOWL CUSTOM INLINE CALENDAR UI --- */}
      <div className="border border-neutral-300 dark:border-neutral-800 bg-neutral-100/60 dark:bg-neutral-900/30 p-6 rounded-[2rem] space-y-6 shadow-sm">
        <div>
          <p className="text-[0.6rem] tracking-[0.3em] text-[#C5A880] font-semibold">
            03 / DATE SELECTION
          </p>
          <h2 className="text-xl font-bold tracking-tight mt-1 text-neutral-900 dark:text-white">
            Choose your preferred day
          </h2>
        </div>

        {/* Calendar Card Container */}
        <div className="border border-neutral-300 dark:border-neutral-800 rounded-[1.5rem] p-5 bg-neutral-200/50 dark:bg-neutral-950/50">
          {/* Header Controls */}
          <div className="flex items-center justify-between mb-6 px-1">
            <button
              type="button"
              onClick={handlePrevMonth}
              className="p-2 border border-neutral-300 dark:border-neutral-800 rounded-xl hover:border-[#C5A880] text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <h3 className="text-sm font-bold tracking-widest uppercase text-neutral-800 dark:text-neutral-200">
              {months[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h3>

            <button
              type="button"
              onClick={handleNextMonth}
              className="p-2 border border-neutral-300 dark:border-neutral-800 rounded-xl hover:border-[#C5A880] text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>

          {/* Weekday Names Header */}
          <div className="grid grid-cols-7 gap-y-2 text-center text-[10px] font-bold tracking-wider text-neutral-500 uppercase mb-3">
            <span>Su</span>
            <span>Mo</span>
            <span>Tu</span>
            <span>We</span>
            <span>Th</span>
            <span>Fr</span>
            <span>Sa</span>
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-x-1 gap-y-1 text-center">
            {generateCalendarDays().map((dayObj, index) => {
              const checkDate = new Date(
                currentDate.getFullYear(),
                currentDate.getMonth() + dayObj.monthOffset,
                dayObj.day,
              );
              const isSelected =
                selectedDateStr ===
                checkDate.toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                });

              return (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleDateSelect(dayObj)}
                  className={`
                    py-2.5 text-xs font-semibold rounded-lg transition-all relative
                    ${
                      dayObj.isCurrentMonth
                        ? "text-neutral-800 dark:text-neutral-200"
                        : "text-neutral-400 dark:text-neutral-700"
                    }
                    ${
                      isSelected
                        ? "bg-[#C5A880] !text-black font-bold shadow-md"
                        : "hover:bg-neutral-200 dark:hover:bg-neutral-900"
                    }
                  `}
                >
                  {dayObj.day}
                </button>
              );
            })}
          </div>

          {/* Summary Indicator */}
          <div className="text-center pt-5 mt-4 border-t border-neutral-300 dark:border-neutral-900">
            <p className="text-[10px] tracking-wide text-neutral-600 dark:text-neutral-500 uppercase">
              {selectedDateStr
                ? `Selected: ${selectedDateStr}`
                : "All booking slots are standard studio hours."}
            </p>
          </div>
        </div>
      </div>

      {/* --- STEP 04 / CONTACT & SUBMIT UI --- */}
      <div className="border border-neutral-300 dark:border-neutral-800 bg-neutral-100/60 dark:bg-neutral-900/30 p-6 rounded-[2rem] space-y-4 shadow-sm">
        <p className="text-[0.6rem] tracking-[0.3em] text-[#C5A880] font-semibold">
          04 / SCHEDULE
        </p>
        <h2 className="text-xl font-bold tracking-tight text-neutral-900 dark:text-white">
          Make it official.
        </h2>

        <div className="space-y-3">
          <input
            type="text"
            placeholder="NAME"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-800 rounded-xl text-xs bg-transparent focus:outline-none focus:border-[#C5A880] text-neutral-900 dark:text-white placeholder:text-neutral-500"
          />
          <input
            type="tel"
            placeholder="PHONE"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-800 rounded-xl text-xs bg-transparent focus:outline-none focus:border-[#C5A880] text-neutral-900 dark:text-white placeholder:text-neutral-500"
          />
        </div>

        <button
          type="button"
          onClick={handleWhatsAppSubmit}
          className="w-full py-4 bg-[#C5A880] hover:bg-[#B3956B] text-black text-xs font-bold tracking-widest uppercase rounded-xl transition-colors shadow-md mt-4"
        >
          WhatsApp Direct
        </button>
      </div>
    </div>
  );
}
