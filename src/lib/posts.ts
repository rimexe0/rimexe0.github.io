import fs from "node:fs";
import path from "node:path";
import type { MDXContent } from "mdx/types";

export type PostMeta = {
  title: string;
  date: string;
  desc?: string;
  tags?: string[];
};

export type Post = PostMeta & { slug: string; excerpt: string };

const POSTS_DIR = path.join(process.cwd(), "src/content/blog");

export async function getPost(slug: string) {
  const post = await import(`@/content/blog/${slug}.mdx`);
  return {
    Content: post.default as MDXContent,
    meta: post.meta as PostMeta,
  };
}

export async function getPosts(): Promise<Post[]> {
  const files = fs.readdirSync(POSTS_DIR).filter((file) => file.endsWith(".mdx"));
  const posts = await Promise.all(
    files.map(async (file) => {
      const slug = file.replace(/\.mdx$/, "");
      const { meta } = await getPost(slug);
      const source = fs.readFileSync(path.join(POSTS_DIR, file), "utf8");
      return { ...meta, slug, excerpt: getExcerpt(source) };
    })
  );
  return posts.sort((a, b) => b.date.localeCompare(a.date));
}

// Rough plain-text preview of a post: drops the meta block, imports,
// code blocks, components and markdown symbols, then cuts it short.
function getExcerpt(source: string, length = 160) {
  const text = source
    .replace(/export const meta = \{[\s\S]*?\n\};?/, "")
    .replace(/^(import|export) .*$/gm, "")
    .replace(/```[\s\S]*?```/g, "")
    .replace(/<[^>]*>/g, "")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/^\s*[-+] /gm, "")
    .replace(/[#*_`>]/g, "")
    .replace(/\s+/g, " ")
    .trim();
  return text.length > length ? text.slice(0, length).trimEnd() + "…" : text;
}
