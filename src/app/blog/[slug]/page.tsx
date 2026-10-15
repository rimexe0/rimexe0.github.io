import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypePrettyCode from "rehype-pretty-code";
import {
  assetUrl,
  formatDate,
  getAllPosts,
  getPost,
  SITE_URL,
} from "@/lib/blog";
import { postComponents } from "@/components/blog/mdx";
import { TagChip } from "@/components/blog/PostCard";
import { panelColor } from "@/components/blog/colors";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  const images = post.cover
    ? [{ url: `${SITE_URL}${assetUrl(slug, post.cover)}` }]
    : undefined;
  return {
    title: `${post.title} · rime`,
    description: post.summary,
    alternates: {
      canonical: `/blog/${slug}`,
      types: { "application/rss+xml": "/blog/rss.xml" },
    },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.summary,
      publishedTime: post.date,
      tags: post.tags,
      ...(images ? { images } : {}),
    },
    twitter: {
      card: images ? "summary_large_image" : "summary",
      title: post.title,
      description: post.summary,
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const posts = getAllPosts();
  const index = posts.findIndex((p) => p.slug === slug);
  const newer = index > 0 ? posts[index - 1] : null;
  const older =
    index >= 0 && index < posts.length - 1 ? posts[index + 1] : null;

  return (
    <article
      className="border-2 border-dashed border-black text-black shadow-[10px_10px_0_0_rgba(0,0,0,0.75)]"
      style={{ background: panelColor(post.slug) }}
    >
      <header className="border-b-2 border-dashed border-black p-4 sm:p-6">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm opacity-70">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span>{post.readingMinutes} min read</span>
          {post.draft ? (
            <span className="bg-black px-1 text-xs text-white opacity-100">
              draft, hidden in production
            </span>
          ) : null}
        </div>
        <h1 className="mt-2 text-3xl font-semibold leading-tight sm:text-4xl">
          {post.title}
        </h1>
        {post.summary ? (
          <p className="mt-2 text-lg leading-snug">{post.summary}</p>
        ) : null}
        <div className="mt-3 flex flex-wrap items-center gap-1">
          {post.tags.map((t) => (
            <TagChip key={t} tag={t} />
          ))}
          {post.repo ? (
            <a
              href={post.repo}
              target="_blank"
              rel="noreferrer"
              className="ml-auto rounded-tl-md rounded-br-md border-[1.5px] border-black bg-black p-1 text-xs text-white transition-shadow hover:shadow-md"
            >
              <i className="bi bi-github" aria-hidden /> source
            </a>
          ) : null}
        </div>
      </header>

      <div className="post-body p-4 sm:p-6">
        <MDXRemote
          source={post.content}
          components={postComponents(slug)}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkGfm],
              rehypePlugins: [
                rehypeSlug,
                [
                  rehypePrettyCode,
                  { theme: "github-dark-dimmed", keepBackground: true },
                ],
              ],
            },
          }}
        />
      </div>

      {older || newer ? (
        <footer className="grid grid-cols-2 gap-2 border-t-2 border-dashed border-black p-4 text-sm">
          <div>
            {older ? (
              <Link href={`/blog/${older.slug}`} className="blog-nav-link">
                ← {older.title}
              </Link>
            ) : null}
          </div>
          <div className="text-right">
            {newer ? (
              <Link href={`/blog/${newer.slug}`} className="blog-nav-link">
                {newer.title} →
              </Link>
            ) : null}
          </div>
        </footer>
      ) : null}
    </article>
  );
}
