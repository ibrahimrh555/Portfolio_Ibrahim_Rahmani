import { useEffect, useMemo, useState } from "react";
import Navigation from "@/components/Navigation";
import { useParams, Link } from "react-router-dom";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatDate, getPost, type PostDetail as PostDetailType } from "@/lib/api";
import { useTranslation } from "react-i18next";
import Seo from "@/components/Seo";
import { SITE_URL } from "@/lib/seo";

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
        <main id="main-content" tabIndex={-1} className="pt-40 text-center">
          <p role="status" className="text-white/40">{t("postDetail.loading")}</p>
        </main>
      </div>
    );
  }

  if (notFound || !post) {
    return (
      <div className="min-h-screen bg-[#030303] text-white">
        <Navigation />
        <main id="main-content" tabIndex={-1} className="pt-40 text-center">
          <h1 className="text-4xl font-bold mb-6">{t("postDetail.notFound")}</h1>
          <Link to="/posts" className="text-primary">{t("postDetail.back")}</Link>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030303] text-white selection:bg-primary/30">
      <Seo
        title={`${post.title} | Ibrahim Rahmani`}
        description={post.excerpt}
        path={`/posts/${post.slug}`}
        image={post.cover_image_url}
        type="article"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: post.excerpt,
          image: post.cover_image_url,
          datePublished: post.published_at,
          dateModified: post.updated_at,
          mainEntityOfPage: `${SITE_URL}/posts/${post.slug}`,
          author: { "@type": "Person", name: "Ibrahim Rahmani", url: SITE_URL },
        }}
      />
      <Navigation />
      <main id="main-content" tabIndex={-1} className="pt-32 pb-24">
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
              className="max-w-none text-lg text-white/70
                [&_h1]:mt-14 [&_h1]:mb-6 [&_h1]:font-display [&_h1]:text-4xl [&_h1]:font-bold [&_h1]:tracking-tight [&_h1]:text-white
                [&_h2]:mt-12 [&_h2]:mb-5 [&_h2]:border-l-4 [&_h2]:border-primary [&_h2]:pl-5 [&_h2]:font-display [&_h2]:text-3xl [&_h2]:font-bold [&_h2]:tracking-tight [&_h2]:text-white
                [&_h3]:mt-10 [&_h3]:mb-4 [&_h3]:font-display [&_h3]:text-2xl [&_h3]:font-semibold [&_h3]:text-white
                [&_p]:my-5 [&_p]:leading-8
                [&_ul]:my-6 [&_ul]:space-y-3 [&_ul]:pl-6 [&_ul]:list-disc [&_ul]:marker:text-primary
                [&_ol]:my-6 [&_ol]:space-y-3 [&_ol]:pl-6 [&_ol]:list-decimal [&_ol]:marker:font-bold [&_ol]:marker:text-primary
                [&_li]:pl-2 [&_li]:leading-8
                [&_blockquote]:my-8 [&_blockquote]:border-l-4 [&_blockquote]:border-primary [&_blockquote]:bg-white/[0.03] [&_blockquote]:px-6 [&_blockquote]:py-4 [&_blockquote]:italic
                [&_hr]:my-10 [&_hr]:border-white/10
                [&_a]:font-medium [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-4
                [&_strong]:font-semibold [&_strong]:text-white"
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
