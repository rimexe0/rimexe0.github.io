import Link from "next/link";
import "./blog.css";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-3xl pt-6 pb-16">
      <nav className="mb-8 flex items-center gap-2 text-sm text-black">
        <Link href="/" className="blog-nav-link">
          ← rime
        </Link>
        <Link href="/blog" className="blog-nav-link font-semibold">
          lab log
        </Link>
        <a
          href="/blog/rss.xml"
          className="blog-nav-link ml-auto"
          title="RSS feed"
        >
          <i className="bi bi-rss" aria-hidden /> rss
        </a>
      </nav>
      {children}
    </div>
  );
}
