import { defineAstroPaperConfig } from "./src/types/config";

export default defineAstroPaperConfig({
  site: {
  url: "https://graildaily.com", // nanti sesuaikan jika domain sudah aktif
  title: "GrailDaily",
  description:
    "Discover the world's greatest mysteries, ancient civilizations, lost history, archaeology, science, and unexplained phenomena through well-researched articles.",
  author: "GrailDaily",
  profile: "https://graildaily.com",
  ogImage: "default-og.jpg",
  lang: "en",
  timezone: "Asia/Jakarta",
  dir: "ltr",
},
  posts: {
    perPage: 4,
    perIndex: 4,
    scheduledPostMargin: 15 * 60 * 1000,
  },
  features: {
    lightAndDarkMode: true,
    dynamicOgImage: true,
    showArchives: true,
    showBackButton: true,
    editPost: {
      enabled: false,
      url: "https://github.com/satnaing/astro-paper/edit/main/",
    },
    search: "pagefind",
  },
  socials: [],
  shareLinks: [
    { name: "whatsapp", url: "https://wa.me/?text=" },
    { name: "facebook", url: "https://www.facebook.com/sharer.php?u=" },
    { name: "x",        url: "https://x.com/intent/post?url=" },
    { name: "telegram", url: "https://t.me/share/url?url=" },
    { name: "pinterest", url: "https://pinterest.com/pin/create/button/?url=" },
    { name: "mail",     url: "mailto:?subject=See%20this%20post&body=" },
  ],
});