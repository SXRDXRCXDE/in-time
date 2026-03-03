import { useParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import HeroBackgroundAnimation from "@/components/HeroBackgroundAnimation/HeroBackgroundAnimation";
import { getPostBySlug } from "@/data/blogPosts";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Clock } from "lucide-react";

function formatDate(dateStr: string, locale: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString(locale === "cs" ? "cs-CZ" : locale === "ru" ? "ru-RU" : locale === "he" ? "he-IL" : "en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const { t, i18n } = useTranslation();
  const locale = i18n.language?.split("-")[0] || "cs";
  const post = slug ? getPostBySlug(slug) : undefined;

  if (!post) {
    return (
      <div className="min-h-screen text-foreground">
        <Header />
        <HeroBackgroundAnimation />
        <main className="pt-32 pb-20 container-custom text-center">
          <h1 className="text-2xl font-medium mb-4">{t("pages.blog.notFound")}</h1>
          <Button asChild variant="outline">
            <Link to="/blog">{t("pages.blog.backToBlog")}</Link>
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  const title = t(`pages.blog.posts.${post.slug}.title`, { defaultValue: post.title });
  const excerpt = t(`pages.blog.posts.${post.slug}.excerpt`, { defaultValue: post.excerpt });
  const body = t(`pages.blog.posts.${post.slug}.body`, { defaultValue: post.body });
  const category = t(`pages.blog.posts.${post.slug}.category`, { defaultValue: post.category });

  return (
    <div className="min-h-screen text-foreground">
      <Header />
      <HeroBackgroundAnimation />
      <main className="pt-32 pb-20">
        <div className="container-custom max-w-3xl">
          <Button asChild variant="ghost" size="sm" className="mb-8 -ml-2">
            <Link to="/blog" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              {t("pages.blog.backToBlog")}
            </Link>
          </Button>

          <article>
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                {formatDate(post.date, locale)}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                {post.readTime}
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium">
                {category}
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-light mb-6">{title}</h1>
            <p className="text-xl text-muted-foreground mb-8">{excerpt}</p>

            {body && (
              <div className="prose prose-invert max-w-none text-muted-foreground leading-relaxed">
                <p>{body}</p>
              </div>
            )}
          </article>
        </div>
      </main>
      <Footer />
    </div>
  );
}
