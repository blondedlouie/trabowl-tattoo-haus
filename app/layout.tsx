import "./globals.css";
import { PageShell } from "@/components/page-shell";
import { ThemeProvider } from "./providers"; // Import the provider we created

export const metadata = {
  title: "Trabowl Tattoo Studio | Nairobi",
  description:
    "A private Nairobi studio for intentional tattoos and precision piercings. Custom designs, cover-ups, and piercings crafted with surgical precision.",
  keywords: [
    "tattoo",
    "piercing",
    "Nairobi",
    "Kenya",
    "custom tattoo",
    "cover-up",
    "fine line",
    "blackwork",
  ],
  openGraph: {
    title: "Trabowl Tattoo Studio | Nairobi",
    description:
      "A private Nairobi studio for intentional tattoos and precision piercings.",
    type: "website",
  },
  icons: {
    icon: "/brand/trabowl-logo.png",
    shortcut: "/brand/trabowl-logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    /* suppressHydrationWarning prevents console warnings when next-themes injects the dark class */
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <PageShell>{children}</PageShell>
        </ThemeProvider>
      </body>
    </html>
  );
}
