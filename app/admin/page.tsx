// app/admin/page.tsx
import Link from "next/link";

export default function AdminDashboardHub() {
  // We can add more modular dashboard cells here later (e.g., Bookings, Settings)
  const administrationModules = [
    {
      title: "Portfolio Manager",
      description:
        "Upload new tattoo designs, organize by style, or curate the active showroom grid canvas.",
      href: "/admin/portfolio",
      actionText: "Manage Gallery →",
    },
  ];

  return (
    <main className="min-h-screen bg-[#FBF9F6] dark:bg-[#0B0B0B] text-neutral-900 dark:text-neutral-100 py-20 px-4 md:px-8 transition-colors">
      <div className="max-w-4xl mx-auto">
        {/* Hub Header */}
        <div className="border-b border-neutral-200 dark:border-neutral-900 pb-6 mb-12">
          <span className="text-[10px] font-bold tracking-widest text-[#A47E4B] dark:text-[#C5A880] uppercase block mb-2">
            Trabowl Tattoo Haus
          </span>
          <h1 className="text-4xl font-serif tracking-tight">
            Studio Control Center
          </h1>
          <p className="text-sm text-neutral-500 mt-2">
            Welcome to your administrative command deck. Select a module below
            to modify live application records.
          </p>
        </div>

        {/* Dashboard Navigation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {administrationModules.map((mod) => (
            <div
              key={mod.href}
              className="bg-white dark:bg-[#121212] p-6 rounded-3xl border border-neutral-200 dark:border-neutral-900 shadow-sm hover:shadow-md transition flex flex-col justify-between"
            >
              <div>
                <h2 className="text-xl font-serif text-neutral-900 dark:text-neutral-50 mb-2">
                  {mod.title}
                </h2>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed mb-6">
                  {mod.description}
                </p>
              </div>

              <Link
                href={mod.href}
                className="inline-block text-center w-full py-3 text-xs font-bold uppercase tracking-wider bg-neutral-100 dark:bg-neutral-800 hover:bg-[#A47E4B] dark:hover:bg-[#A47E4B] hover:text-white dark:hover:text-white text-neutral-800 dark:text-neutral-200 rounded-xl transition"
              >
                {mod.actionText}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
