import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Remy de Klein",
  description: "Building tech people love. Synesthesia powered.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0a0a0a",
  colorScheme: "dark",
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
