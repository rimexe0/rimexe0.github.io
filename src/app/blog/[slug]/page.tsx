import type { Metadata } from "next";
import ItemsCard, { ItemsCardTech } from "@/components/ItemsCard";
import { BackButton, CloseOnOutside } from "@/components/go-back";
import { getPost, getPosts } from "@/lib/posts";
import IntroMotion from "../../intro-motion";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { meta } = await getPost(slug);
  return { title: `${meta.title} - rime`, description: meta.desc };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const { Content, meta } = await getPost(slug);
  return (
    <div className="pt-10">
      <IntroMotion />
      <CloseOnOutside fallback="/blog" />
      <div className="flex justify-center">
        <div className="homepage-entry mb-10 w-full max-w-[64rem]">
          <ItemsCard
            title={meta.title}
            name={`post-${slug}`}
            className="w-auto"
            lead={<BackButton fallback="/blog" />}
            action={
              <div className="flex items-center">
                {meta.tags?.map((tag) => (
                  <ItemsCardTech
                    key={tag}
                    title={tag}
                    className="border-[1.5px] border-black bg-black text-white rounded-none"
                  />
                ))}
                <time className="text-xs text-ink ml-2" dateTime={meta.date}>
                  {meta.date}
                </time>
              </div>
            }
          >
            <article className="card-entry-content px-3 pb-3 text-ink">
              <Content />
            </article>
          </ItemsCard>
        </div>
      </div>
    </div>
  );
}
