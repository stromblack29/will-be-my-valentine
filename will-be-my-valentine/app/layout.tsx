import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Will You Be My Valentine? 💕",
  description: "A special Valentine proposal just for you",
  openGraph: {
    title: "Will You Be My Valentine? 💕",
    description: "A special Valentine proposal just for you",
    type: "website",
    url: "https://will-be-my-valentine-my-dear.vercel.app",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Will You Be My Valentine?",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Will You Be My Valentine? 💕",
    description: "A special Valentine proposal just for you",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
