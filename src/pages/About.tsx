import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Code, Server, Cpu, Award, Users, Search, Database, Smartphone } from "lucide-react";
import { motion } from "framer-motion";
import { Trans, useTranslation } from "react-i18next";

const About = () => {
  const { t } = useTranslation();
  const baseUrl = import.meta.env.BASE_URL;

  const images = [
    `${baseUrl}image 1.png`,
    `${baseUrl}image3.jpg`,
    `${baseUrl}image6.jpg`,
    `${baseUrl}12.jpeg`,
    `${baseUrl}13.jpg`,
    `${baseUrl}14.jpg`,
  ];

  const skills = [
    {
      icon: Smartphone,
      title: t("about.skills.frontend.title"),
      description: t("about.skills.frontend.description"),
      tags: ["React.js", "React Native", "TypeScript", "Expo", "Tailwind CSS"],
    },
    {
      icon: Server,
      title: t("about.skills.backend.title"),
      description: t("about.skills.backend.description"),
      tags: ["Java", "Spring Boot", "Python", "Django REST", "Hono", "tRPC"],
    },
    {
      icon: Database,
      title: t("about.skills.devops.title"),
      description: t("about.skills.devops.description"),
      tags: ["MySQL", "SQLite/Turso", "Docker", "Git/GitHub", "GitHub Actions", "Cloudflare Workers"],
    },
    {
      icon: Cpu,
      title: t("about.skills.iot.title"),
      description: t("about.skills.iot.description"),
      tags: ["C++", "ESP32", "YF-S201", "Arduino", "Wi-Fi"],
    },
  ];

  // Valeurs basées sur les "SOFT SKILLS" et le "RÉSUMÉ PROFESSIONNEL"
  const values = [
    { 
      icon: Search, 
      title: t("about.values.analysis.title"),
      desc: t("about.values.analysis.description")
    },
    { 
      icon: Users, 
      title: t("about.values.leadership.title"),
      desc: t("about.values.leadership.description")
    },
    { 
      icon: Award, 
      title: t("about.values.innovation.title"),
      desc: t("about.values.innovation.description")
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main id="main-content" tabIndex={-1} className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Hero Section */}
            <div className="mb-16">
              <h1 className="font-display text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
                {t("about.heading")}
              </h1>
              
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6 text-lg text-muted-foreground animate-slide-up">
                  <p className="leading-relaxed">
                    <Trans i18nKey="about.bio.intro" components={{ strong: <span className="text-foreground font-semibold" />, school: <span className="text-primary font-semibold" /> }} />
                  </p>
                  
                  <p className="leading-relaxed">
                    <Trans i18nKey="about.bio.experience" components={{ strong: <span className="text-foreground font-semibold" /> }} />
                  </p>

                  <p className="leading-relaxed border-l-4 border-primary pl-4 bg-primary/5 py-2 rounded-r-lg">
                    <Trans i18nKey="about.bio.goal" components={{ strong: <span className="text-foreground font-semibold" /> }} />
                  </p>
                </div>

                <div className="relative animate-fade-in flex justify-center items-center" style={{ animationDelay: "0.2s" }}>
                  {/* Cercles d'animation en arrière plan */}
                  <div className="absolute w-[110%] h-[110%] border border-primary/30 rounded-full animate-pulse" />
                  <div className="absolute w-[120%] h-[120%] border border-primary/10 rounded-full" />
                  
                  <div className="relative w-80 h-80 rounded-full overflow-hidden border-4 border-background shadow-2xl ring-4 ring-primary/20">
                    <img 
                      src={`${baseUrl}image 1.png`} 
                      alt="Ibrahim Rahmani Workspace"
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Gallery Section */}
            <div className="relative flex flex-wrap justify-center gap-6 mt-16 mb-10 max-w-6xl px-4">
              {images.map((src, index) => (
                <motion.div
                  key={index}
                  initial={{ rotate: (Math.random() - 0.5) * 10 }}
                  whileHover={{
                    rotate: 0,
                    scale: 1.05,
                    zIndex: 10,
                    transition: { duration: 0.3 },
                  }}
                  className="w-84 h-64 rounded-2xl overflow-hidden shadow-2xl border border-white/10 cursor-pointer"
                >
                  <img
                    src={src}
                    alt={t("about.galleryAlt", { count: index + 1 })}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              ))}
            </div>
            <br />
            
            {/* Values / Soft Skills Section */}
            <div className="mb-16">
              <h2 className="font-display text-3xl font-bold mb-8 text-center">{t("about.valuesTitle")}</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {values.map((value, index) => (
                  <div
                    key={value.title}
                    className="p-6 bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl text-center hover:border-primary/50 transition-all duration-300 hover:scale-105 animate-slide-up group"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <value.icon className="h-10 w-10 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform" />
                    <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                    <p className="text-sm text-muted-foreground">{value.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Technical Skills Section */}
            <div>
              <h2 className="font-display text-3xl font-bold mb-8 text-center">{t("about.skillsTitle")}</h2>
              <div className="grid md:grid-cols-2 gap-8">
                {skills.map((skill, index) => (
                  <div
                    key={skill.title}
                    className="p-8 bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl hover:border-primary/50 transition-all duration-300 animate-slide-up group"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <skill.icon className="h-12 w-12 text-primary mb-6 group-hover:scale-110 transition-transform" />
                    <h3 className="text-2xl font-bold mb-3">{skill.title}</h3>
                    <p className="text-muted-foreground mb-4 leading-relaxed">{skill.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {skill.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 text-xs font-medium bg-secondary rounded-full border border-border/50"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;
