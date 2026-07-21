export const navItems = [["Home", "/"], ["Portfolio", "/portfolio"], ["Services", "/services"], ["Book", "/book"], ["About", "/about"], ["Aftercare", "/aftercare"], ["FAQ", "/faq"], ["Contact", "/contact"]] as const;
export const styles = ["Fine line", "Blackwork", "Illustrative", "Minimal", "Cover-up", "Piercing"];

export const gallery: Array<{ id: string; title: string; image: string; tag: string }> = [
  
];

export const testimonials = [
  { 
    quote: "Trabowl transformed my vision into ink I wear with pride every single day. The studio is immaculate and the artistry is unmatched in Nairobi.", 
    name: "Amara K.", 
    handle: "@amara.ke",
    service: "Custom fine line",
    rating: 5 
  },
  { 
    quote: "Got my sleeve done over two sessions. The attention to detail and hygiene standards are on another level. Best tattoo experience I've ever had.", 
    name: "David M.", 
    handle: "@dave_nbo",
    service: "Blackwork sleeve",
    rating: 5 
  },
  { 
    quote: "From consultation to aftercare, the team held my hand throughout. My first tattoo and I couldn't be more obsessed with the result.", 
    name: "Zara O.", 
    handle: "@zaraochieng",
    service: "Fine line tattoo",
    rating: 5 
  },
  { 
    quote: "The detail is unreal. I felt listened to from the first sketch.", 
    name: "Amara K.", 
    service: "Custom fine line" 
  },
  { 
    quote: "A calm, immaculate studio and an artist who gets the brief.", 
    name: "Brian M.", 
    service: "Blackwork sleeve" 
  },
  { 
    quote: "My piercing healed beautifully. The aftercare was actually useful.", 
    name: "Wanjiku N.", 
    service: "Curated piercing" 
  }
];

export const faqs = [
  {
    category: 'Appointments',
    items: [
      {
        q: 'Do you accept walk-ins?',
        a: "We accept walk-ins for flash tattoos and piercings subject to artist availability. For custom work, we strongly recommend booking in advance — our schedule fills 2–4 weeks ahead. Walk-in slots open occasionally on our Instagram stories."
      },
      {
        q: 'How far in advance should I book?',
        a: "For custom designs, book 2–4 weeks ahead. For cover-ups, allow 3–6 weeks — the complexity requires extended consultation. Flash and piercings can sometimes be done same-week."
      },
    ]
  },
  {
    category: 'Deposits & Payment',
    items: [
      {
        q: 'What is the 30% deposit policy?',
        a: "All bookings require a 30% non-refundable deposit to secure your slot. This is deducted from your final price. The deposit is forfeited if you cancel within 48 hours of your appointment or do not show up."
      },
      {
        q: 'What payment methods do you accept?',
        a: "M-Pesa, bank transfer (KCB and Equity), and cash. We do not accept card payments at this time. The deposit must be cleared before your appointment is confirmed."
      },
      {
        q: 'Can I reschedule?',
        a: "Yes — rescheduling is free with more than 48 hours notice. Your deposit transfers to the new date. Multiple reschedules within 30 days will forfeit the deposit."
      },
    ]
  },
  {
    category: 'The Experience',
    items: [
      {
        q: 'How painful is it?',
        a: "Pain is subjective and depends on placement, not just individual tolerance. Ribs, spine, feet, and inner arm tend to be most intense. Outer arm, calf, and thigh are generally more comfortable. Our artists will pace sessions around your comfort."
      },
      {
        q: 'How long will my session take?',
        a: "A small tattoo (under 10cm) typically takes 1–2 hours. A half sleeve can run 4–6 hours across multiple sessions. We recommend splitting sessions over 4 hours to maintain ink quality and your comfort."
      },
      {
        q: 'Can I bring a friend?',
        a: "Yes — one support person is welcome. We keep the studio calm and focused, so large groups aren't practical during the session itself."
      },
    ]
  },
  {
    category: 'Requirements',
    items: [
      {
        q: 'What is your age policy?',
        a: "All clients must be 18 or older. We do not tattoo minors under any circumstances, including with parental consent. Valid government-issued photo ID is required for first-time clients."
      },
      {
        q: 'Are there health conditions that prevent tattooing?',
        a: "We require disclosure of blood disorders, skin conditions, recent medical procedures, pregnancy, and immunosuppressant medications. We reserve the right to decline any session where we assess it could risk your health."
      },
    ]
  },
  {
    category: 'Safety & Sanitation',
    items: [
      {
        q: 'How do you ensure safety in the studio?',
        a: "We follow strict hygiene protocols including sterilizing all equipment between clients, using disposable gloves for piercings, and maintaining a clean workspace. Our artists wear fresh, single-use gloves for every tattoo session."
      },
      {
        q: 'Do you offer aftercare instructions?',
        a: "Yes — each client receives comprehensive written aftercare instructions tailored to their specific tattoo. We also provide video tutorials and are available for follow-up questions during the healing process."
      },
    ]
  },
];

export const aftercareTimeline = [
  {
    label: 'Day 1–3',
    title: 'The Raw Phase',
    desc: 'Your tattoo is an open wound. Keep it wrapped with the original bandage for 2–4 hours. After removal, gently wash with fragrance-free soap, pat dry, and apply a thin layer of unscented moisturiser or Bepanthen.',
  },
  {
    label: 'Days 4–7',
    title: 'The Peel',
    desc: "Flaking and peeling begins. This is normal — your skin is shedding the top layer. Do NOT pick or scratch. Continue moisturising 2–3× per day. Avoid direct sunlight and swimming.",
  },
  {
    label: 'Week 2',
    title: 'Surface Healed',
    desc: "The top layer is healed but deeper layers are still recovering. Tattoo may appear dull or cloudy — this is normal and will clear. Continue sunscreen when outdoors.",
  },
  {
    label: 'Month 1',
    title: 'Fully Settled',
    desc: 'By week 4, your tattoo should look bright and settled. If you notice any patchiness or need a touch-up, contact us — all Trabowl tattoos include one free touch-up within 3 months.',
  },
];

export const aftercareDos = [
  'Wash gently with fragrance-free soap 2× daily',
  'Apply thin layer of Bepanthen or unscented lotion',
  'Keep out of direct sun for at least 4 weeks',
  'Wear loose, breathable clothing over the tattoo',
  'Stay hydrated and maintain good nutrition',
  'Contact us immediately if you notice infection signs',
];

export const aftercareDonts = [
  "Don't pick, scratch, or peel flaking skin",
  "Don't submerge in pools, ocean, or baths for 3 weeks",
  "Don't apply sunscreen until fully healed (then always use SPF 50+)",
  "Don't shave over the tattooed area while healing",
  "Don't wear tight clothing that rubs the tattoo",
  "Don't workout intensely for the first 48 hours",
];

export const aftercareFaqs = [
  {
    q: 'How does Nairobi\'s climate affect healing?',
    a: "Nairobi's altitude means intense UV even on cloudy days. We recommend SPF 50+ as standard practice once healed. The relatively low humidity means extra moisturisation is key — keep the tattoo from drying out.",
  },
  {
    q: 'My tattoo is itchy — is this normal?',
    a: "Yes, itching during the peel phase (days 4–10) is completely normal and means it's healing. Resist scratching — gently slap the area instead. Unscented lotion provides relief.",
  },
  {
    q: 'When can I go to the gym?',
    a: 'Light activity is fine after 48 hours. Avoid heavy sweat or stretching over the tattooed area for 7–10 days. Always shower immediately after exercise.',
  },
];