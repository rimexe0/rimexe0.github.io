import type { PostMeta } from "@/lib/blog";
import PostCard from "./PostCard";

// Posts grouped by year, newest first.
export default function PostList({ posts }: { posts: PostMeta[] }) {
  if (!posts.length) {
    return (
      <p className="border-2 border-dashed border-black bg-white/90 p-4 text-black">
        Nothing here yet. Something is probably on the desk half-soldered.
      </p>
    );
  }

  const years = new Map<string, PostMeta[]>();
  for (const post of posts) {
    const year = post.date.slice(0, 4);
    years.set(year, [...(years.get(year) ?? []), post]);
  }

  return (
    <div className="flex flex-col gap-10">
      {[...years].map(([year, list]) => (
        <section key={year}>
          <h2 className="mb-3 inline-block bg-black px-2 text-lg font-semibold text-white">{year}</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {list.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
