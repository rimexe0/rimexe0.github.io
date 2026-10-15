import type { Metadata } from "next";
import { getAllPosts, getAllTags } from "@/lib/blog";
import PostList from "@/components/blog/PostList";
import { TagChip } from "@/components/blog/PostCard";
import { panelColor } from "@/components/blog/colors";

export const metadata: Metadata = {
  title: "lab log · rime",
  description:
    "Hardware and software things I build because I got bored: trackballs from dead mice, ESP32 gadgets, reverse engineering, and more.",
  alternates: { types: { "application/rss+xml": "/blog/rss.xml" } },
};

export default function BlogIndex() {
  const posts = getAllPosts();
  const tags = getAllTags();

  return (
    <>
      <header
        className="mb-8 border-2 border-dashed border-black p-4 text-black shadow-[10px_10px_0_0_rgba(0,0,0,0.75)]"
        style={{ background: panelColor("lab log") }}
      >
        <h1 className="text-4xl font-semibold">lab log</h1>
        <p className="mt-2 max-w-prose">
          Things I build because I got bored. Hardware, software, and whatever
          happens when they meet. Some of it works.
        </p>
        {tags.length ? (
          <div className="mt-3 flex flex-wrap gap-1">
            {tags.map(({ tag }) => (
              <TagChip key={tag} tag={tag} />
            ))}
          </div>
        ) : null}
      </header>
      <PostList posts={posts} />
    </>
  );
}
