export const siteConfig = {
  name: "Author Website",
  description: "Official website for [Author Name]",
  url: process.env.NEXT_PUBLIC_SITE_URL,
  ogImage: "https://your-domain.com/og.jpg",
  links: {
    twitter: "https://twitter.com/author",
    github: "https://github.com/author",
  },
} as const;
