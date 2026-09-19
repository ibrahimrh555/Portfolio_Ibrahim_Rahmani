import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "./ui/button";
import type { SupportedLanguage } from "@/i18n";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { t, i18n } = useTranslation();

  const language: SupportedLanguage = i18n.resolvedLanguage?.startsWith("en") ? "en" : "fr";
  const links = [
    { name: t("navigation.home"), path: "/" },
    { name: t("navigation.posts"), path: "/posts" },
    { name: t("navigation.projects"), path: "/projects" },
    { name: t("navigation.about"), path: "/about" },
  ];

  const isActive = (path: string) => location.pathname === path;

  const changeLanguage = (nextLanguage: SupportedLanguage) => {
    void i18n.changeLanguage(nextLanguage);
    setIsOpen(false);
  };

  const LanguageSwitcher = () => (
    <div className="flex items-center rounded-full border border-border/60 bg-background/60 p-1" role="group" aria-label={t("navigation.language")}>
      {(["fr", "en"] as const).map((item) => (
        <button
          key={item}
          type="button"
          onClick={() => changeLanguage(item)}
          aria-pressed={language === item}
          className={`rounded-full px-2.5 py-1 text-xs font-semibold uppercase transition-colors ${
            language === item ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {item}
        </button>
      ))}
    </div>
  );

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-cover backdrop-blur-xl border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 font-display text-4xl font-bold text-primary hover:text-accent transition-colors group">
            <img src={`${import.meta.env.BASE_URL}i%20(1).png`} alt="Logo Ibrahim Rahmani" className="h-12 w-auto transition-transform" />
            Ißrahim
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-all duration-300 relative group ${
                  isActive(link.path) ? "text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.name}
                <span className={`absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-primary to-accent transition-transform origin-left ${
                  isActive(link.path) ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                }`} />
              </Link>
            ))}
            <LanguageSwitcher />
          </div>

          <div className="md:hidden flex items-center gap-2">
            <LanguageSwitcher />
            <Button variant="ghost" size="icon" className="hover:bg-primary/10" onClick={() => setIsOpen(!isOpen)} aria-label={t("navigation.menu")}>
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden py-4 space-y-2 animate-fade-in border-t border-border/30">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block py-3 px-4 text-sm font-medium rounded-lg transition-all duration-300 ${
                  isActive(link.path) ? "text-primary bg-primary/10 border border-primary/30" : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
