import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import Background from "./background";
import Navbar from "./navbar";
import { SpeedInsights } from "@vercel/speed-insights/next";
const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});
import { cn } from "@/lib/utils";
import { generateColor } from "@/components/helpers/helping";

const siteUrl = "https://rime.cyou";
const fullName = "Emir Öztürk";
const siteTitle = `${fullName} (rime) | Fullstack Web Developer`;
const siteDescription =
  "Emir Öztürk (rime / rimexe0) is a fullstack web developer from Türkiye building Rust, React and Tauri apps: DuckedUpChat, Meva, not., Githubers and the Wooter Hall-effect keypad.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: siteTitle,
  description: siteDescription,
  authors: [{ name: fullName, url: siteUrl }],
  creator: fullName,
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "profile",
    url: "/",
    siteName: "rime",
    title: siteTitle,
    description: siteDescription,
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 675,
        alt: "rime - Emir Öztürk, fullstack web developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/og.jpg"],
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: fullName,
  alternateName: ["rime", "rimexe", "rimexe0"],
  url: siteUrl,
  jobTitle: "Fullstack Web Developer",
  description: siteDescription,
  address: { "@type": "PostalAddress", addressCountry: "TR" },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Izmir University of Economics",
  },
  knowsAbout: ["Rust", "React", "Next.js", "TypeScript", "Tauri", "Electron"],
  sameAs: ["https://github.com/rimexe0", "https://www.linkedin.com/in/rimexe/"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const color = generateColor("pink-background");
  return (
    <html lang="en">
      <body
        className={cn(
          `min-h-screen h-fit   font-sans antialiased dark`,
          fontSans.variable
        )}
        style={{ backgroundColor: color }}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <Background />
        <SpeedInsights />
        {/* <Navbar /> */}
        <div className="z-10 relative w-[85%] mx-auto">{children}</div>
      </body>
    </html>
  );
}
