import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export interface BlogPost {
  slug: string;
  title: string;
  description?: string;
  date?: string;
  content: string;
}

export function getBlogSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".md"));
}

export function getBlogPost(slug: string): BlogPost | null {
  const filePath = path.join(BLOG_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const fileContents = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContents);

  return {
    slug,
    title: (data.title as string) ?? slug,
    description: data.description as string | undefined,
    date: data.date as string | undefined,
    content,
  };
}

export function getAllBlogPosts(): BlogPost[] {
  const slugs = getBlogSlugs();
  const posts = slugs
    .map((slug) => getBlogPost(slug.replace(/\.md$/, "")))
    .filter((p): p is BlogPost => p !== null);

  return posts.sort((a, b) => {
    const dateA = a.date ? new Date(a.date).getTime() : 0;
    const dateB = b.date ? new Date(b.date).getTime() : 0;
    return dateB - dateA;
  });
}
