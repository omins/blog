import { Metadata } from "next";
import { notFound } from "next/navigation";
import { BASE_OG, METADATA } from "@/lib/metadata";
import { getPosts } from "@/lib/posts";
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
    tags,
  } = post;
  const { url: baseUrl, author } = METADATA;
  const keywords = tags?.join(",");
  const ogImage = image ? `${baseUrl}${image}` : `${baseUrl}/placeholder.png`;
  const description = postDescription || `OMIN's Blog - ${title}`;

  return {
    title: {
      absolute: title,
    },
    keywords,
    authors: [{ name: author }],
    creator: author,
    description,
    openGraph: {
      ...BASE_OG,
      title,
      description,
      url: `${baseUrl}${path}`,
      images: [{ url: ogImage, alt: title }],
    },
  } as Metadata;
}

export async function generateStaticParams(): Promise<PostProps["params"][]> {
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
