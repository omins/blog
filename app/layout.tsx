import { Metadata } from "next";
import { BASE_OG, METADATA } from "@/lib/metadata/shared-metadata";
import Header from "@/components/layout/header";
import "@/styles/globals.css";
import Providers from "./providers";

export function generateMetadata() {
  const { title, author, description, url } = METADATA;
  return {
    metadataBase: new URL(url),
    title: {
      default: title,
      template: "OMIN's %s",
    },
    authors: [{ name: author }],
    creator: author,
    description,
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
  };
}

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
