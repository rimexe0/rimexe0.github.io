import type { Metadata } from "next";
import BlogCard from "@/components/BlogCard";
import { getPosts } from "@/lib/posts";
import IntroMotion from "../intro-motion";
import { CloseOnOutside } from "@/components/go-back";

export const metadata: Metadata = {
  title: "blog - rime",
  alternates: { canonical: "/blog" },
};

export default async function Blog() {
  const posts = await getPosts();
  return (
    <div className="pt-10">
      <IntroMotion />
      <CloseOnOutside fallback="/" />
      <div className="flex justify-center">
        <div className="homepage-entry mb-10 w-full">
          <BlogCard posts={posts} />
        </div>
      </div>
    </div>
  );
}
