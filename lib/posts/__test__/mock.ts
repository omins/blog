import { Post } from "contentlayer/generated";

type Mock = {
  title: string;
  publishedAt: string;
  category: string;
  tags?: string[];
};

const mocks: Mock[] = [
  {
    title: "test1",
    publishedAt: "2023-1-19",
    category: "web",
    tags: ["test-tag1", "test-tag2"],
  },
  {
    title: "test2",
    publishedAt: "2023-02-20",
    category: "os",
  },
  {
    title: "test3",
    publishedAt: "2023-03-20",
    category: "web",
  },
  {
    title: "test4",
    publishedAt: "2023-04-1",
    category: "os",
  },
];

/**
 * Mock posts for testing. sorted by publishedAt, title in ascending order.
 * @returns {Post[]}
 *
 */

export const mockPosts: Post[] = mocks.map((mock) =>
  createMockPost(mock.title, mock.publishedAt, mock.category, mock.tags),
);

function createMockPost(
  title: string,
  publishedAt: string,
  category: string,
  tags: string[] = [],
): Post {
  return {
    title,
    publishedAt,
    category,
    description: "test desc",
    tags,
    body: {
      raw: "\n## Hello world\n",
      code: "",
    },
    _id: `test/${title}.mdx`,
    _raw: {
      sourceFilePath: `test/${title}.mdx`,
      sourceFileName: `test/${title}.mdx`,
      sourceFileDir: "test",
      contentType: "mdx",
      flattenedPath: `test/${title}`,
    },
    type: "Post",
    slug: title,
    url_path: `/posts/${title}`,
  };
}
