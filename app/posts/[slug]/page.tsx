import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPosts } from "@/lib/posts";
import Header from "@/components/layout/post/header";
import { Mdx } from "@/components/mdx-components";

export const dynamicParams = false;

interface PostProps {
  params: {
    slug: string;
  };
}

async function getPostFromParams(params: PostProps["params"]) {
  const allPosts = getPosts();
  const post = allPosts.find((post) => post.slug === params?.slug);

  return !post ? null : post;
}

export async function generateMetadata({
  params,
}: PostProps): Promise<Metadata> {
  const post = await getPostFromParams(params);

  if (!post) {
    return {};
  }

  return {
    title: {
      absolute: post.title,
    },
    description: post?.description || `${post.title} - OMIN's Blog`,
  };
}

export async function generateStaticParams(): Promise<PostProps["params"][]> {
  const allPosts = getPosts();
  return allPosts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function PostPage({ params }: PostProps) {
  const post = await getPostFromParams(params);

  if (!post) {
    notFound();
  }

  return (
    <article className="prose max-w-none break-words px-4 pb-6 dark:prose-invert">
      <Header post={post} />
      <Mdx code={post.body.code} />
    </article>
  );
}
