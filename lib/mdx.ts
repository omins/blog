import { LocalDocument } from "contentlayer/source-files";

export const getSlugWithoutCategoryPath = (doc: LocalDocument): string => {
  // FIXME: posts/[slug].mdx will cause an error.
  return doc._raw.flattenedPath.split("/")[1];
};
