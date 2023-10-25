import "@/styles/posts/index.css";

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return <div>{children}</div>;
}
