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
  filePathPattern: `**/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true,
    },
    date: {
      type: "date",
      required: true,
    },
    category: {
      type: "string",
      required: true,
    },
    description: {
      type: "string",
    },
    tags: {
      type: "list",
      of: { type: "string" },
    },
  },
  computedFields,
}));

export default makeSource({
  contentDirPath: "./posts",
  documentTypes: [Post],
});
