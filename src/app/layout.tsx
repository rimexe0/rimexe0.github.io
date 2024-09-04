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

export const metadata: Metadata = {
  title: "rime - portfolio",
  description: "Fullstack webdeveloper",
  creator: "Emir Ozturk",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const color = generateColor();
  return (
    <html lang="en">
      <body
        className={cn(
          `min-h-screen h-fit   font-sans antialiased dark`,
          fontSans.variable
        )}
        style={{ backgroundColor: color }}
      >
        <Background />
        <SpeedInsights />
        {/* <Navbar /> */}
        <div className="z-10 relative w-[85%] mx-auto">{children}</div>
      </body>
    </html>
  );
}
