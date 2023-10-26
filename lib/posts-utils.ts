import { CATEGORY_ALL } from "@/constants/category";
import { Post, allPosts } from "contentlayer/generated";

type CategoryWithCount = {
  [key: string]: number;
};

type SortBy = "publishedAt" | "title";
type Order = "desc" | "asc";

export function getPosts(
  category: string = CATEGORY_ALL,
  sortBy: SortBy = "publishedAt",
  order: Order = "desc",
): Post[] {
  let filteredPosts =
    category === CATEGORY_ALL
      ? allPosts
      : allPosts.filter((post) => post.category === category);

  return sortPosts([...filteredPosts], sortBy, order);
}

function sortPosts(posts: Post[], sortBy: SortBy, order: Order): Post[] {
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

export function getAllCategoriesWithCount(): {
  name: string;
  count: number;
}[] {
  const categoriesWithCount = allPosts.reduce<CategoryWithCount>((acc, cur) => {
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

export function getPostsByCategory(category: string) {
  const posts = allPosts.filter((post) => post.category === category);

  return posts;
}
