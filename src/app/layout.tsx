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

export const metadata: Metadata = {
  title: "rimexe",
  description: "rimexe rimexe",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen h-fit  bg-background font-sans antialiased dark",
          fontSans.variable
        )}
      >
        <SpeedInsights />
        {/* <Navbar /> */}
        <Background />
        <div className="z-10 relative w-[85%] mx-auto">{children}</div>
      </body>
    </html>
  );
}
