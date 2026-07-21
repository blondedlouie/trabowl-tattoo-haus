import { styles } from "@/lib/data";
export const TrendingStyles = () => <div className="flex flex-wrap gap-3">{styles.map((s) => <span key={s} className="rounded-full border border-white/20 px-4 py-2 text-sm">{s}</span>)}</div>;
