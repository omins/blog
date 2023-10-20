import rehypePrism from "@mapbox/rehype-prism";
import { defineDocumentType, makeSource } from "contentlayer/source-files";
import { getSlugWithoutCategoryPath } from "./lib/mdx";

/** @type {import('contentlayer/source-files').ComputedFields} */
const computedFields = {
  slug: {
    type: "string",
    resolve: (doc) => getSlugWithoutCategoryPath(doc),
  },
  url_path: {
    type: "string",
    resolve: (doc) => `/posts/${getSlugWithoutCategoryPath(doc)}`,
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
  },
  computedFields,
}));

export default makeSource({
  contentDirPath: "./posts",
  documentTypes: [Post],
  mdx: { rehypePlugins: [rehypePrism] },
});
