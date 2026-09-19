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
        loading: "Chargement des projets...", error: "Impossible de charger les projets. Veuillez réessayer plus tard.", empty: "Aucun projet publié."
      },
      posts: {
        title: "INSIGHTS & ARTICLES.", featured: "À la une", all: "Tous les articles", read: "LIRE L’ARTICLE",
        loading: "Chargement des articles...", error: "Impossible de charger les articles. Veuillez réessayer plus tard.", empty: "Aucun article publié.", minutes: "{{count}} min"
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
        contactSuccess: "Message envoyé !", contactSuccessDescription: "Je vous répondrai dans les plus brefs délais."
      },
      about: { title: "À propos", subtitle: "Développeur Full Stack et élève ingénieur en Génie Informatique." }
    }
  },
  en: {
    translation: {
      navigation: { home: "Home", posts: "Articles", projects: "Projects", about: "About", language: "Language", theme: "Toggle theme", menu: "Open menu" },
      common: { loading: "Loading...", retry: "Please try again later.", code: "Code", demo: "Demo" },
      footer: { copyright: "© {{year}} Portfolio. All rights reserved." },
      projects: {
        eyebrow: "Portfolio", title: "My Projects", description: "Explore my Full Stack, mobile, backend and IoT projects.",
        loading: "Loading projects...", error: "Unable to load projects. Please try again later.", empty: "No published projects."
      },
      posts: {
        title: "INSIGHTS & ARTICLES.", featured: "Featured", all: "All articles", read: "READ ARTICLE",
        loading: "Loading articles...", error: "Unable to load articles. Please try again later.", empty: "No published articles.", minutes: "{{count}} min"
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
        contactSuccess: "Message sent!", contactSuccessDescription: "I will get back to you as soon as possible."
      },
      about: { title: "About", subtitle: "Full Stack developer and Computer Engineering student." }
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
