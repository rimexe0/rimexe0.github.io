import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

// Each post lives in its own folder: content/blog/<slug>/index.mdx
// Anything else in that folder (photos, videos, gifs) is copied to
// public/blog/<slug>/ by scripts/sync-blog-assets.mjs, so posts can use
// plain relative paths like ![](./trackball.jpg).
// Folders starting with "_" (like _template) are ignored.
export const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export type PostMeta = {
  slug: string;
  title: string;
  date: string; // YYYY-MM-DD
  summary: string;
  tags: string[];
  cover?: string; // relative to the post folder, e.g. "./cover.jpg"
  repo?: string; // link to the project's repo or website
  draft: boolean;
  readingMinutes: number;
};

export type Post = PostMeta & { content: string };

const showDrafts = process.env.NODE_ENV !== "production";

function slugDirs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory() && !d.name.startsWith("_"))
    .filter((d) => fs.existsSync(path.join(BLOG_DIR, d.name, "index.mdx")))
    .map((d) => d.name);
}

function toDateString(value: unknown, slug: string): string {
  // gray-matter turns unquoted YAML dates into Date objects.
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value)) return value;
  throw new Error(`[blog] ${slug}: "date" must be YYYY-MM-DD`);
}

function readPost(slug: string): Post {
  const file = fs.readFileSync(path.join(BLOG_DIR, slug, "index.mdx"), "utf8");
  const { data, content } = matter(file);
  if (!data.title) throw new Error(`[blog] ${slug}: missing "title"`);

  const words = content.split(/\s+/).filter(Boolean).length;
  return {
    slug,
    title: String(data.title),
    date: toDateString(data.date, slug),
    summary: data.summary ? String(data.summary) : "",
    tags: Array.isArray(data.tags) ? data.tags.map((t) => String(t).toLowerCase()) : [],
    cover: data.cover ? String(data.cover) : undefined,
    repo: data.repo ? String(data.repo) : undefined,
    draft: data.draft === true,
    readingMinutes: Math.max(1, Math.round(words / 220)),
    content,
  };
}

export function getAllPosts(): PostMeta[] {
  return slugDirs()
    .map(readPost)
    .filter((p) => showDrafts || !p.draft)
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : a.slug.localeCompare(b.slug)))
    .map(({ content: _content, ...meta }) => meta);
}

export function getPost(slug: string): Post | null {
  if (!slugDirs().includes(slug)) return null;
  const post = readPost(slug);
  if (post.draft && !showDrafts) return null;
  return post;
}

export function getAllTags(): { tag: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const post of getAllPosts()) {
    for (const tag of post.tags) counts.set(tag, (counts.get(tag) ?? 0) + 1);
  }
  return [...counts]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
}

// "./photo.jpg" or "photo.jpg" inside a post -> "/blog/<slug>/photo.jpg"
export function assetUrl(slug: string, src: string): string {
  if (/^(https?:|\/|data:|#)/.test(src)) return src;
  return `/blog/${slug}/${src.replace(/^\.\//, "")}`;
}

export function formatDate(date: string): string {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

export const SITE_URL = "https://rime.cyou";
