import Header from "@/components/layout/header";
import "@/styles/globals.css";
import Providers from "./providers";

export const metadata = {
  title: {
    template: `OMIN's %s`,
    default: "OMIN's Blog",
  },
  description: "주로 학습한 내용 혹은 회고글을 올립니다.",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
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
