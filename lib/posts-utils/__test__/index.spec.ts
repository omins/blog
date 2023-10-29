import { Post } from "contentlayer/generated";
import { Order, SortBy, sortPosts } from "..";
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
