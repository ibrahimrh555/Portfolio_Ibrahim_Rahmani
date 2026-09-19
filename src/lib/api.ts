import i18n from "@/i18n";

const DEFAULT_API_URL = "https://portfolio-ibrahim-rahmani-ten.vercel.app/api";
const configuredUrl = import.meta.env.VITE_API_URL?.trim() || DEFAULT_API_URL;
export const isApiConfigured = Boolean(configuredUrl);
const API_URL = configuredUrl.replace(/\/$/, "");

export interface Project {
  id: number;
  title: string;
  slug: string;
  short_description: string;
  description: string;
  image_url: string;
  technologies: string[];
  github_url: string;
  demo_url: string;
  featured: boolean;
  order: number;
  created_at: string;
  updated_at: string;
}

export interface PostSummary {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  cover_image_url: string;
  tags: string[];
  category: string | null;
  featured: boolean;
  read_time: number;
  published_at: string | null;
}

export interface PostDetail extends PostSummary {
  content: string;
  updated_at: string;
}

async function apiRequest<T>(path: string, signal?: AbortSignal): Promise<T> {
  if (!API_URL) {
    throw new Error("VITE_API_URL is not configured");
  }

  const response = await fetch(`${API_URL}${path}`, {
    headers: {
      Accept: "application/json",
      "Accept-Language": i18n.resolvedLanguage?.startsWith("en") ? "en" : "fr",
    },
    signal,
  });

  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export const getProjects = (signal?: AbortSignal) =>
  apiRequest<Project[]>("/projects/", signal);

export const getPosts = (signal?: AbortSignal) =>
  apiRequest<PostSummary[]>("/posts/", signal);

export const getPost = (slug: string, signal?: AbortSignal) =>
  apiRequest<PostDetail>(`/posts/${encodeURIComponent(slug)}/`, signal);

export function formatDate(value: string | null): string {
  if (!value) return "";
  const locale = i18n.resolvedLanguage?.startsWith("en") ? "en-US" : "fr-FR";
  return new Intl.DateTimeFormat(locale, {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}
