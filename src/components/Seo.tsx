import { useEffect } from "react";
import { DEFAULT_SOCIAL_IMAGE, SITE_URL } from "@/lib/seo";

type SeoProps = {
  title: string;
  description: string;
  path?: string;
  image?: string;
  type?: "website" | "article";
  noIndex?: boolean;
  structuredData?: Record<string, unknown>;
};

const setMeta = (selector: string, attribute: "name" | "property", value: string) => {
  let element = document.head.querySelector<HTMLMetaElement>(selector);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, value);
    document.head.appendChild(element);
  }
  return element;
};

const Seo = ({
  title,
  description,
  path = "/",
  image = DEFAULT_SOCIAL_IMAGE,
  type = "website",
  noIndex = false,
  structuredData,
}: SeoProps) => {
  useEffect(() => {
    const canonicalUrl = new URL(path, SITE_URL).toString();
    const absoluteImage = new URL(image, SITE_URL).toString();

    document.title = title;
    setMeta('meta[name="description"]', "name", "description").content = description;
    setMeta('meta[name="robots"]', "name", "robots").content = noIndex
      ? "noindex, nofollow"
      : "index, follow, max-image-preview:large";
    setMeta('meta[property="og:title"]', "property", "og:title").content = title;
    setMeta('meta[property="og:description"]', "property", "og:description").content = description;
    setMeta('meta[property="og:type"]', "property", "og:type").content = type;
    setMeta('meta[property="og:url"]', "property", "og:url").content = canonicalUrl;
    setMeta('meta[property="og:image"]', "property", "og:image").content = absoluteImage;
    setMeta('meta[name="twitter:title"]', "name", "twitter:title").content = title;
    setMeta('meta[name="twitter:description"]', "name", "twitter:description").content = description;
    setMeta('meta[name="twitter:image"]', "name", "twitter:image").content = absoluteImage;

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;

    const scriptId = "page-structured-data";
    document.getElementById(scriptId)?.remove();
    if (structuredData) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.type = "application/ld+json";
      script.text = JSON.stringify(structuredData);
      document.head.appendChild(script);
    }
  }, [description, image, noIndex, path, structuredData, title, type]);

  return null;
};

export default Seo;
