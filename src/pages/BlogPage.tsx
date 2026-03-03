import { useTranslation } from "react-i18next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import HeroBackgroundAnimation from "@/components/HeroBackgroundAnimation/HeroBackgroundAnimation";
import { Link } from "react-router-dom";
import { blogPosts } from "@/data/blogPosts";
import { Calendar, Clock } from "lucide-react";

function formatDate(dateStr: string, locale: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString(locale === "cs" ? "cs-CZ" : locale === "ru" ? "ru-RU" : locale === "he" ? "he-IL" : "en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogPage() {
  const { t, i18n } = useTranslation();
  const locale = i18n.language?.split("-")[0] || "cs";

  return (
    <div className="min-h-screen text-foreground">
      <Header />
      <HeroBackgroundAnimation />
      <main className="pt-32 pb-20">
        <div className="container-custom max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-light mb-4">{t("pages.blog.title")}</h1>
          <p className="text-xl text-muted-foreground mb-12">{t("pages.blog.intro")}</p>

          <div className="space-y-8">
            {blogPosts.map((post) => {
              const title = t(`pages.blog.posts.${post.slug}.title`, { defaultValue: post.title });
              const excerpt = t(`pages.blog.posts.${post.slug}.excerpt`, { defaultValue: post.excerpt });
              const category = t(`pages.blog.posts.${post.slug}.category`, { defaultValue: post.category });
              return (
                <article
                  key={post.slug}
                  className="group border border-border rounded-2xl overflow-hidden bg-card/30 hover:bg-card/50 transition-colors"
                >
                  <Link to={`/blog/${post.slug}`} className="block p-6 md:p-8">
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-3">
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
                    <h2 className="text-xl md:text-2xl font-medium mb-2 group-hover:text-primary transition-colors">
                      {title}
                    </h2>
                    <p className="text-muted-foreground">{excerpt}</p>
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
