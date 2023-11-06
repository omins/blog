import { Metadata } from "next";
import { BASE_OG, METADATA, getAllKeywords } from "@/lib/metadata";
import Header from "@/components/layout/header";
import "@/styles/globals.css";
import Providers from "./providers";

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`mx-auto max-w-3xl bg-white text-black antialiased dark:bg-black`}
      >
        <Providers>
          <Header />
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}

export function generateMetadata(): Metadata {
  const keywords = getAllKeywords();
  const { title, author, description, url } = METADATA;
  return {
    metadataBase: new URL(url),
    title: {
      default: title,
      template: "OMIN's %s",
    },
    description,
    keywords,
    authors: [{ name: author }],
    creator: author,
    openGraph: {
      ...BASE_OG,
      title,
      description,
      url,
      siteName: title,
    },
    robots: {
      index: true,
      follow: true,
    },
    other: {
      "naver-site-verification": "602bd1cee0bf47803b3a8ded7546cdfcfa896c3a",
      "google-site-verification": "k0gTQxuyfEuryo_pVhbh0Et0uC4wE1hLam_6kF5GaNA",
    },
  };
}
