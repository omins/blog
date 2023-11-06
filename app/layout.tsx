import { Metadata } from "next";
import Script from "next/script";
import { BASE_OG, METADATA, getAllKeywords } from "@/lib/metadata";
import Header from "@/components/layout/header";
import "@/styles/globals.css";
import Providers from "./providers";

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  const { gtagId } = METADATA;
  return (
    <html lang="en" className="scroll-smooth">
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${gtagId}`} />
      <Script id="gtag-script">
        {`window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', '${gtagId}');`}
      </Script>
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
  const {
    title,
    author,
    description,
    url,
    googleSiteVerificationCode,
    naverSiteVerificationCode,
  } = METADATA;
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
      "naver-site-verification": naverSiteVerificationCode,
      "google-site-verification": googleSiteVerificationCode,
    },
  };
}
