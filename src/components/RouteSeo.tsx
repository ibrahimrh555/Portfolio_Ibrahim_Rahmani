import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Seo from "@/components/Seo";
import { SITE_URL } from "@/lib/seo";

const RouteSeo = () => {
  const { pathname } = useLocation();
  const { i18n } = useTranslation();
  const english = i18n.resolvedLanguage?.startsWith("en");

  const pages: Record<string, { title: string; description: string }> = english
    ? {
        "/": {
          title: "Ibrahim Rahmani | Full Stack Developer",
          description: "Portfolio of Ibrahim Rahmani: web, mobile, backend and IoT projects built with React, Django, Spring Boot and TypeScript.",
        },
        "/projects": {
          title: "Projects | Ibrahim Rahmani",
          description: "Explore Ibrahim Rahmani's Full Stack, mobile, backend and IoT projects.",
        },
        "/posts": {
          title: "Articles | Ibrahim Rahmani",
          description: "Technical articles about software engineering, web development, mobile applications and IoT.",
        },
        "/about": {
          title: "About | Ibrahim Rahmani",
          description: "Learn about Ibrahim Rahmani, a Computer Engineering student and Full Stack developer based in Morocco.",
        },
      }
    : {
        "/": {
          title: "Ibrahim Rahmani | Développeur Full Stack",
          description: "Portfolio d’Ibrahim Rahmani : projets web, mobile, backend et IoT réalisés avec React, Django, Spring Boot et TypeScript.",
        },
        "/projects": {
          title: "Projets | Ibrahim Rahmani",
          description: "Découvrez les projets Full Stack, mobile, backend et IoT réalisés par Ibrahim Rahmani.",
        },
        "/posts": {
          title: "Articles | Ibrahim Rahmani",
          description: "Articles techniques sur l’ingénierie logicielle, le développement web, le mobile et l’IoT.",
        },
        "/about": {
          title: "À propos | Ibrahim Rahmani",
          description: "Découvrez Ibrahim Rahmani, élève ingénieur en informatique et développeur Full Stack au Maroc.",
        },
      };

  const page = pages[pathname];
  if (!page) {
    if (pathname.startsWith("/projects/") || pathname.startsWith("/posts/")) return null;
    return <Seo title="Page introuvable | Ibrahim Rahmani" description="Cette page n’existe pas." path={pathname} noIndex />;
  }

  return (
    <Seo
      {...page}
      path={pathname}
      structuredData={
        pathname === "/"
          ? {
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Ibrahim Rahmani",
              url: SITE_URL,
              jobTitle: "Full Stack Developer",
              sameAs: [
                "https://github.com/ibrahimrh555",
                "https://www.linkedin.com/in/ibrahim-rahmani-433418387/",
              ],
            }
          : undefined
      }
    />
  );
};

export default RouteSeo;
