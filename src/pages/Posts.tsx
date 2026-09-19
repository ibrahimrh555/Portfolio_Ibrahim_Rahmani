import { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ArrowRight, Filter, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { formatDate, getPosts, type PostSummary } from "@/lib/api";
import { useTranslation } from "react-i18next";

const Posts = () => {
  const { t, i18n } = useTranslation();
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
  }, [i18n.resolvedLanguage]);

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
              <p className="text-center text-white/40">{t("posts.loading")}</p>
            )}

            {error && !loading && (
              <p className="text-center text-red-400">
                {t("posts.error")}
              </p>
            )}

            {!loading && !error && posts.length === 0 && (
              <p className="text-center text-white/40">{t("posts.empty")}</p>
            )}

            {!loading && !error && featuredPosts.length > 0 && (
              <section className="mb-24">
                <div className="flex items-center gap-2 mb-10">
                  <TrendingUp className="h-4 w-4 text-primary" />
                  <h2 className="text-sm font-bold uppercase tracking-widest text-white/50">{t("posts.featured")}</h2>
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
                            <span className="text-[10px] font-bold uppercase tracking-widest text-white/20">• {t("posts.minutes", { count: post.read_time })}</span>
                          </div>
                          <h3 className="text-3xl font-bold tracking-tight group-hover:text-primary transition-colors">{post.title}</h3>
                          <p className="text-white/40 leading-relaxed line-clamp-2">{post.excerpt}</p>
                          <div className="flex items-center gap-2 text-sm font-bold">{t("posts.read")} <ArrowRight className="h-4 w-4 text-primary" /></div>
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
                <h2 className="text-sm font-bold uppercase tracking-widest text-white/50">{t("posts.all")}</h2>
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
