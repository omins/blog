import { Metadata } from "next";
import { notFound } from "next/navigation";
import { BASE_OG, METADATA } from "@/lib/metadata";
import { getPosts } from "@/lib/posts";
import Comments from "@/components/comments";
import JsonLd from "@/components/json-ld";
import Header from "@/components/layout/post/header";
import { Mdx } from "@/components/mdx-components";
import RelatedPosts from "@/components/related-posts";

export const dynamicParams = false;

interface PostProps {
  params: {
    slug: string;
  };
}

export default function PostPage({ params }: PostProps) {
  const post = getPostFromParams(params);

  if (!post) {
    notFound();
  }

  return (
    <>
      <JsonLd data={post.structuredData} />
      <article className="prose max-w-none break-words px-4 pb-6 dark:prose-invert">
        <Header post={post} />
        <Mdx code={post.body.code} />
      </article>
      <RelatedPosts currentPost={post} />
      <Comments />
    </>
  );
}

export function generateMetadata({ params }: PostProps): Metadata {
  const post = getPostFromParams(params);

  if (!post) {
    return {};
  }

  const {
    title,
    description: postDescription,
    url_path: path,
    image,
    tags: keywords,
  } = post;

  const ogImageUrl = getOgImageUrl(image);
  const url = getOgUrl(path);
  const description = getDescription(postDescription, title);

  return {
    title: {
      absolute: title,
    },
    description,
    keywords,
    openGraph: {
      ...BASE_OG,
      title,
      description,
      url,
      images: [{ url: ogImageUrl, alt: title }],
    },
  } as Metadata;
}

function getOgImageUrl(image: string | undefined): string {
  const { url } = METADATA;
  return image ? `${url}${image}` : `${url}/placeholder.png`;
}

function getDescription(
  description: string | undefined,
  postTitle: string,
): string {
  const { title } = METADATA;
  return description || `${title} - ${postTitle}`;
}

function getOgUrl(path: string): string {
  const { url } = METADATA;
  return `${url}${path}`;
}

export function generateStaticParams(): PostProps["params"][] {
  const allPosts = getPosts();
  return allPosts.map((post) => ({
    slug: post.slug,
  }));
}

function getPostFromParams(params: PostProps["params"]) {
  const allPosts = getPosts();
  const post = allPosts.find((post) => post.slug === params?.slug);

  return !post ? null : post;
}
