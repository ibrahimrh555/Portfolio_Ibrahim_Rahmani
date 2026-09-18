import { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ArrowRight, Filter, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { formatDate, getPosts, type PostSummary } from "@/lib/api";

const fallbackPosts: PostSummary[] = [
  {
    id: 1,
    title: "L'ère de l'IA Générative dans le Web Design",
    excerpt: "Comment l'intelligence artificielle redéfinit la création d'interfaces, de la génération de composants au design prédictif.",
    published_at: "2025-01-15T00:00:00Z",
    read_time: 5,
    tags: ["IA", "Design", "Futur"],
    category: "IA & Design",
    slug: "ia-web-design-2025",
    featured: true,
    cover_image_url: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=800",
  },
  {
    id: 2,
    title: "Performance React : Le Guide Ultime",
    excerpt: "Techniques avancées pour créer des applications fluides, maintenables et performantes.",
    published_at: "2025-01-10T00:00:00Z",
    read_time: 8,
    tags: ["React", "Performance"],
    category: "Frontend",
    slug: "optimiser-react-2025",
    featured: true,
    cover_image_url: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=800",
  },
  {
    id: 3,
    title: "TypeScript : rendre son code plus robuste",
    excerpt: "Des pratiques simples pour tirer parti du typage et réduire les erreurs dans une application moderne.",
    published_at: "2025-01-05T00:00:00Z",
    read_time: 6,
    tags: ["TypeScript", "Code"],
    category: "Développement",
    slug: "tips-typescript",
    featured: false,
    cover_image_url: "",
  },
];

const Posts = () => {
  const [posts, setPosts] = useState<PostSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    getPosts(controller.signal)
      .then((data) => {
        setPosts(data);
        setError(false);
      })
      .catch((requestError) => {
        if (requestError instanceof DOMException && requestError.name === "AbortError") return;
        setError(true);
      })
      .finally(() => setLoading(false));
    return () => controller.abort();
  }, []);

  const featuredPosts = posts.filter((post) => post.featured);
  const regularPosts = posts.filter((post) => !post.featured);

  return (
    <div className="min-h-screen bg-[#030303] text-white">
      <Navigation />
      <main className="pt-32 pb-24">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="mb-20">
              <h1 className="font-display text-6xl md:text-8xl font-bold mb-8 tracking-tighter">
                INSIGHTS <span className="text-white/20 italic">& </span>
                ARTICLES<span className="text-primary">.</span>
              </h1>
            </div>

            {loading && (
              <p className="text-center text-white/40">Chargement des articles...</p>
            )}

            {error && !loading && (
              <p className="text-center text-red-400">
                Impossible de charger les articles. Veuillez réessayer plus tard.
              </p>
            )}

            {!loading && !error && posts.length === 0 && (
              <p className="text-center text-white/40">Aucun article publié.</p>
            )}

            {!loading && !error && featuredPosts.length > 0 && (
              <section className="mb-24">
                <div className="flex items-center gap-2 mb-10">
                  <TrendingUp className="h-4 w-4 text-primary" />
                  <h2 className="text-sm font-bold uppercase tracking-widest text-white/50">À la une</h2>
                </div>
                <div className="grid lg:grid-cols-2 gap-10">
                  {featuredPosts.map((post) => (
                    <motion.article key={post.id} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="group">
                      <Link to={`/posts/${post.slug}`} className="block space-y-6">
                        {post.cover_image_url && (
                          <div className="aspect-[16/9] overflow-hidden rounded-2xl bg-white/5 border border-white/10">
                            <img src={post.cover_image_url} alt={post.title} className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105" />
                          </div>
                        )}
                        <div className="space-y-4">
                          <div className="flex flex-wrap items-center gap-3">
                            {post.tags.map((tag) => (
                              <span key={tag} className="text-[10px] font-bold uppercase tracking-widest text-primary">{tag}</span>
                            ))}
                            <span className="text-[10px] font-bold uppercase tracking-widest text-white/20">• {post.read_time} min</span>
                          </div>
                          <h3 className="text-3xl font-bold tracking-tight group-hover:text-primary transition-colors">{post.title}</h3>
                          <p className="text-white/40 leading-relaxed line-clamp-2">{post.excerpt}</p>
                          <div className="flex items-center gap-2 text-sm font-bold">LIRE L'ARTICLE <ArrowRight className="h-4 w-4 text-primary" /></div>
                        </div>
                      </Link>
                    </motion.article>
                  ))}
                </div>
              </section>
            )}

            {!loading && !error && regularPosts.length > 0 && (
            <section>
              <div className="flex items-center justify-between mb-10">
                <h2 className="text-sm font-bold uppercase tracking-widest text-white/50">Tous les articles</h2>
                <Filter className="h-4 w-4 text-white/20" />
              </div>
              <div className="grid gap-4">
                {regularPosts.map((post) => (
                  <article key={post.id} className="group border-b border-white/5 hover:border-primary/30 transition-colors">
                    <Link to={`/posts/${post.slug}`} className="flex flex-col md:flex-row md:items-center justify-between py-8 gap-6">
                      <div className="max-w-2xl space-y-2">
                        <span className="text-[10px] font-bold text-white/20 uppercase tracking-[0.2em]">{formatDate(post.published_at)}</span>
                        <h3 className="text-2xl font-bold group-hover:translate-x-2 transition-transform duration-300">{post.title}</h3>
                        <p className="text-white/40 text-sm line-clamp-1 italic">{post.excerpt}</p>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="hidden md:flex flex-wrap gap-2">
                          {post.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="border-white/10 text-[10px] text-white/40 uppercase">{tag}</Badge>
                          ))}
                        </div>
                        <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary group-hover:text-black transition-all">
                          <ArrowRight className="h-5 w-5 -rotate-45 group-hover:rotate-0 transition-transform" />
                        </div>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            </section>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Posts;
