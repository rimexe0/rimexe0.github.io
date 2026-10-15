import type { MDXComponents } from "mdx/types";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { assetUrl } from "@/lib/blog";

// Components available inside every post, plus overrides that make
// relative media paths ("./photo.jpg") resolve to the post's folder.
export function postComponents(slug: string): MDXComponents {
  return {
    img: ({ src, alt, ...rest }: ComponentPropsWithoutRef<"img">) => (
      // Plain <img>: post photos come in any size, and lazy loading keeps long posts light.
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={typeof src === "string" ? assetUrl(slug, src) : undefined}
        alt={alt ?? ""}
        loading="lazy"
        decoding="async"
        {...rest}
      />
    ),
    a: ({ href = "", ...rest }: ComponentPropsWithoutRef<"a">) => {
      const external = /^https?:/.test(href);
      const local = !external && !href.startsWith("#") && !href.startsWith("/");
      return (
        <a
          href={local ? assetUrl(slug, href) : href}
          {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
          {...rest}
        />
      );
    },

    // <Figure src="./board.jpg" caption="the wiring, before the smoke" />
    Figure: ({ src, alt, caption }: { src: string; alt?: string; caption?: ReactNode }) => (
      <figure>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={assetUrl(slug, src)} alt={alt ?? ""} loading="lazy" decoding="async" />
        {caption ? <figcaption>{caption}</figcaption> : null}
      </figure>
    ),

    // <Gallery images={["./1.jpg", "./2.jpg", "./3.jpg"]} />
    Gallery: ({ images, alt }: { images: string[]; alt?: string }) => (
      <div className="post-gallery">
        {images.map((src) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img key={src} src={assetUrl(slug, src)} alt={alt ?? ""} loading="lazy" decoding="async" />
        ))}
      </div>
    ),

    // <Video src="./spin.mp4" caption="it spins" />  (muted loop, like a gif but smaller)
    Video: ({ src, caption }: { src: string; caption?: ReactNode }) => (
      <figure>
        <video src={assetUrl(slug, src)} autoPlay muted loop playsInline controls preload="metadata" />
        {caption ? <figcaption>{caption}</figcaption> : null}
      </figure>
    ),

    // <YouTube id="dQw4w9WgXcQ" />
    YouTube: ({ id, title }: { id: string; title?: string }) => (
      <div className="post-embed">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}`}
          title={title ?? "YouTube video"}
          loading="lazy"
          allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    ),

    // <Note>careful, this one actually bricked something</Note>
    Note: ({ children, kind = "note" }: { children: ReactNode; kind?: "note" | "warn" | "fail" }) => (
      <aside className={`post-note post-note-${kind}`}>
        <span className="post-note-label">{kind === "warn" ? "careful" : kind === "fail" ? "didn't work" : "note"}</span>
        <div>{children}</div>
      </aside>
    ),
  };
}
