import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Remy de Klein",
  description: "Co-Founder of Augmento. Building the future of immersive experiences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.hugeicons.com/fonts/bulk-rounded/style.css?key=30B49639-59FCDD12-C556A358-60998BF8"
        />
      </head>
      <body className="font-[Inter] antialiased">
        {children}
      </body>
    </html>
  );
}
