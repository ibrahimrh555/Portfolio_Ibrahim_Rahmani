import i18n from "i18next";
import { initReactI18next } from "react-i18next";

export const supportedLanguages = ["fr", "en"] as const;
export type SupportedLanguage = (typeof supportedLanguages)[number];

const resources = {
  fr: {
    translation: {
      navigation: { home: "Accueil", posts: "Articles", projects: "Projets", about: "À propos", language: "Langue", theme: "Changer le thème", menu: "Ouvrir le menu" },
      common: { loading: "Chargement...", retry: "Veuillez réessayer plus tard.", code: "Code", demo: "Démo" },
      footer: { copyright: "© {{year}} Portfolio. Tous droits réservés." },
      projects: {
        eyebrow: "Portfolio", title: "Mes Projets", description: "Découvrez mes réalisations en développement Full Stack, mobile, backend et IoT.",
        loading: "Chargement des projets...", error: "Impossible de charger les projets. Veuillez réessayer plus tard.", empty: "Aucun projet publié.", viewMore: "Voir plus"
      },
      posts: {
        title: "INSIGHTS & ARTICLES.", featured: "À la une", all: "Tous les articles", read: "LIRE L’ARTICLE",
        loading: "Chargement des articles...", error: "Impossible de charger les articles. Veuillez réessayer plus tard.", empty: "Aucun article publié.", minutes: "{{count}} min"
      },
      projectDetail: {
        eyebrow: "Projet", loading: "Chargement du projet...", notFound: "Projet introuvable", back: "Retour aux projets", technologies: "Technologies utilisées"
      },
      postDetail: {
        loading: "Chargement de l’article...", notFound: "Article introuvable", back: "Retour au blog", readTime: "{{count}} min de lecture"
      },
      notFound: { title: "Page introuvable", description: "La page demandée n’existe pas.", home: "Retour à l’accueil" },
      home: {
        heroTitle: "Concevoir des solutions", heroAccent: "web, mobiles et connectées.",
        heroDescription: "Élève ingénieur en Génie Informatique et développeur Full Stack, spécialisé en applications web et mobiles, APIs backend et solutions IoT.",
        journey: "Voir mon parcours", downloadCv: "Télécharger mon CV", portfolio: "Portfolio",
        selectedProjects: "Projets sélectionnés", allProjects: "Voir tous les projets",
        servicesTitle: "Expertise & Services", servicesDescription: "Je conçois des applications complètes, de l’interface utilisateur jusqu’aux APIs, aux données et aux objets connectés.",
        contactSuccess: "Message envoyé !", contactSuccessDescription: "Je vous répondrai dans les plus brefs délais.",
        featured: { ecommerce: "Plateforme E-commerce", iot: "Solution IoT" },
        services: {
          web: { title: "Web & Mobile", description: "Interfaces responsives et applications mobiles avec React, React Native, TypeScript et Expo." },
          backend: { title: "Backend & APIs", description: "APIs REST et services métier avec Spring Boot, Django REST, Hono et tRPC." },
          iot: { title: "IoT & Données", description: "Solutions connectées avec ESP32, capteurs, MySQL et tableaux de bord temps réel." }
        },
        contact: {
          badge: "Contact", title: "Un projet ?", accent: "Parlons-en.",
          description: "Une idée ou une question ? Remplissez ce formulaire et je vous répondrai rapidement.",
          location: "Maroc • À distance", name: "Nom", namePlaceholder: "Votre nom", email: "Email",
          subject: "Sujet", subjectPlaceholder: "Sujet", message: "Message",
          messagePlaceholder: "Comment puis-je vous aider ?", sending: "Envoi...", send: "Envoyer le message"
        }
      },
      about: {
        title: "À propos", subtitle: "Développeur Full Stack et élève ingénieur en Génie Informatique.",
        heading: "À propos de moi", valuesTitle: "Mes valeurs & soft skills", skillsTitle: "Expertise technique",
        galleryAlt: "Projet ou activité {{count}}",
        bio: {
          intro: "Je suis <strong>Ibrahim Rahmani</strong>, élève ingénieur en Génie Informatique, option TALIS, à l’<school>ENSA Khouribga</school>.",
          experience: "Spécialisé en développement <strong>Full Stack web et mobile</strong>, je travaille avec React, React Native, TypeScript, Spring Boot, Django, Hono et tRPC. Mes expériences couvrent les applications mobiles, les APIs backend, les plateformes métier et les systèmes IoT connectés avec ESP32.",
          goal: "Après avoir réalisé mon PFA sur l’application mobile <strong>10in</strong>, je recherche un <strong>stage PFE 2026/2027</strong> pour contribuer à des produits web ou mobiles ambitieux et approfondir mon expertise en ingénierie logicielle."
        },
        skills: {
          frontend: { title: "Frontend & Mobile", description: "Création d’interfaces web et d’applications mobiles modernes, responsives et accessibles." },
          backend: { title: "Backend & APIs", description: "Conception d’APIs REST et de services backend fiables avec des architectures modulaires." },
          devops: { title: "Data & DevOps", description: "Gestion des données, automatisation CI/CD et déploiement d’applications modernes." },
          iot: { title: "IoT & Systèmes embarqués", description: "Intégration matériel-logiciel pour la collecte et le suivi de données en temps réel." }
        },
        values: {
          analysis: { title: "Rigueur analytique", description: "Approche structurée pour concevoir des solutions performantes et sécurisées." },
          leadership: { title: "Leadership & Agile", description: "Expérience en gestion d’équipe (Club JLM) et méthodologie Scrum." },
          innovation: { title: "Innovation", description: "Créativité technique appliquée aux projets IoT et digitaux." }
        }
      }
    }
  },
  en: {
    translation: {
      navigation: { home: "Home", posts: "Articles", projects: "Projects", about: "About", language: "Language", theme: "Toggle theme", menu: "Open menu" },
      common: { loading: "Loading...", retry: "Please try again later.", code: "Code", demo: "Demo" },
      footer: { copyright: "© {{year}} Portfolio. All rights reserved." },
      projects: {
        eyebrow: "Portfolio", title: "My Projects", description: "Explore my Full Stack, mobile, backend and IoT projects.",
        loading: "Loading projects...", error: "Unable to load projects. Please try again later.", empty: "No published projects.", viewMore: "View more"
      },
      posts: {
        title: "INSIGHTS & ARTICLES.", featured: "Featured", all: "All articles", read: "READ ARTICLE",
        loading: "Loading articles...", error: "Unable to load articles. Please try again later.", empty: "No published articles.", minutes: "{{count}} min"
      },
      projectDetail: {
        eyebrow: "Project", loading: "Loading project...", notFound: "Project not found", back: "Back to projects", technologies: "Technologies used"
      },
      postDetail: {
        loading: "Loading article...", notFound: "Article not found", back: "Back to blog", readTime: "{{count}} min read"
      },
      notFound: { title: "Page not found", description: "The requested page does not exist.", home: "Return home" },
      home: {
        heroTitle: "Building", heroAccent: "web, mobile and connected solutions.",
        heroDescription: "Computer Engineering student and Full Stack developer specializing in web and mobile applications, backend APIs and IoT solutions.",
        journey: "View my journey", downloadCv: "Download my résumé", portfolio: "Portfolio",
        selectedProjects: "Selected projects", allProjects: "View all projects",
        servicesTitle: "Expertise & Services", servicesDescription: "I build complete applications, from user interfaces to APIs, data and connected devices.",
        contactSuccess: "Message sent!", contactSuccessDescription: "I will get back to you as soon as possible.",
        featured: { ecommerce: "E-commerce Platform", iot: "IoT Solution" },
        services: {
          web: { title: "Web & Mobile", description: "Responsive interfaces and mobile apps using React, React Native, TypeScript and Expo." },
          backend: { title: "Backend & APIs", description: "REST APIs and business services using Spring Boot, Django REST, Hono and tRPC." },
          iot: { title: "IoT & Data", description: "Connected solutions using ESP32, sensors, MySQL and real-time dashboards." }
        },
        contact: {
          badge: "Contact", title: "Have a project?", accent: "Let’s talk.",
          description: "Have an idea or a question? Complete this form and I will get back to you shortly.",
          location: "Morocco • Remote", name: "Name", namePlaceholder: "Your name", email: "Email",
          subject: "Subject", subjectPlaceholder: "Subject", message: "Message",
          messagePlaceholder: "How can I help you?", sending: "Sending...", send: "Send message"
        }
      },
      about: {
        title: "About", subtitle: "Full Stack developer and Computer Engineering student.",
        heading: "About me", valuesTitle: "My values & soft skills", skillsTitle: "Technical expertise",
        galleryAlt: "Project or activity {{count}}",
        bio: {
          intro: "I am <strong>Ibrahim Rahmani</strong>, a Computer Engineering student specializing in TALIS at <school>ENSA Khouribga</school>.",
          experience: "Specialized in <strong>Full Stack web and mobile development</strong>, I work with React, React Native, TypeScript, Spring Boot, Django, Hono and tRPC. My experience covers mobile applications, backend APIs, business platforms and ESP32-connected IoT systems.",
          goal: "After completing my final-year project on the <strong>10in</strong> mobile application, I am seeking a <strong>2026/2027 graduation internship</strong> to contribute to ambitious web or mobile products and deepen my software engineering expertise."
        },
        skills: {
          frontend: { title: "Frontend & Mobile", description: "Modern, responsive and accessible web interfaces and mobile applications." },
          backend: { title: "Backend & APIs", description: "Reliable REST APIs and backend services built with modular architectures." },
          devops: { title: "Data & DevOps", description: "Data management, CI/CD automation and modern application deployment." },
          iot: { title: "IoT & Embedded Systems", description: "Hardware-software integration for real-time data collection and monitoring." }
        },
        values: {
          analysis: { title: "Analytical rigor", description: "A structured approach to designing efficient and secure solutions." },
          leadership: { title: "Leadership & Agile", description: "Team management experience (JLM Club) and Scrum methodology." },
          innovation: { title: "Innovation", description: "Technical creativity applied to IoT and digital projects." }
        }
      }
    }
  }
} as const;

function detectLanguage(): SupportedLanguage {
  const stored = localStorage.getItem("portfolio-language");
  if (stored === "fr" || stored === "en") return stored;
  return navigator.language.toLowerCase().startsWith("en") ? "en" : "fr";
}

void i18n.use(initReactI18next).init({
  resources,
  lng: detectLanguage(),
  fallbackLng: "fr",
  supportedLngs: supportedLanguages,
  interpolation: { escapeValue: false },
  returnNull: false,
});

i18n.on("languageChanged", (language) => {
  const normalized: SupportedLanguage = language.startsWith("en") ? "en" : "fr";
  localStorage.setItem("portfolio-language", normalized);
  document.documentElement.lang = normalized;
});

document.documentElement.lang = i18n.resolvedLanguage?.startsWith("en") ? "en" : "fr";

export default i18n;
