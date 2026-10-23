"use client";

import { ViewTransition } from "react";
import Link from "next/link";
import ItemsCard, {
  ItemsCardContent,
  ItemsCardTech,
} from "@/components/ItemsCard";
import type { Post } from "@/lib/posts";
import { blurBehindMorph, morphsIntoCard } from "@/lib/morph-blur";

export default function BlogCard({
  posts,
  home = false,
}: {
  posts: Post[];
  home?: boolean;
}) {
  return (
    <ItemsCard
      title="Blog"
      titleAs={home ? "h2" : "h1"}
      className={home ? "" : "w-auto"}
      action={
        home && (
          <Link
            href="/blog"
            aria-label="All posts"
            className="group bg-black text-white rounded-tr-md rounded-bl-md px-2 py-1"
          >
            <i className="bi bi-arrow-right inline-block transition-transform duration-300 ease-[var(--ease-out)] group-hover:translate-x-1" />
          </Link>
        )
      }
    >
      <div className="flex flex-wrap">
        {posts.map((post) => (
          <ViewTransition
            key={post.slug}
            name={`post-${post.slug}`}
            share="morph-entry"
            default="none"
            onShare={(instance) => {
              // Only blur when the entry grows into a post card.
              if (morphsIntoCard(instance)) blurBehindMorph(instance, "in");
            }}
          >
            <Link
              href={`/blog/${post.slug}`}
              className="block flex-[1_1_20rem]"
              data-vt={`post-${post.slug}`}
            >
              <ItemsCardContent title={post.title} desc={post.excerpt}>
                <div className="flex">
                  {post.tags?.map((tag) => (
                    <ItemsCardTech
                      key={tag}
                      title={tag}
                      className="border-[1.5px] border-black bg-black text-white rounded-none"
                    />
                  ))}
                </div>
                <span className="text-xs">{post.date}</span>
              </ItemsCardContent>
            </Link>
          </ViewTransition>
        ))}
      </div>
    </ItemsCard>
  );
}
