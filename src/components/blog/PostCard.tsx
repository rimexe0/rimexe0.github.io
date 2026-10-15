import Link from "next/link";
import { assetUrl, formatDate, type PostMeta } from "@/lib/blog";
import { tagColor } from "./colors";

export function TagChip({ tag, active = false }: { tag: string; active?: boolean }) {
  return (
    <Link
      href={`/blog/tags/${encodeURIComponent(tag)}`}
      className={
        "blog-tag inline-block px-1.5 py-0.5 text-xs text-black rounded-tr-md rounded-bl-md border-[1.5px] border-black transition-shadow hover:shadow-[3px_3px_0_0_rgba(0,0,0,0.75)]" +
        (active ? " font-bold" : "")
      }
      style={{ background: tagColor(tag) }}
    >
      #{tag}
    </Link>
  );
}

export default function PostCard({ post }: { post: PostMeta }) {
  return (
    <article className="blog-card group relative border-2 border-dashed border-black text-black">
      {post.cover ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={assetUrl(post.slug, post.cover)}
          alt=""
          loading="lazy"
          className="w-full aspect-[16/9] object-cover border-b-2 border-dashed border-black"
        />
      ) : null}
      <div className="p-3 flex flex-col gap-2">
        <div className="flex items-baseline justify-between gap-2 text-xs opacity-70">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span>{post.readingMinutes} min</span>
        </div>
        <h2 className="text-xl font-semibold leading-tight">
          <Link href={`/blog/${post.slug}`} className="after:absolute after:inset-0">
            {post.title}
          </Link>
          {post.draft ? <span className="ml-2 align-middle text-xs bg-black text-white px-1">draft</span> : null}
        </h2>
        {post.summary ? <p className="text-sm leading-snug">{post.summary}</p> : null}
        {post.tags.length ? (
          <div className="relative z-10 flex flex-wrap gap-1 pt-1">
            {post.tags.map((t) => (
              <TagChip key={t} tag={t} />
            ))}
          </div>
        ) : null}
      </div>
    </article>
  );
}
