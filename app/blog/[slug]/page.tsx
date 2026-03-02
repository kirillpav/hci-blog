import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getBlogPost, getBlogSlugs } from "@/lib/blog";
import Link from "next/link";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getBlogSlugs();
  return slugs.map((s) => ({
    slug: s.replace(/\.md$/, ""),
  }));
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) notFound();

  return (
    <article className="min-h-screen bg-background">
      <main className="mx-auto max-w-xl px-6 py-24">
        <Link
          href="/"
          className="mb-12 inline-block text-sm text-zinc-500 transition-colors hover:text-foreground"
        >
          ← Back
        </Link>

        <header className="mb-12">
          <h1 className="font-serif text-3xl font-semibold tracking-tight text-foreground">
            {post.title}
          </h1>
          {post.date && (
            <time
              dateTime={post.date}
              className="mt-2 block text-sm text-zinc-500"
            >
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          )}
        </header>

        <div className="prose prose-invert prose-zinc max-w-none [&>*:first-child]:mt-0">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({ children }) => (
                <h1 className="font-serif text-2xl font-semibold tracking-tight text-foreground">
                  {children}
                </h1>
              ),
              h2: ({ children }) => (
                <h2 className="font-serif mt-10 text-xl font-semibold tracking-tight text-foreground">
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3 className="font-serif mt-8 text-lg font-semibold tracking-tight text-foreground">
                  {children}
                </h3>
              ),
              p: ({ children }) => (
                <p className="mt-4 leading-7 text-zinc-300">{children}</p>
              ),
              a: ({ href, children }) => (
                <a
                  href={href}
                  className="text-foreground underline decoration-zinc-600 underline-offset-2 hover:decoration-foreground"
                >
                  {children}
                </a>
              ),
              ul: ({ children }) => (
                <ul className="mt-4 list-disc space-y-1 pl-6 text-zinc-300">
                  {children}
                </ul>
              ),
              ol: ({ children }) => (
                <ol className="mt-4 list-decimal space-y-1 pl-6 text-zinc-300">
                  {children}
                </ol>
              ),
              blockquote: ({ children }) => (
                <blockquote className="mt-4 border-l-2 border-zinc-600 pl-4 italic text-zinc-400">
                  {children}
                </blockquote>
              ),
              code: ({ className, children, ...props }) =>
                className ? (
                  <code
                    className={`rounded bg-zinc-800/80 px-1.5 py-0.5 font-mono text-sm ${className}`}
                    {...props}
                  >
                    {children}
                  </code>
                ) : (
                  <code
                    className="rounded bg-zinc-800/80 px-1.5 py-0.5 font-mono text-sm"
                    {...props}
                  >
                    {children}
                  </code>
                ),
              pre: ({ children }) => (
                <pre className="mt-4 overflow-x-auto rounded-lg bg-zinc-900/80 p-4">
                  {children}
                </pre>
              ),
            }}
          >
            {post.content}
          </ReactMarkdown>
        </div>
      </main>
    </article>
  );
}
