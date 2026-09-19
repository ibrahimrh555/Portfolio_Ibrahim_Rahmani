import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const NotFound = () => {
  const location = useLocation();
  const { t } = useTranslation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background text-foreground">
      <div className="text-center">
        <h1 className="mb-4 text-6xl font-bold">404</h1>
        <h2 className="mb-2 text-2xl font-semibold">{t("notFound.title")}</h2>
        <p className="mb-6 text-muted-foreground">{t("notFound.description")}</p>
        <Link to="/" className="text-primary underline underline-offset-4 hover:text-accent">
          {t("notFound.home")}
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
