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
  let posts: Post[] = [...allPosts];

  if (category !== CATEGORY_ALL) {
    posts = posts.filter((post) => post.category === category);
  }

  posts = sortPosts(posts, sortBy, order);
  return posts;
}

function sortPosts(posts: Post[], sortBy: SortBy, order: Order): Post[] {
  return posts.sort((a, b) => {
    const valueA = getValueForSort(a, sortBy);
    const valueB = getValueForSort(b, sortBy);

    return compareValues(valueA, valueB, order);
  });
}

function getValueForSort(post: Post, sortBy: SortBy) {
  if (sortBy === "publishedAt") {
    return new Date(post.publishedAt);
  } else if (sortBy === "title") {
    return post.title;
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
