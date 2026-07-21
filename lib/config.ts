// Move this object to a Supabase `studio_settings` row when the production project is connected.
export const STUDIO_CONFIG = {
  brandName: "Trabowl Tattoo Studio",
  instagramHandle: "@trabowl_tattoo.haus",
  instagramLink: "https://instagram.com/trabowl_tattoo.haus",
  contactPhone: "0796062689",
  secondaryPhone: "0114341570",
  contactEmail: "trabowltattoohaus@gmail.com",
  depositRequirement: "30%",
  businessHours: {
    weekdays: "10:00 AM - 7:00 PM",
    weekends: "11:00 AM - 6:00 PM",
  },
  pricingPlaceholders: {
    minimumCharge: "KES 4,000",
    piercingBase: "KES 1,000",
  },
  services: [
    { id: "custom", name: "Custom Tattoos", basePrice: "KES 5,000" },
    { id: "coverup", name: "Cover-Up Tattoos", basePrice: "KES 6,000" },
    { id: "flash", name: "Flash Tattoos", basePrice: "KES 4,000" },
    { id: "piercing", name: "Piercings", basePrice: "KES 1,000" },
  ],
  // Legacy support - will be phased out
  name: "Trabowl Tattoo Haus",
  instagram: "@trabowl_tattoo.haus",
  instagramUrl: "https://instagram.com/trabowl_tattoo.haus",
  phone: "0796062689 / 0114341570",
  whatsapp: "+254796062689",
  email: "trabowltattoohaus@gmail.com",
  address: "Nairobi, Kenya · exact studio location sent with confirmed bookings",
  hours: "Weekdays 10:00 AM - 7:00 PM · Weekends 11:00 AM - 6:00 PM",
  businessHoursText: "Weekdays 10:00 AM - 7:00 PM · Weekends 11:00 AM - 6:00 PM",
  deposit: "30%",
  minimum: "KES 4,000",
  currency: "KES",
} as const;

export const studioConfig = STUDIO_CONFIG;
