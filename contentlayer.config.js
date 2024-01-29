import rehypePrism from "@mapbox/rehype-prism";
import { defineDocumentType, makeSource } from "contentlayer/source-files";
import rehypeAutoLinkHeadings from "rehype-autolink-headings";
import rehypeCodeTitles from "rehype-code-titles";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { getSlugFromPath } from "./lib/posts";

/** @type {import('contentlayer/source-files').ComputedFields} */
const computedFields = {
  slug: {
    type: "string",
    resolve: (doc) => getSlugFromPath(doc._raw.flattenedPath),
  },
  url_path: {
    type: "string",
    resolve: (doc) => `/posts/${getSlugFromPath(doc._raw.flattenedPath)}`,
  },

  structuredData: {
    type: "object",
    resolve: (doc) => {
      const url = process.env.BASE_URL || "https://www.omin.dev";
      // FIXME: Some reason, tags is not array at resolve function.
      // https://github.com/contentlayerdev/contentlayer/issues/150
      const keywords =
        doc.tags?._array?.map((tag) => tag.replace(/-/g, " ")) || [];
      const author = {
        "@type": "Person",
        name: "Minseok Oh",
      };
      const slug = getSlugFromPath(doc._raw.flattenedPath);

      return {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "@id": `${url}/posts/${slug}`,
        headline: doc.title,
        description: doc.description || "",
        datePublished: doc.publishedAt,
        dateModified: doc.publishedAt,
        // TODO: Change Image URL
        author,
        url: `${url}/posts/${slug}`,
        image: doc.image ? url + doc.image : `${url}/placeholder.png`,
        isPartOf: {
          "@type": "Blog",
          "@id": url,
          name: "OMIN's Blog",
          author,
        },
        keywords,
      };
    },
  },
};

export const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true,
    },
    publishedAt: {
      type: "string",
      required: true,
    },
    category: {
      type: "string",
      required: true,
    },
    image: {
      type: "string",
      description: "The image with local path. Use for SEO, thumbnail, etc.",
    },
    description: {
      type: "string",
    },
    tags: {
      type: "list",
      of: { type: "string" },
    },
    series: {
      type: "string",
    },
    draft: {
      type: "boolean",
    },
  },
  computedFields,
}));

export default makeSource({
  contentDirPath: "./posts",
  documentTypes: [Post],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeCodeTitles,
      rehypePrism,
      rehypeSlug,
      [
        rehypeAutoLinkHeadings,
        {
          behavior: "wrap",
          properties: {
            className: "heading-anchor",
          },
        },
      ],
    ],
  },
});
