import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { getProjects, type Project } from "@/lib/api";

const colors = [
  "from-blue-500/20 to-cyan-500/20 border-blue-500/30",
  "from-purple-500/20 to-pink-500/20 border-purple-500/30",
  "from-green-500/20 to-emerald-500/20 border-green-500/30",
];

const Projects = () => {
  const { t, i18n } = useTranslation();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    getProjects(controller.signal)
      .then((data) => {
        setProjects(data);
        setError(false);
      })
      .catch((requestError) => {
        if (requestError instanceof DOMException && requestError.name === "AbortError") return;
        setError(true);
      })
      .finally(() => setLoading(false));
    return () => controller.abort();
  }, [i18n.resolvedLanguage]);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main id="main-content" tabIndex={-1} className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="mb-16 text-center">
              <h1 className="font-display text-5xl md:text-7xl font-bold mb-6 animate-fade-in bg-gradient-to-br from-foreground via-foreground to-muted-foreground bg-clip-text text-transparent">
                {t("projects.title")}
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-slide-up">
                {t("projects.description")}
              </p>
            </div>

            {loading && (
              <p role="status" className="text-center text-muted-foreground">{t("projects.loading")}</p>
            )}

            {error && !loading && (
              <p role="alert" className="text-center text-destructive">{t("projects.error")}</p>
            )}

            {!loading && !error && projects.length === 0 && (
              <p className="text-center text-muted-foreground">{t("projects.empty")}</p>
            )}

            {!loading && !error && (
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {projects.map((project, index) => (
                  <article
                    key={project.id}
                    className="group animate-slide-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className={`flex h-full flex-col overflow-hidden rounded-2xl border bg-gradient-to-br backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl ${colors[index % colors.length]}`}>
                      <Link
                        to={`/projects/${project.slug}`}
                        className="relative block aspect-[16/10] overflow-hidden"
                        aria-label={project.title}
                      >
                        <img
                          src={project.image_url}
                          alt={project.title}
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/70 to-transparent" />
                      </Link>

                      <div className="flex flex-1 flex-col p-6">
                        <h2 className="font-display text-2xl font-bold text-foreground">
                          {project.title}
                        </h2>

                        <Button className="mt-6 w-full" variant="outline" asChild>
                          <Link to={`/projects/${project.slug}`}>
                            {t("projects.viewMore")}
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Projects;
