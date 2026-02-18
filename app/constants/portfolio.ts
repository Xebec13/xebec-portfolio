export type Language = "en" | "pl";

export const GLOBAL = {
  name: "Dawid Hoesen",
  role: "Interactive Developer",
  email: "dhoesen@gmail.com",
  socials: {
    github: "https://github.com/Xebec13",
    linkedin: "https://www.linkedin.com/in/david-hoesen-054257308/",
  },
  navLinks: [
    { href: "#home", key: "home" },
    { href: "#works", key: "works" },
    { href: "#about", key: "about" },
    { href: "#footer", key: "footer" },
  ]
} as const;

export interface DictionarySchema {
  nav: {
    home: string;
    works: string;
    about: string;
    footer: string;
  };
  hero: {
    bio: string;
  };
  projects: {
    headerProject: string;
    headerTech: string;
    headerDate: string;
  };
  footer: {
    ctaTitle: string;
    ctaSubtitle: string;
    btn: string;
    status: string;
    copyright: string;
    designedBy: string;
    links: {
      github: string;
      linkedin: string;
    };
  };
  form: {
    title: string;
    namePlaceholder: string;
    emailPlaceholder: string;
    msgPlaceholder: string;
    btnSend: string;
    btnSending: string;
    successTitle: string;
    successMsg: string;
    errorMsg: string;
  };
}

const navData: Record<Language, DictionarySchema["nav"]> = {
  en: { home: "Home", works: "Projects", about: "About", footer: "Contact" },
  pl: { home: "Start", works: "Projekty", about: "O mnie", footer: "Kontakt" },
};

const heroData: Record<Language, DictionarySchema["hero"]> = {
  en: { bio: "Hello, I’m passionate about creating clean, responsive, and visually sharp websites. \nLet’s create!" },
  pl: { bio: "Cześć! Projektuję strony minimalistyczne, responsywne i wizualnie dopracowane. \nZróbmy coś razem!" },
};

const projectsData: Record<Language, DictionarySchema["projects"]> = {
  en: { headerProject: "Projects", headerTech: "Tech", headerDate: "Date" },
  pl: { headerProject: "Projekty", headerTech: "Tech", headerDate: "Data" },
};

const footerData: Record<Language, DictionarySchema["footer"]> = {
  en: {
    ctaTitle: "Curious about what we can create together?",
    ctaSubtitle: "Let’s bring something extraordinary to life!",
    btn: "Get in Touch",
    status: "Available For Work",
    copyright: "All Rights Reserved",
    designedBy: "Designed & Built by Xebec13",
    links: { github: "Github", linkedin: "Linkedin" },
  },
  pl: {
    ctaTitle: "Ciekawi Cię, co możemy razem zbudować?", 
    ctaSubtitle: "Rozwińmy Twój pomysł w coś ponadprzeciętnego!",
    btn: "Porozmawiajmy",
    status: "Gotowy do współpracy",
    copyright: "Wszelkie prawa zastrzeżone",
    designedBy: "Projekt i wykonanie: Xebec13",
    links: { github: "Github", linkedin: "Linkedin" },
  },
};

const formData: Record<Language, DictionarySchema["form"]> = {
  en: {
    title: "Shoot Request",
    namePlaceholder: "Your Name",
    emailPlaceholder: "Your Email",
    msgPlaceholder: "Tell me about your project...",
    btnSend: "Send",
    btnSending: "Sending...",
    successTitle: "Message Sent!",
    successMsg: "Thank you for reaching out. I'll get back to you shortly.",
    errorMsg: "Something went wrong. Please try again later.",
  },
  pl: {
    title: "ROZPOCZNIJ PROJEKT",
    namePlaceholder: "Jak się nazywasz?",
    emailPlaceholder: "Podaj swój e-mail",
    msgPlaceholder: "Opowiedz mi o swoim projekcie...",
    btnSend: "Wyślij",
    btnSending: "Wysyłanie...",
    successTitle: "Wiadomość Wysłana!",
    successMsg: "Dziękuję za kontakt. Odpiszę najszybciej jak to możliwe.",
    errorMsg: "Coś poszło nie tak. Spróbuj ponownie później.",
  },
};

export const DICTIONARY: Record<Language, DictionarySchema> = {
  en: {
    nav: navData.en,
    hero: heroData.en,
    projects: projectsData.en,
    footer: footerData.en,
    form: formData.en,
  },
  pl: {
    nav: navData.pl,
    hero: heroData.pl,
    projects: projectsData.pl,
    footer: footerData.pl,
    form: formData.pl,
  },
};