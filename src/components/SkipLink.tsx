import { useTranslation } from "react-i18next";

const SkipLink = () => {
  const { i18n } = useTranslation();
  const label = i18n.resolvedLanguage?.startsWith("en")
    ? "Skip to main content"
    : "Aller au contenu principal";

  return (
    <a
      href="#main-content"
      className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-md bg-primary px-4 py-2 font-semibold text-primary-foreground transition-transform focus:translate-y-0"
    >
      {label}
    </a>
  );
};

export default SkipLink;
