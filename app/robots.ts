import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/private/', // Tu możesz wpisać foldery, których nie chcesz w Google
    },
    sitemap: 'https://dhoesen.pl/sitemap.xml',
  };
}