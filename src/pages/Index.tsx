import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ArrowRight, Smartphone, Server, Cpu, Star, Quote, ExternalLink, Download, Mail, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { motion, AnimatePresence } from "framer-motion"; // Importation pour les animations
import { useTranslation } from "react-i18next";

const Index = () => {
  const { toast } = useToast();
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: t("home.contactSuccess"),
        description: t("home.contactSuccessDescription"),
      });
    }, 1500);
  };

  // --- Configuration des variants d'animation ---
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: "easeOut" }
  };

  const staggerContainer = {
    initial: {},
    whileInView: { transition: { staggerChildren: 0.15 } },
    viewport: { once: true }
  };

  return (
    <AnimatePresence>
      <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="min-h-screen bg-background selection:bg-primary/20"
      >
      <Navigation />
      
      <main id="main-content" tabIndex={-1}>
        {/* --- HERO SECTION --- */}
        <section className="relative pt-32 pb-20 md:pt-24 md:pb-24 overflow-hidden bg-cover bg-center ">
        <div className="absolute top-0 left-0 w-full h-full bg-black/50 -z-10" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
          <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/10 blur-[120px]" 
          />
          <motion.div 
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-accent/10 blur-[120px]" 
          />
        </div>

        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-8 tracking-tight"
          >
            {t("home.heroTitle")} <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">{t("home.heroAccent")}</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            {t("home.heroDescription")}
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button asChild size="lg" className="h-12 px-8 rounded-full group transition-transform hover:scale-105 active:scale-95">
            <Link to="/about">
              {t("home.journey")}
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            </Button>
            <Button asChild variant="ghost" size="lg" className="h-12 px-8 rounded-full border border-white/10 hover:bg-white/5 transition-transform hover:scale-105 active:scale-95">
            <a href={`${import.meta.env.BASE_URL}CV%20Eng.pdf`} download="CV_Ibrahim.pdf" className="flex items-center">
              <Download className="mr-2 h-4 w-4 text-primary" />
              {t("home.downloadCv")}
            </a>
            </Button>
          </motion.div>
          </div>
        </div>
        </section>

        {/* --- FEATURED PROJECTS --- */}
        <motion.section 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="py-24 px-4"
        >
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <Badge className="mb-4" variant="outline">{t("home.portfolio")}</Badge>
            <h2 className="font-display text-4xl md:text-5xl font-bold">{t("home.selectedProjects")}</h2>
          </div>
          <Button variant="link" asChild className="text-primary p-0 h-auto group">
            <Link to="/projects" className="flex items-center gap-2">
            {t("home.allProjects")} <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
          </div>

          <motion.div 
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-8"
          >
          {[
            { title: t("home.featured.ecommerce"), category: "PHP • Laravel • JavaScript • SQL", image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=600&fit=crop" },
            { title: t("home.featured.iot"), category: "React • Python • Django • MySQL • C++ • ESP32", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop" }
          ].map((project, i) => (
            <motion.div 
            key={i}
            variants={fadeInUp}
            whileHover={{ y: -10 }}
            className="group relative overflow-hidden rounded-3xl border border-border bg-card transition-all duration-300 shadow-sm hover:shadow-xl"
            >
            <div className="aspect-[16/10] overflow-hidden">
              <img src={project.image} alt={project.title} className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-80" />
            <div className="absolute bottom-0 left-0 p-8 w-full translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
              <p className="text-sm font-medium text-primary mb-2">{project.category}</p>
              <h3 className="text-2xl font-bold mb-4">{project.title}</h3>
              <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Button size="icon" variant="secondary" aria-label={`Ajouter ${project.title} aux favoris`} className="rounded-full w-10 h-10 hover:scale-110 transition-transform"><Star className="h-4 w-4" aria-hidden="true" /></Button>
              <Button size="icon" variant="secondary" aria-label={`Ouvrir ${project.title}`} className="rounded-full w-10 h-10 hover:scale-110 transition-transform"><ExternalLink className="h-4 w-4" aria-hidden="true" /></Button>
              </div>
            </div>
            </motion.div>
          ))}
          </motion.div>
        </div>
        </motion.section>

        {/* --- SERVICES --- */}
        <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="py-24 px-4 bg-secondary/30 relative"
        >
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="font-display text-4xl md:text-5xl font-bold mb-4"
          >
            {t("home.servicesTitle")}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-muted-foreground text-lg max-w-2xl mx-auto"
          >
            {t("home.servicesDescription")}
          </motion.p>
          </div>

          <motion.div 
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-6"
          >
          {[
            { icon: Smartphone, title: t("home.services.web.title"), desc: t("home.services.web.description") },
            { icon: Server, title: t("home.services.backend.title"), desc: t("home.services.backend.description") },
            { icon: Cpu, title: t("home.services.iot.title"), desc: t("home.services.iot.description") }
          ].map((s, i) => (
            <motion.div key={i} variants={fadeInUp}>
            <Card className="p-8 border-none bg-background shadow-sm hover:shadow-md transition-all hover:-translate-y-2 group">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-black transition-colors">
              <s.icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">{s.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{s.desc}</p>
            </Card>
            </motion.div>
          ))}
          </motion.div>
        </div>
        </motion.section>

        {/* --- TECH STACK --- */}
        <section className="py-20 overflow-hidden opacity-70 relative">
        <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-background to-transparent z-10" />

        <div className="flex overflow-hidden">
          <motion.div 
          animate={{ 
            x: [0, "-50%"]
          }}
          transition={{ 
            duration: 20,
            ease: "linear", 
            repeat: Infinity 
          }}
          className="flex flex-nowrap gap-8 md:gap-16 items-center whitespace-nowrap"
          >
          {[...Array(2)].map((_, index) => (
            <React.Fragment key={index}>
            {["React", "React Native", "TypeScript", "Expo", "Java", "Spring Boot", "Python", "Django REST", "Hono", "tRPC", "MySQL", "Docker"].map((tech) => (
              <span 
              key={`${tech}-${index}`} 
              className="text-2xl md:text-4xl font-bold font-display tracking-tighter text-muted-foreground/30 hover:text-primary transition-colors cursor-default uppercase"
              >
              {tech}
              </span>
            ))}
            </React.Fragment>
          ))}
          </motion.div>
        </div>
        </section>

        {/* --- TESTIMONIALS --- */}
        <motion.section 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="py-12 px-4"
        >
        <div className="container mx-auto max-w-4xl">
          <Card className="relative p-12 rounded-[2rem] bg-primary/5 border border-primary/10 text-center overflow-hidden">
          <motion.div 
            animate={{ rotate: [0, 10, 0] }}
            transition={{ duration: 5, repeat: Infinity }}
            className="absolute top-4 left-4 opacity-10"
          >
            <Quote className="h-20 w-20" />
          </motion.div>
          <p className="text-2xl md:text-3xl font-medium italic mb-8 leading-snug relative z-10">
            "Un développeur hors pair qui comprend les enjeux business autant que les contraintes techniques. Le résultat a dépassé nos attentes."
          </p>
          <div className="relative z-10">
            <p className="font-bold text-lg text-foreground">Marc-Antoine Dupont</p>
            <p className="text-muted-foreground uppercase tracking-widest text-xs">CTO @ FinTechX</p>
          </div>
          </Card>
        </div>
        </motion.section>

        {/* --- CONTACT SECTION (FINAL CTA) --- */}
        <motion.section 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-16 px-4 bg-[#050505] relative overflow-hidden" 
        id="contact"
        >
        <div className="absolute top-1/2 left-1/4 w-72 h-72 bg-primary/5 blur-[100px] rounded-full -z-10" />

        <div className="container mx-auto max-w-5xl">
          <div className="grid lg:grid-cols-2 gap-10 items-start">
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <div>
            <Badge className="mb-3 bg-primary/10 text-primary border-none text-[10px] px-3 py-0.5 uppercase">{t("home.contact.badge")}</Badge>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter leading-tight text-white">
              {t("home.contact.title")} <br />
              <span className="text-primary italic font-serif">{t("home.contact.accent")}</span>
            </h2>
            </div>
            <p className="text-base text-white/40 max-w-sm leading-relaxed">
            {t("home.contact.description")}
            </p>
            <div className="space-y-4 pt-2">
            <div className="flex items-center gap-3 text-white/60 text-sm hover:text-primary transition-colors cursor-pointer group">
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 shrink-0 group-hover:border-primary transition-colors">
              <Mail className="w-4 h-4 text-primary" />
              </div>
              <span>rahmaniibrahim042@gmail.com</span>
            </div>
            <div className="flex items-center gap-3 text-white/60 text-sm">
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 shrink-0">
              <MapPin className="w-4 h-4 text-primary" />
              </div>
              <span>{t("home.contact.location")}</span>
            </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white/[0.02] border border-white/10 p-6 md:p-8 rounded-3xl backdrop-blur-sm relative"
          >
            <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid md:grid-cols-2 gap-5">
              <div className="space-y-1.5">
              <label htmlFor="contact-name" className="text-xs font-medium text-white/40 ml-1 uppercase tracking-wider">{t("home.contact.name")}</label>
              <Input id="contact-name" name="name" autoComplete="name" placeholder={t("home.contact.namePlaceholder")} className="bg-transparent border-white/10 border-0 border-b rounded-none focus-visible:ring-0 focus-visible:border-primary transition-all px-0 h-9 text-sm text-white" required />
              </div>
              <div className="space-y-1.5">
              <label htmlFor="contact-email" className="text-xs font-medium text-white/40 ml-1 uppercase tracking-wider">{t("home.contact.email")}</label>
              <Input id="contact-email" name="email" type="email" autoComplete="email" placeholder="votre@email.com" className="bg-transparent border-white/10 border-0 border-b rounded-none focus-visible:ring-0 focus-visible:border-primary transition-all px-0 h-9 text-sm text-white" required />
              </div>
            </div>
            <div className="space-y-1.5">
              <label htmlFor="contact-subject" className="text-xs font-medium text-white/40 ml-1 uppercase tracking-wider">{t("home.contact.subject")}</label>
              <Input id="contact-subject" name="subject" placeholder={t("home.contact.subjectPlaceholder")} className="bg-transparent border-white/10 border-0 border-b rounded-none focus-visible:ring-0 focus-visible:border-primary transition-all px-0 h-9 text-sm text-white" />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="contact-message" className="text-xs font-medium text-white/40 ml-1 uppercase tracking-wider">{t("home.contact.message")}</label>
              <Textarea id="contact-message" name="message" placeholder={t("home.contact.messagePlaceholder")} className="bg-transparent border-white/10 border-0 border-b rounded-none focus-visible:ring-0 focus-visible:border-primary transition-all px-0 min-h-[100px] text-sm text-white resize-none" required />
            </div>
            <Button type="submit" disabled={isSubmitting} className="w-full h-12 rounded-xl bg-primary text-black font-bold text-sm hover:scale-[1.02] transition-transform active:scale-95">
              {isSubmitting ? t("home.contact.sending") : t("home.contact.send")}
            </Button>
            </form>
          </motion.div>

          </div>
        </div>
        </motion.section>
      </main>

      <Footer />
      </motion.div>
    </AnimatePresence>
  );
};

export default Index;
