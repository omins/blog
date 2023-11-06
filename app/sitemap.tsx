import { MetadataRoute } from "next";
import { CATEGORY_ALL } from "@/constants/category";
import { POSTS_PER_PAGE } from "@/constants/posts";
import { METADATA } from "@/lib/metadata";
import { getPages } from "@/lib/pages-utils";
import { getAllCategoriesWithCount, getPosts } from "@/lib/posts";

export default function Sitemap(): MetadataRoute.Sitemap {
  const { url } = METADATA;
  const sitemap: MetadataRoute.Sitemap = [
    {
      url,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];

  const allPosts = getPosts();
  allPosts.forEach((post) => {
    sitemap.push({
      url: `${url}/posts/${post.slug}`,
      lastModified: new Date(post.publishedAt),
      changeFrequency: "monthly",
      priority: 0.9,
    });
  });

  const categories = getAllCategoriesWithCount();
  categories.forEach((category) => {
    const { name, count } = category;

    const totalPage = Math.ceil(count / POSTS_PER_PAGE);
    const pages = getPages(totalPage);

    if (!(name === CATEGORY_ALL)) {
      sitemap.push({
        url: `${url}/category/${name}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.8,
      });
    }

    pages.forEach((page) => {
      if (page === 1) return;
      sitemap.push(
        name === CATEGORY_ALL
          ? {
              url: `${url}/pages/${page}`,
              lastModified: new Date(),
              changeFrequency: "monthly",
              priority: 0.7,
            }
          : {
              url: `${url}/category/${name}/pages/${page}`,
              lastModified: new Date(),
              changeFrequency: "monthly",
              priority: 0.7,
            },
      );
    });
  });

  return sitemap;
}
