import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts, getAllTags } from "@/lib/blog";
import PostList from "@/components/blog/PostList";
import { TagChip } from "@/components/blog/PostCard";
import { panelColor } from "@/components/blog/colors";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllTags().map(({ tag }) => ({ tag }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tag: string }>;
}): Promise<Metadata> {
  const { tag } = await params;
  return { title: `#${decodeURIComponent(tag)} · lab log · rime` };
}

export default async function TagPage({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const tag = decodeURIComponent((await params).tag);
  const posts = getAllPosts().filter((p) => p.tags.includes(tag));

  return (
    <>
      <header
        className="mb-8 border-2 border-dashed border-black p-4 text-black shadow-[10px_10px_0_0_rgba(0,0,0,0.75)]"
        style={{ background: panelColor(tag) }}
      >
        <h1 className="text-4xl font-semibold">#{tag}</h1>
        <p className="mt-1 text-sm opacity-70">
          {posts.length} post{posts.length === 1 ? "" : "s"} ·{" "}
          <Link href="/blog" className="underline">
            all posts
          </Link>
        </p>
        <div className="mt-3 flex flex-wrap gap-1">
          {getAllTags().map(({ tag: t }) => (
            <TagChip key={t} tag={t} active={t === tag} />
          ))}
        </div>
      </header>
      <PostList posts={posts} />
    </>
  );
}
