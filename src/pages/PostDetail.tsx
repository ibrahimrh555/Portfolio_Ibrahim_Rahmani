import { useEffect, useMemo, useState } from "react";
import Navigation from "@/components/Navigation";
import { useParams, Link } from "react-router-dom";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatDate, getPost, type PostDetail as PostDetailType } from "@/lib/api";
import { useTranslation } from "react-i18next";

const PostDetail = () => {
  const { t, i18n } = useTranslation();
  const { slug = "" } = useParams();
  const [post, setPost] = useState<PostDetailType | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const sanitizedContent = useMemo(() => {
    if (!post?.content) return "";

    const documentFragment = new DOMParser().parseFromString(post.content, "text/html");
    documentFragment.querySelectorAll("script, iframe, object, embed, form").forEach((element) => element.remove());
    documentFragment.querySelectorAll("*").forEach((element) => {
      Array.from(element.attributes).forEach((attribute) => {
        if (attribute.name.startsWith("on") || attribute.name === "style") {
          element.removeAttribute(attribute.name);
        }
      });
    });

    return documentFragment.body.innerHTML;
  }, [post?.content]);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setNotFound(false);
    getPost(slug, controller.signal)
      .then((data) => {
        setPost(data);
      })
      .catch((requestError) => {
        if (requestError instanceof DOMException && requestError.name === "AbortError") return;
        setNotFound(true);
      })
      .finally(() => setLoading(false));
    return () => controller.abort();
  }, [slug, i18n.resolvedLanguage]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#030303] text-white">
        <Navigation />
        <main className="pt-40 text-center">
          <p className="text-white/40">{t("postDetail.loading")}</p>
        </main>
      </div>
    );
  }

  if (notFound || !post) {
    return (
      <div className="min-h-screen bg-[#030303] text-white">
        <Navigation />
        <main className="pt-40 text-center">
          <h1 className="text-4xl font-bold mb-6">{t("postDetail.notFound")}</h1>
          <Link to="/posts" className="text-primary">{t("postDetail.back")}</Link>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030303] text-white selection:bg-primary/30">
      <Navigation />
      <main className="pt-32 pb-24">
        <article className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto mb-20">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <Link to="/posts" className="inline-flex items-center gap-2 text-white/40 hover:text-primary transition-colors mb-8 group">
                <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                {t("postDetail.back")}
              </Link>

              <div className="grid items-stretch gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)]">
                <div className="flex flex-col justify-center">
                  <div className="flex flex-wrap items-center gap-3 mb-6">
                    {post.category && <Badge className="bg-primary/10 text-primary border-none uppercase tracking-widest text-[10px]">{post.category}</Badge>}
                    <div className="flex items-center gap-2 text-white/40 text-sm">
                      <Calendar className="h-4 w-4" />
                      {formatDate(post.published_at)}
                    </div>
                  </div>
                  <h1 className="text-4xl md:text-6xl font-bold tracking-tighter leading-tight mb-8">{post.title}</h1>
                  <div className="flex items-center gap-2 text-white/40 text-sm py-6 border-y border-white/10">
                    <Clock className="h-4 w-4" />
                    {t("postDetail.readTime", { count: post.read_time })}
                  </div>
                </div>

                {post.cover_image_url && (
                  <div className="aspect-[4/3] overflow-hidden rounded-[2rem] border border-white/10 bg-white/5">
                    <img src={post.cover_image_url} alt={post.title} className="h-full w-full object-cover transition-transform duration-700 hover:scale-105" />
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          <div className="max-w-3xl mx-auto">
            <div
              dangerouslySetInnerHTML={{ __html: sanitizedContent }}
              className="prose prose-lg prose-invert prose-primary max-w-none prose-headings:font-display prose-headings:tracking-tight prose-h2:mt-12 prose-h2:mb-4 prose-h2:text-3xl prose-p:my-5 prose-p:leading-8 prose-p:text-white/65"
            />
            <div className="mt-16 pt-8 border-t border-white/10 flex flex-wrap gap-3">
              {post.tags.map((tag) => (
                <span key={tag} className="px-4 py-2 bg-white/5 rounded-full text-sm text-white/40">#{tag}</span>
              ))}
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default PostDetail;
