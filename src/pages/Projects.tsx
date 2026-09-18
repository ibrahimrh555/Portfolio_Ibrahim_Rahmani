import { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getProjects, type Project } from "@/lib/api";

const colors = [
  "from-blue-500/20 to-cyan-500/20 border-blue-500/30",
  "from-purple-500/20 to-pink-500/20 border-purple-500/30",
  "from-green-500/20 to-emerald-500/20 border-green-500/30",
];

const Projects = () => {
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
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="mb-16 text-center">
              <h1 className="font-display text-5xl md:text-7xl font-bold mb-6 animate-fade-in bg-gradient-to-br from-foreground via-foreground to-muted-foreground bg-clip-text text-transparent">
                Mes Projets
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-slide-up">
                Découvrez mes réalisations en développement Full Stack, mobile, backend et IoT.
              </p>
            </div>

            {loading && (
              <p className="text-center text-muted-foreground">Chargement des projets...</p>
            )}

            {error && !loading && (
              <p className="text-center text-destructive">
                Impossible de charger les projets. Veuillez réessayer plus tard.
              </p>
            )}

            {!loading && !error && projects.length === 0 && (
              <p className="text-center text-muted-foreground">Aucun projet publié.</p>
            )}

            {!loading && !error && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <article
                  key={project.id}
                  className="group relative animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className={`h-full bg-gradient-to-br ${colors[index % colors.length]} backdrop-blur-sm border rounded-2xl overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl`}>
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={project.image_url}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-60" />
                    </div>

                    <div className="flex flex-col h-[calc(100%-12rem)] p-6 space-y-4">
                      <h2 className="font-display text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                        {project.title}
                      </h2>
                      <p className="text-muted-foreground text-sm leading-relaxed flex-grow">
                        {project.short_description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((technology) => (
                          <Badge key={technology} variant="secondary" className="text-xs">
                            {technology}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex gap-3 pt-4 mt-auto">
                        {project.demo_url && (
                          <Button variant="default" size="sm" className="flex-1" asChild>
                            <a href={project.demo_url} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="h-4 w-4 mr-2" />
                              Démo
                            </a>
                          </Button>
                        )}
                        {project.github_url && (
                          <Button variant="outline" size="sm" className="flex-1" asChild>
                            <a href={project.github_url} target="_blank" rel="noopener noreferrer">
                              <Github className="h-4 w-4 mr-2" />
                              Code
                            </a>
                          </Button>
                        )}
                      </div>
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
