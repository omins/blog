import { CATEGORY_ALL } from "@/constants/category";
import { Post } from "contentlayer/generated";
import { Order, SortBy, getPosts, sortPosts } from "..";
import { mockPosts } from "./mock";

describe("sortPosts function", () => {
  for (const sortBy of ["publishedAt", "title"] as (keyof Post)[]) {
    for (const order of ["desc", "asc"] as Order[]) {
      it(`should sort posts by ${sortBy} in ${order}ending order`, () => {
        const sortedPosts = sortPosts(mockPosts, sortBy as SortBy, order);
        const sortedValues = sortedPosts.map((post) => post[sortBy]);

        let answer = mockPosts.map((post) => post[sortBy]);
        answer = order === "asc" ? answer : answer.reverse();

        expect(sortedValues).toEqual(answer);
      });
    }
  }
});

describe("getPosts function", () => {
  for (const category of [CATEGORY_ALL, "os", "web"]) {
    it(`should return ${category} posts when category is ${category}`, () => {
      const posts = getPosts({
        category: category,
        order: "asc",
        sortBy: "publishedAt",
        postDataSource: mockPosts,
      });

      const returedValues = posts.map((post) => post.title);
      const answer =
        category === CATEGORY_ALL
          ? mockPosts.map((post) => post.title)
          : mockPosts
              .filter((post) => post.category === category)
              .map((post) => post.title);

      expect(returedValues).toEqual(answer);
    });
  }
});
