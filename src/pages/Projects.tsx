import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ExternalLink, Github, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const Projects = () => {
  // Données extraites directement du CV d'Ibrahim RAHMANI
  const projects = [
    {
      title: "Solution IoT & Dashboard Anti-Gaspillage d'Eau",
      description: "Système connecté (ESP32) pour la collecte et l'analyse en temps réel des données de consommation d'eau domestique. Création d'un tableau de bord interactif avec algorithmes de détection d'anomalies (fuites) pour une meilleure gestion des ressources hydriques.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop", // Image de dashboard/data
      tags: ["Python", "Django", "React", "MySQL", "C++", "ESP32"],
      github: "https://github.com/ibrahimrh555/Suivi_de_Consommation_d_Eau",
      demo: "",
      color: "from-blue-500/20 to-cyan-500/20 border-blue-500/30"
    },
    {
      title: "Application de Gestion de Cabinet Médical",
      description: "Plateforme web complète (Full Stack) pour digitaliser les processus administratifs (Rendez-vous, Dossiers patients). Implémentation d'une architecture sécurisée avec gestion des rôles (Admin/Médecin/Secrétaire) et génération automatique d'ordonnances.",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop", // Image médicale/tech
      tags: ["Java JEE", "Spring Boot", "React.js", "MySQL"],
      github: "https://github.com/ibrahimrh555/Optimisation_Processus_Administratifs_Cabinet_Medical",
      demo: "",
      color: "from-purple-500/20 to-pink-500/20 border-purple-500/30"
    },
    {
      title: "Plateforme E-commerce de Prêt-à-Porter",
      description: "Conception et déploiement d'une marketplace incluant un back-office vendeur et une interface client fluide. Modélisation de la base de données relationnelle et respect strict de l'architecture MVC pour faciliter la maintenance du code.",
      image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=600&fit=crop", // Image E-commerce existante
      tags: ["PHP", "Laravel", "JavaScript", "SQL"],
      github: "https://github.com/ibrahimrh555/Plateforme_E-commerce_Pret_a_Porter",
      demo: "",
      color: "from-green-500/20 to-emerald-500/20 border-green-500/30"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-16 text-center">
              <h1 className="font-display text-5xl md:text-7xl font-bold mb-6 animate-fade-in bg-gradient-to-br from-foreground via-foreground to-muted-foreground bg-clip-text text-transparent">
                Mes Projets
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-slide-up">
                Découvrez mes récentes réalisations, alliant développement Full Stack, ingénierie logicielle et solutions IoT.
              </p>
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <div
                  key={project.title}
                  className="group relative animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className={`h-full bg-gradient-to-br ${project.color} backdrop-blur-sm border rounded-2xl overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl`}>
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={project.image} 
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-60" />
                    </div>

                    {/* Content */}
                    <div className="flex flex-col h-[calc(100%-12rem)] p-6 space-y-4">
                      <h3 className="font-display text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      
                      <p className="text-muted-foreground text-sm leading-relaxed flex-grow">
                        {project.description}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <Badge 
                            key={tag} 
                            variant="secondary"
                            className="text-xs"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      {/* Actions */}
                      <div className="flex gap-3 pt-4 mt-auto">
                        <Button
                          variant="default"
                          size="sm"
                          className="flex-1 group/btn"
                          asChild
                          disabled={!project.demo}
                        >
                          <a href={project.demo || "#"} target={project.demo ? "_blank" : "_self"} rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4 mr-2 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                            Démo
                          </a>
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1"
                          asChild
                          disabled={!project.github}
                        >
                          <a href={project.github || "#"} target={project.github ? "_blank" : "_self"} rel="noopener noreferrer">
                            <Github className="h-4 w-4 mr-2" />
                            Code
                          </a>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Projects;