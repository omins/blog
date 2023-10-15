import { CATEGORY_ALL } from "@/constants/category";
import { allPosts } from "contentlayer/generated";

type CategoryWithCount = {
  [key: string]: number;
};

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
