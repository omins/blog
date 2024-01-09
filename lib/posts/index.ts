import { Post, allPosts } from "contentlayer/generated";
import { isProduction } from "../../config";
import { CATEGORY_ALL } from "../../constants/category";

type CategoryWithCount = {
  [key: string]: number;
};

export type SortBy = "publishedAt" | "title";
export type Order = "desc" | "asc";

/**
 * Get blog posts with provided options
 *
 * @example
 * ```javascript
 *  const posts = getPosts({ category: "web", sortBy: "publishedAt", order: "desc" });
 * ```
 * or you can use default values
 *
 * ```javascript
 *  const posts = getPosts(); // get all posts sorted by publishedAt in descending order
 * ```
 */
export function getPosts({
  category = CATEGORY_ALL,
  sortBy = "publishedAt",
  order = "desc",
  postDataSource = allPosts,
}: {
  category?: string;
  sortBy?: SortBy;
  order?: Order;
  postDataSource?: Post[];
} = {}): Post[] {
  let filteredPosts =
    category === CATEGORY_ALL
      ? postDataSource
      : postDataSource.filter((post) => post.category === category);

  if (isProduction) {
    filteredPosts = filteredPosts.filter((post) => !post.draft);
  }

  return sortPosts([...filteredPosts], sortBy, order);
}

export function sortPosts(posts: Post[], sortBy: SortBy, order: Order): Post[] {
  return [...posts].sort((postA, postB) => {
    const valueA = getValueForSort(postA, sortBy);
    const valueB = getValueForSort(postB, sortBy);

    return compareValues(valueA, valueB, order);
  });
}

function getValueForSort(post: Post, sortBy: SortBy): string | Date {
  switch (sortBy) {
    case "publishedAt":
      return new Date(post.publishedAt);
    case "title":
      return post.title;
    default:
      return new Date(post.publishedAt);
  }
}

function compareValues<T>(a: T, b: T, order: Order): number {
  if (order === "desc") {
    return a > b ? -1 : a < b ? 1 : 0;
  } else {
    return a < b ? -1 : a > b ? 1 : 0;
  }
}

// TODO: write test
export function getAllCategoriesWithCount(): {
  name: string;
  count: number;
}[] {
  const posts = getPosts();
  const categoriesWithCount = posts.reduce<CategoryWithCount>((acc, cur) => {
    if (acc[cur.category]) {
      acc[cur.category] += 1;
      return acc;
    } else {
      acc[cur.category] = 1;
      return acc;
    }
  }, {});

  const categoriesWithCountArray = Object.entries(categoriesWithCount).map(
    ([key, value]) => ({
      name: key,
      count: value,
    }),
  );

  const categoryAll = {
    name: CATEGORY_ALL,
    count: allPosts.length,
  };

  return [categoryAll, ...categoriesWithCountArray];
}

export const getSlugFromPath = (path: string): string => {
  const startIndexOfLastSegment = path.lastIndexOf("/");

  return startIndexOfLastSegment !== -1
    ? path.slice(startIndexOfLastSegment + 1)
    : path;
};
