import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Reveal } from "@/components/site/Reveal";
import { Button } from "@/components/ui/button";
import { getPostBySlug, POSTS } from "@/lib/blog-data";
import { Calendar, Clock, User, ArrowLeft, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = getPostBySlug(params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => {
    const post = loaderData?.post;
    if (!post) return { meta: [{ title: "Article — International Cargo Dispatch" }] };
    return {
      meta: [
        { title: `${post.title} — International Cargo Dispatch` },
        { name: "description", content: post.excerpt },
        { property: "og:title", content: post.title },
        { property: "og:description", content: post.excerpt },
        { property: "og:image", content: post.cover },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:image", content: post.cover },
      ],
    };
  },
  notFoundComponent: () => (
    <SiteLayout>
      <div className="container mx-auto px-4 py-32 text-center">
        <h1 className="text-4xl font-bold">Article not found</h1>
        <p className="text-muted-foreground mt-3">The article you're looking for doesn't exist.</p>
        <Button asChild className="mt-6"><Link to="/blog">Back to Insights</Link></Button>
      </div>
    </SiteLayout>
  ),
  errorComponent: ({ error }) => (
    <SiteLayout>
      <div className="container mx-auto px-4 py-32 text-center">
        <h1 className="text-3xl font-bold">Something went wrong</h1>
        <p className="text-muted-foreground mt-3">{error.message}</p>
        <Button asChild className="mt-6"><Link to="/blog">Back to Insights</Link></Button>
      </div>
    </SiteLayout>
  ),
  component: ArticlePage,
});

function ArticlePage() {
  const { post } = Route.useLoaderData();
  const idx = POSTS.findIndex((p) => p.slug === post.slug);
  const next = POSTS[(idx + 1) % POSTS.length];

  return (
    <SiteLayout>
      {/* Hero */}
      <section className="relative text-primary-foreground overflow-hidden">
        <div className="absolute inset-0">
          <img src={post.cover} alt="" className="absolute inset-0 h-full w-full object-cover animate-ken-burns" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/85 to-primary/60" />
        </div>
        <div className="container mx-auto px-4 lg:px-8 py-24 lg:py-32 relative max-w-4xl">
          <Reveal from="up">
            <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-primary-foreground/80 hover:text-gold transition-colors mb-6">
              <ArrowLeft className="h-4 w-4" /> Back to Insights
            </Link>
            <span className="inline-block text-[10px] uppercase tracking-[0.2em] font-semibold px-2.5 py-1 rounded bg-gold text-gold-foreground">{post.category}</span>
            <h1 className="text-4xl md:text-6xl font-bold mt-5 leading-tight text-balance">{post.title}</h1>
            <div className="mt-6 flex flex-wrap gap-5 text-sm text-primary-foreground/85">
              <span className="inline-flex items-center gap-1.5"><User className="h-4 w-4 text-gold" /> {post.author}</span>
              <span className="inline-flex items-center gap-1.5"><Calendar className="h-4 w-4 text-gold" /> {post.date}</span>
              <span className="inline-flex items-center gap-1.5"><Clock className="h-4 w-4 text-gold" /> {post.readingTime}</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Body */}
      <article className="container mx-auto px-4 lg:px-8 py-16 lg:py-20 max-w-3xl">
        <Reveal from="up">
          <p className="text-xl leading-relaxed text-foreground/90 mb-10 font-medium">{post.excerpt}</p>
        </Reveal>

        <div className="space-y-7">
          {post.content.map((block, i) => (
            <Reveal key={i} from="up" delay={Math.min(i * 40, 280)}>
              {block.type === "p" && (
                <p className="text-base lg:text-lg leading-[1.85] text-foreground/85">{block.text}</p>
              )}
              {block.type === "h2" && (
                <h2 className="text-2xl lg:text-3xl font-bold mt-10 mb-2 text-primary">{block.text}</h2>
              )}
              {block.type === "ul" && (
                <ul className="space-y-2 pl-5 list-disc marker:text-gold">
                  {block.items.map((it, j) => (
                    <li key={j} className="text-base lg:text-lg leading-[1.8] text-foreground/85">{it}</li>
                  ))}
                </ul>
              )}
              {block.type === "quote" && (
                <blockquote className="border-l-4 border-gold pl-6 py-2 my-6 italic text-lg text-foreground/90">
                  &ldquo;{block.text}&rdquo;
                  {block.cite && <footer className="not-italic text-sm text-muted-foreground mt-2">— {block.cite}</footer>}
                </blockquote>
              )}
            </Reveal>
          ))}
        </div>
      </article>

      {/* Next article */}
      <section className="container mx-auto px-4 lg:px-8 pb-24 max-w-3xl">
        <Reveal from="up">
          <div className="rounded-2xl border bg-secondary p-6 flex items-center justify-between gap-4 flex-wrap hover:shadow-elegant transition-shadow">
            <div>
              <div className="text-xs uppercase tracking-wider text-gold font-semibold">Read next</div>
              <Link to="/blog/$slug" params={{ slug: next.slug }} className="text-lg font-semibold hover:text-gold transition-colors">
                {next.title}
              </Link>
            </div>
            <Button asChild variant="outline">
              <Link to="/blog/$slug" params={{ slug: next.slug }}>Read article <ArrowRight className="h-4 w-4" /></Link>
            </Button>
          </div>
        </Reveal>
      </section>
    </SiteLayout>
  );
}
