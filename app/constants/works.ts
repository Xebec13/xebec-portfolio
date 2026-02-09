export type TechKey = 
  | "react" 
  | "nextjs" 
  | "html" 
  | "css" 
  | "js" 
  | "ts" 
  | "tailwind" 
  | "motion" 
  | "gsap";

export type Language = "pl" | "en";

interface LocalizedContent {
  review: string;
  techReview: string;
  keyWords: string[];
  keyAchi: string[];
}

export interface WorkProject {
  id: number;
  key: string;
  name: string;
  date: string;
  techStack: TechKey[];
  images: string[];
  href?: string;
  gitHref?: string;
  content: Record<Language, LocalizedContent>;
}

// Typ wynikowy dla komponentów (spłaszczony)
export interface Work extends Omit<WorkProject, 'content'>, LocalizedContent {}

export const WORKS_DATA: WorkProject[] = [
  {
    id: 1,
    key: "pck",
    name: "PCK",
    date: "2023",
    techStack: ["html", "tailwind", "js", "gsap"],
    images: ["/assets/pck1.png", "/assets/pck2.png", "/assets/pck3.png"],
    href: "https://pck-fundation.netlify.app",
    gitHref: "https://github.com/Xebec13/PCK-Zbiorka",
    content: {
      en: {
        review: "As the final project of my CodersLab course, I built my first end-to-end website — a responsive landing page for a local clothing charity using a premade UI. Over time, I refined it to enhance usability and structure, turning a learning exercise into a polished, functional experience.",
        techReview: "Originally built with vanilla HTML/CSS/JS, the project was refactored into a modern TailwindCSS architecture. I integrated GSAP to add purposeful micro-interactions guiding user attention. This project served as a hands-on exercise in responsive design, semantic HTML, and clean, maintainable code structure.",
        keyWords: ["Mockup", "Charity", "Donation", "Landing Page", "Contact Form"],
        keyAchi: [
          "refactored the code, creating a clean and maintainable TailwindCSS structure",
          "enhanced UX with GSAP-driven micro-interactions and improved visual hierarchy",
          "implemented a mobile-first approach, ensuring optimal usability across all devices"
        ]
      },
      pl: {
        review: "Projekt PCK był moim finałowym zadaniem w trakcie kursu CodersLab i pierwszą w pełni funkcjonalną stroną, którą zbudowałem end-to-end. Stworzyłem responsywny landing page dla lokalnej akcji charytatywnej zbierającej odzież, korzystając z gotowego UI. Z czasem udoskonaliłem projekt, poprawiając użyteczność i strukturę, przekształcając ćwiczenie edukacyjne w dopracowane, funkcjonalne doświadczenie.",
        techReview: "Projekt początkowo powstał w vanilla HTML/CSS/JS, a następnie został przebudowany w nowoczesnej architekturze TailwindCSS. Zintegrowałem GSAP, aby dodać przemyślane mikro-interakcje kierujące uwagą użytkownika. Projekt posłużył jako praktyczne ćwiczenie w tworzeniu responsywnych stron z semantycznym HTML i czytelną, łatwą w utrzymaniu strukturą kodu.",
        keyWords: ["Mockup", "Charytatywne", "Dotacje", "Landing Page", "Formularz"],
        keyAchi: [
          "zrobiłem refactoring kodu, tworząc czytelną i łatwą w utrzymaniu strukturę w TailwindCSS",
          "wzbogaciłem UX o mikro-interakcje sterowane przez GSAP i poprawiłem hierarchię wizualną",
          "wdrożyłem podejście mobile-first, zapewniając optymalne działanie na wszystkich urządzeniach"
        ]
      }
    }
  },
  {
    id: 2,
    key: "afal",
    name: "Afal-Logistics",
    date: "2024",
    techStack: ["html", "tailwind", "js", "gsap"],
    images: ["/assets/afal1.png", "/assets/afal2.png", "/assets/afal3.png"],
    href: "https://afal-logistics.netlify.app",
    gitHref: "https://github.com/Xebec13/Afal-Logistics",
    content: {
      en: {
        review: "To test a new client communication channel, Afal Logistics needed a clear, functional online presence. I delivered a lightweight MVP landing page that balances brand clarity, mobile-first usability, and expandability — allowing the company to experiment with digital outreach effectively.",
        techReview: "I utilized Tailwind for rapid styling and GSAP for subtle entrance animations. The focus was on performance and clarity — creating a digital business card that loads instantly. The code structure is modular, allowing for easy expansion.",
        keyWords: ["Commercial", "Logistics", "Distribution", "Chemicals", "Landing Page", "Contact Form"],
        keyAchi: [
          "implemented GSAP reveal animations to create a premium corporate feel",
          "designed a lightweight, responsive structure optimized for mobile users and smooth operation",
          "delivered a clean code base ready for future migration to a CMS"
        ]
      },
      pl: {
        review: "Aby przetestować nowy kanał komunikacji z klientami, Afal Logistics potrzebował przejrzystej i funkcjonalnej obecności w sieci. Stworzyłem lekką stronę MVP w formie landing page, która łączy czytelność marki, podejście mobile-first oraz modułową strukturę, pozwalając firmie efektywnie eksperymentować z cyfrowym kontaktem z klientami.",
        techReview: "W projekcie wykorzystałem Tailwind do szybkiego stylowania oraz GSAP do subtelnych animacji typu reveal. Skupiłem się na wydajności i czytelności — tworząc cyfrową wizytówkę, która ładuje się natychmiast. Struktura kodu jest modułowa, co pozwala na łatwe rozszerzenie strony, jeśli klient zdecyduje się odejść od statycznego modelu.",
        keyWords: ["Komercyjny", "Logistyka", "Dystrybucja", "Landing Page"],
        keyAchi: [
          "wdrożyłem animacje typu reveal przy użyciu GSAP, nadając stronie profesjonalny charakter",
          "zaprojektowałem lekką, responsywną strukturę zoptymalizowaną pod urządzenia mobilne",
          "dostarczyłem czysty, modułowy kod gotowy do przyszłej migracji na CMS"
        ]
      }
    }
  },
  {
    id: 3,
    key: "gpt3",
    name: "Chat-GPT3",
    date: "2024",
    techStack: ["react", "css", "js", "gsap"],
    images: ["/assets/gpt1.png", "/assets/gpt2.png", "/assets/gpt3.png"],
    href: "https://what-chat-gpt3.netlify.app",
    gitHref: "https://github.com/Xebec13/Chat-GPT3",
    content: {
      en: {
        review: "For this mockup project, I decided to implement a pre-made, free-to-use UI for a website related to the tech industry. Interested in AI, I came across a layout inspired by GPT-3 and decided to bring it to life. I focused on delivering smooth animations and a modern, thoughtful UI/UX to create an engaging and intuitive experience for users.",
        techReview: "The site was built with React to maximize component reusability. I replaced standard CSS transitions with GSAP timelines for complex sequencing. I also focused heavily on the visual hierarchy, using gradients and spacing to create a futuristic, AI-driven aesthetic consistent with the brand identity.",
        keyWords: ["Mockup", "AI", "Landing Page", "Chatbot"],
        keyAchi: [
          "orchestrated complex animation sequences using GSAP Timelines",
          "improved component modularity in React for better maintainability",
          "refined the UI with modern glassmorphism and gradient effects"
        ]
      },
      pl: {
        review: "W ramach tego mockupowego projektu postanowiłem wdrożyć gotowy, darmowy layout dla strony związanej z branżą technologiczną. Zainteresowany AI, natrafiłem na layout inspirowany GPT-3 i zdecydowałem się go ożywić. Skupiłem się na płynnych animacjach i nowoczesnym, przemyślanym UI/UX, aby stworzyć angażujące i intuicyjne doświadczenie dla użytkowników",
        techReview: "Strona została zbudowana w oparciu o React, co pozwoliło maksymalnie wykorzystać ponowne użycie komponentów. Standardowe przejścia CSS zastąpiłem sekwencjami animacji w GSAP, umożliwiając bardziej złożone efekty. Skupiłem się również na hierarchii wizualnej, używając gradientów i przestrzeni, aby stworzyć futurystyczną, inspirowaną AI estetykę zgodną z charakterem marki.",
        keyWords: ["Mockup", "AI", "Landing Page", "Chatbot", "Nowoczesne UI"],
        keyAchi: [
          "zaplanowałem i wdrożyłem złożone sekwencje animacji przy użyciu GSAP Timelines",
          "poprawiłem modularność komponentów w React, zwiększając utrzymywalność kodu",
          "dopracowałem UI, wykorzystując glassmorphism i gradienty zgodnie z charakterem marki"
        ]
      }
    }
  },
  {
    id: 4,
    key: "gericht",
    name: "Gericht Restaurant",
    date: "2024",
    techStack: ["react", "css", "js", "gsap"],
    images: ["/assets/g1.png", "/assets/g2.png", "/assets/g3.png"],
    href: "https://grestaurant-landing-page.netlify.app",
    gitHref: "https://github.com/Xebec13/Gericht-Restaurant",
    content: {
      en: {
        review: "For this mockup project, I decided to implement a website for a premium restaurant using a free-to-use UI layout sourced online. Working within a fully predefined design allowed me to focus on execution quality, delivering a refined, modern landing page with smooth animations and a lively, high-end atmosphere.",
        techReview: "Built with React, custom CSS, and GSAP, the project emphasizes premium visual execution and smooth interaction design. I crafted high-fidelity animations using ScrollTrigger, fine-tuned typography scaling, optimized image delivery, and ensured the layout feels app-like on mobile.",
        keyWords: ["Mockup", "Restaurant", "Premium", "Landing Page", "Contact Form"],
        keyAchi: [
          "designed immersive scroll-triggered animations using GSAP ScrollTrigger",
          "delivered a pixel-perfect responsive layout across all breakpoints",
          "optimized rendering performance for consistently smooth animations"
        ]
      },
      pl: {
        review: "W ramach tego mockupowego projektu postanowiłem podjąć wyzwanie i wdrożyć stronę dla restauracji premium, opartą na gotowym, darmowym projekcie UI. Praca na w pełni predefiniowanym designie pozwoliła mi skupić się na jakości wykonania — dostarczyłem nowoczesny, dopracowany landing page z płynnymi animacjami i żywą, ekskluzywną atmosferą.",
        techReview: " Strona została zbudowana w oparciu o React, customowy CSS i GSAP, z naciskiem na dopracowaną oprawę wizualną i płynny, interaktywny design. Stworzyłem wysokiej jakości animacje przy użyciu ScrollTrigger, dopracowałem skalowanie typografii, zoptymalizowałem ładowanie grafik i zapewniłem mobilne doświadczenie podobne do faktycznej aplikacji.",
        keyWords: ["Mockup", "Restauracja", "Premium", "Landing Page", "Formularz"],
        keyAchi: [
          "zaprojektowałem immersyjne animacje przewijania przy użyciu GSAP ScrollTrigger",
          "dostarczyłem pixel-perfect responsywny layout na wszystkich breakpointach",
          "zoptymalizowałem wydajność renderowania, zapewniając płynne animacje"
        ]
      }
    }
  },
  {
    id: 5,
    key: "cozy",
    name: "Cozy Leaf",
    date: "2025",
    techStack: ["react", "tailwind", "js", "gsap"],
    images: ["/assets/cl1.png", "/assets/cl2.png", "/assets/cl3.png"],
    href: "https://cl-restaurant.netlify.app",
    gitHref: "https://github.com/Xebec13/Cozy-Leaf",
    content: {
      en: {
        review: "For this mockup project, the case assumes that Cozy Leaf — a fictional vegan restaurant — needed a refreshed presentation of its brand online and an engaging, interactive, and enjoyable digital experience for users. I created a fast, engaging site with interactive ordering, table reservations, a dynamic menu, and playful UI animations to enrich the customer journey.",
        techReview: "Developed with React, JavaScript, and Tailwind, the site features a modular architecture with reusable UI components, GSAP-powered micro-animations, interactive ordering and reservation flows, and a fully responsive layout. The result is a smooth, conversion-oriented interface with strong performance and clean, maintainable code.",
        keyWords: ["Mockup", "Restaurant", "Vegan", "Online Ordering", "Table Reservation", "Contact Form"],
        keyAchi: [
          "implemented a persistent shopping cart state using Local Storage for seamless ordering",
          "balanced rich UI animations with strong Core Web Vitals performance",
          "built a scalable, production-ready component system in React + JavaScript"
        ]
      },
      pl: {
        review: "W ramach tego mockupowego projektu przyjęto założenie, że Cozy Leaf — fikcyjna wegańska restauracja — potrzebowała odświeżenia prezentacji swojej marki w kanale digital, chciała dostarczyć użytkownikom angażujące, interaktywne i przyjemne digital experience. Stworzyłem szybki, atrakcyjną stronę z funkcjonalną sekcją zamówienie, rezerwacją stolików, dynamicznym menu i interaktywnymi, przyjemnymi animacjami, które wzbogacają doświadczenie użytkowników.",
        techReview: "Do budowy strony wykorzystałem React + JavaScript i Tailwind, tworząc modułową architekturę z komponentami UI gotowymi do wielokrotnego użycia. Zaimplementowałem mikroanimacje przy użyciu GSAP oraz interaktywne ścieżki zamówień i rezerwacji, a całość jest w pełni responsywna. Efektem jest płynny, przyjazny dla użytkownika interfejs, zoptymalizowany pod konwersje, o wysokiej wydajności i przejrzystej, łatwej w utrzymaniu strukturze kodu.",
        keyWords: ["Mockup", "Restauracja", "Wegańska", "Zamówienia Online", "Rezerwacja"],
        keyAchi: [
          "wdrożyłem funkcjonalny koszyk (Local Storage), co zapewnia płynne składanie zamówień",
          "dopasowałem animacje UI tak, aby strona zachowała wysokie wyniki Core Web Vitals",
          "zbudowałem skalowalny system komponentów w React JavaScript"
        ]
      }
    }
  },
  {
    id: 6,
    key: "postprime",
    name: "Post Prime",
    date: "2026",
    techStack: ["nextjs", "tailwind", "ts", "motion"],
    images: ["/assets/pp1.png", "/assets/pp2.png", "/assets/pp3.png", "/assets/pp4.png"],
    href: "https://post-prime.netlify.app",
    gitHref: "https://github.com/Xebec13/post-prime",
    content: {
      en: {
        review: "The goal was to solve the problem of fragmented content across different platforms. I created a unified hub that aggregates the client's social media activity (YouTube, Facebook, Instagram) into one automated space. No more manual updates — the site lives and breathes with the creator's content. The project is currently in the final stage of client review and evaluation.",
        techReview: "Powered by Next.js, TypeScript, and Motion. I implemented data fetching from official CDNs to track NBA scores and integrated three separate APIs for social media automation. The result is a fully hands-off system with extreme optimization: 99% performance on desktop and 98% on mobile.",
        keyWords: ["Social Aggregator", "NBA Live", "Automation", "Performance", "Client Evaluation"],
        keyAchi: [
          "Consolidated 3 different social media streams into one automated dashboard",
          "Implemented CDN-based live NBA score tracking with custom rollover logic",
          "Achieved 99% (Desktop) and 98% (Mobile) performance scores",
        ]
      },
      pl: {
        review: "Głównym zadaniem było rozwiązanie problemu rozproszonych treści w różnych mediach społecznościowych. Stworzyłem centralny hub, który zbiera aktywność klienta z YouTube, Facebooka i Instagrama w jednym, automatycznym miejscu. Strona żyje razem z twórcą, bez potrzeby ręcznej aktualizacji. Projekt znajduje się obecnie w fazie końcowej weryfikacji i oceny przez klienta.",
        techReview: "Zbudowane przy użyciu Next.js, TypeScript oraz Motion. Wykorzystałem dane z CDN-ów do śledzenia wyników NBA oraz zintegrowałem trzy różne API do obsługi sociali. Całość jest w pełni zautomatyzowana i zoptymalizowana pod kątem szybkości: 99% performance na desktopie oraz 98% na urządzeniach mobilnych.",
        keyWords: ["Agregator Sociali", "NBA Live", "Automatyzacja", "Wydajność", "Weryfikacja Klienta"],
        keyAchi: [
          "Połączyłem 3 różne kanały social media w jeden w pełni zautomatyzowany dashboard",
          "Wdrożyłem śledzenie wyników NBA w czasie rzeczywistym w oparciu o CDN",
          "Osiągnąłem wyniki wydajności na poziomie 99% (Desktop) i 98% (Mobile)",
        ]
      }
    }
  },
];

export const getWorks = (lang: Language): Work[] => {
  return WORKS_DATA.map((project) => {
    const { content, ...baseData } = project;
    return {
      ...baseData,
      ...content[lang],
    };
  });
};