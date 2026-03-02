import Link from "next/link";
import { getAllBlogPosts } from "@/lib/blog";

export default function Home() {
  const posts = getAllBlogPosts();

  return (
    <div className="min-h-screen bg-background">
      <main className="mx-auto flex min-h-screen max-w-xl flex-col justify-center px-6 py-24">
        <h1 className="font-serif text-4xl font-semibold tracking-tight text-foreground">
          Kirill's HCI Blog
        </h1>
        <p className="mt-2 text-base text-zinc-500">
          A curated collection of thoughts on HCI.
        </p>

        <nav className="mt-12 flex flex-col gap-1" aria-label="Blog posts">
          {posts.length === 0 ? (
            <p className="text-zinc-500">
              No posts yet. Add markdown files to{" "}
              <code className="rounded bg-zinc-800/80 px-1.5 py-0.5 text-sm">
                content/blog/
              </code>
              .
            </p>
          ) : (
            posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group block py-2.5 transition-colors hover:text-foreground"
              >
                <span className="font-serif text-xl font-medium text-foreground group-hover:underline">
                  {post.title}
                </span>
                {post.description && (
                  <p className="mt-0.5 text-sm text-zinc-500 group-hover:text-zinc-400">
                    {post.description}
                  </p>
                )}
              </Link>
            ))
          )}
        </nav>
      </main>
    </div>
  );
}
