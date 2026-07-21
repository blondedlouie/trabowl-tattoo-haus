import { studioConfig } from "@/lib/config";
export const InstagramPreview = () => (
  <div className="grid gap-4 md:grid-cols-3">
    <div className="glass rounded-md p-4 text-neutral-900 dark:text-white">Followers: 1.3K+</div>
    <div className="glass rounded-md p-4 text-neutral-900 dark:text-white">Instagram: {studioConfig.instagram}</div>
    <div className="glass rounded-md p-4 text-neutral-900 dark:text-white">TikTok-ready reel drops weekly</div>
  </div>
);
