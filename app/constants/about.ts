export type Language = "en" | "pl";

export interface AboutContentItem {
  name: string;
  href?: string;
  description: string;
  contributions?: string[];
}

export interface AboutSection {
  id: number;
  name: string;
  headings: string[];
  badges: string[];
  content: (string | string[] | AboutContentItem)[];
}

// --- BIO DATA ---
const infoData: Record<Language, string[]> = {
  en: [
    "I’m a Front-End Developer creating modern, responsive, and animation-rich web applications with React, JavaScript, TypeScript, Tailwind, Motion, GSAP, with experience managing teams of up to 50 people.",
    "Driven to transition fully into IT, I completed comprehensive coding programs at CodersLab and continued developing my skills through self-learning, online courses, and hands-on practice, including community platforms like icodethis.com.",
    "Since then, I’ve built 5+ fully responsive, animated projects, including a working MVP for a local business. I aim to expand my UX knowledge to better leverage my psychology academic background."
  ],
  pl: [
    "Jestem Front-End Developerem, który tworzy nowoczesne, responsywne i bogate w animacje aplikacje webowe przy użyciu React, JavaScript, TypeScript, Tailwind, Motion, GSAP, a w poprzednich rolach zawodowych zarządzałem zespołami liczącymi nawet 50 osób.",
    "Dążąc do pełnego wejścia do branży IT, ukończyłem certyfikowane programy w CodersLab, a następnie kontynuowałem rozwój poprzez samodzielną naukę, kursy online i praktykę — również na platformach z aktywną społecznością, takich jak icodethis.com.",
    "Od tego czasu zrealizowałem ponad 5 w pełni responsywnych i animowanych projektów, w tym stronę MVP dla lokalnego biznesu. Chciałbym rozwijać kompetencje UX, aby lepiej wykorzystać moje psychologiczne wykształcenie."
  ]
};

// --- SECTIONS DATA ---
const aboutDataSource: Record<Language, AboutSection[]> = {
  en: [
    {
      id: 1,
      name: "Coding",
      headings: ["Tech Stack", "Activity"],
      badges: [
        "HTML", "CSS", "JavaScript", "TypeScript",
        "Tailwind", "SCSS", "GSAP", "Motion",
        "React", "Next.js", "Node.js", "Jest", "Python", "Java basics", "PHP basics"
      ],
      content: [
        {
          name: "I Code This",
          href: "https://icodethis.com/Xebec13",
          description: "Active participation in community challenges.",
          contributions: [
            "Three of my projects were recognized for staying in the Top 5.",
            "One of them remains in the Top 5 and keeps growing in popularity."
          ],
        }
      ]
    },
    {
      id: 2,
      name: "Professional",
      headings: ["Skills", "Experiences", "Segments", "Competences"],
      badges: [
        "rest api", "graphql", "fetch api", "responsive", "accessibility",
        "web animations", "ux/ui basics", "testing", "performance", "ci/cd",
        "docker", "linux", "npm/yarn", "scrum", "agile", "tools", "ai tools", "3rd-party"
      ],
      content: [
        ["Clubs", "Restaurant", "Hotel", "Resort", "Events", "Podcast", "Distribution"],
        ["Team Leadership & Operations", "Operations Setup", "Business Process Optimization",
          "Budgeting & Cost control", "Staff training", "B2B Offering",
          "Customer Relations & Experience", "SM Management & Basic Marketing",
          "Inventory Management", "Event Management"]
      ]
    },
    {
      id: 3,
      name: "Learning",
      headings: ["Goals", "Certificates"],
      badges: ["Custom component library", "Start open source project", "svg manipulation", "three.js", "databases"],
      content: [
        [
          "ADVANCED WEB DEVELOPERS: JAVASCRIPT, REACT, REDUX",
          "WEB DEVELOPER: JAVASCRIPT, PYTHON",
          "FOUNDATIONAL AGILE METHODOLOGY"
        ],
        [
          "CodersLab IT School — Advanced Web Developers: JavaScript, React, Redux (100h)",
          "CodersLab IT School — Web Developer: JavaScript, Python (200h)",
          "Scrum Certificate",
        ],
      ]
    },
    {
      id: 4,
      name: "Personal",
      headings: ["Hobbies", "Facts about me"],
      badges: ["basketball", "sports", "travel", "cooking", "criminology",
        "comics", "fantasy", "gaming", "manga", "and of course coding!"],
      content: [
        ["traveling", "basketball", "comics"],
        [
          "up until now, i visited or worked in up to 20 different countries, still counting.",
          "trained and played in many matches since i was 9.",
          "i consider myself a walking encyclopedia of marvel and dc universes, you can try me."
        ]
      ]
    }
  ],
  pl: [
    {
      id: 1,
      name: "Coding",
      headings: ["Tech Stack", "Aktywności"],
      badges: [
        "HTML", "CSS", "JavaScript", "TypeScript",
        "Tailwind", "SCSS", "GSAP", "Motion",
        "React", "Next.js", "Node.js", "Jest", "Python", "Java basics", "PHP basics"
      ],
      content: [
        {
          name: "I Code This",
          href: "https://github.com/Xebec13",
          description: "Active participation in community challenges.",
          contributions: [
            "Trzy z moich projektów zostały wyróżnione za utrzymanie się w pierwszej piątce.",
            "Jeden z nich nadal znajduje się w Top 5 i wciąż zyskuje na popularności."
          ],
        }
      ]
    },
    {
      id: 2,
      name: "Professional",
      headings: ["Umiejętności", "Doświadczenie", "Segmenty", "Kompetencje"],
      badges: [
        "rest api", "graphql", "fetch api", "responsive", "accessibility",
        "web animations", "ux/ui basics", "testing", "performance", "ci/cd",
        "docker", "linux", "npm/yarn", "scrum", "agile", "tools", "ai tools", "3rd-party"
      ],
      content: [
        ["Kluby", "Restauracja", "Hotel", "Resort", "Imprezy", "Podcast", "Sprzedaż"],
        [
          "Zarządzanie zespołem i operacjami", "Tworzenie i uruchamianie procesów operacyjnych",
          "Optymalizacja procesów biznesowych", "Budżetowanie i kontrola kosztów",
          "Rozwój zespołu", "Ofertowanie B2B", "Relacje i doświadczenia Klienta",
          "Zarządzanie w marketingu i social media", "Zarządzanie zaopatrzeniem",
          "Zarządzanie eventami"
        ]
      ]
    },
    {
      id: 3,
      name: "Learning",
      headings: ["Cele", "Certyfikaty"],
      badges: ["Custom biblioteka komponentów", "Start własnego proejktu open source", "manipulacja svg", "three.js", "bazy danych"],
      content: [
        [
            "ADVANCED WEB DEVELOPERS: JAVASCRIPT, REACT, REDUX",
            "WEB DEVELOPER: JAVASCRIPT, PYTHON",
            "FOUNDATIONAL AGILE METHODOLOGY"
          ],
        [
            "CodersLab IT School — Advanced Web Developers: JavaScript, React, Redux (100h)",
            "CodersLab IT School — Web Developer: JavaScript, Python (200h)",
            "Scrum Certificate",
          ],
      ]
    },
    {
      id: 4,
      name: "Personal",
      headings: ["Hobby", "Fakty o mnie"],
      badges: ["koszykówka", "podróże", "gotowanie", "komiksy", "fantastyka", "gry"],
      content: [
        ["podróże", "koszykówka", "komiksy"],
        [
            "do tej pory odwiedziłem lub pracowałem w około 20 różnych krajach, a lista się powiększa.",
            "od 9 roku życia gram w kosza.",
            "jestem chodzącą encyklopedią uniwersów marvel i dc — możesz mnie sprawdzić."
          ]
      ]
    }
  ]
};

export const getAboutData = (lang: Language): AboutSection[] => aboutDataSource[lang];
export const getInfoContent = (lang: Language): string[] => infoData[lang];