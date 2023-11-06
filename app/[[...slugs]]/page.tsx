import { Metadata } from "next";
import { redirect } from "next/navigation";
import { CATEGORY_ALL, CATEGORY_NAME_LABELS } from "@/constants/category";
import { POSTS_PER_PAGE } from "@/constants/posts";
import { BASE_OG, METADATA } from "@/lib/metadata";
import { getPageInfoFromSlugs } from "@/lib/pages";
import { getPages } from "@/lib/pages-utils";
import { getAllCategoriesWithCount, getPosts } from "@/lib/posts";
import PaginatedPostList from "@/components/layout/paginated-list";

export const dynamicParams = false;

type PageProps = { params: { slugs: string[] | undefined } };

export default async function MainPage({ params }: PageProps) {
  const { slugs } = params;
  const { pageNo, category } = getPageInfoFromSlugs(slugs || []);

  if (isFirstPage(slugs || [])) {
    const path = getPathToRedirect(category);
    redirect(path);
  }

  const allPosts = category === null ? getPosts() : getPosts({ category });

  return (
    <>
      <PaginatedPostList
        allPosts={allPosts}
        pageNo={pageNo}
        category={category}
      />
    </>
  );
}

function isFirstPage(slugs: string[]): boolean {
  return slugs.includes("pages") && slugs.includes("1");
}

function getPathToRedirect(category: string | null): string {
  return category === null ? "/" : `/category/${category}`;
}

/**
 * Needs to cover 4 cases:
 * 1. /
 * 2. /category/:category
 * 3. /pages/:page
 * 4. /category/:category/pages/:page
 *  */

type StaticParam = {
  slugs: string[];
};

export function generateStaticParams(): StaticParam[] {
  const params: StaticParam[] = [];
  params.push({ slugs: [""] });

  const categories = getAllCategoriesWithCount();

  categories.forEach((category) => {
    const { name, count } = category;

    const totalPage = Math.ceil(count / POSTS_PER_PAGE);
    const pages = getPages(totalPage);

    if (!(name === CATEGORY_ALL)) {
      params.push({ slugs: ["category", name] });
    }

    pages.forEach((page) => {
      const param =
        name === CATEGORY_ALL
          ? { slugs: ["pages", page.toString()] }
          : { slugs: ["category", name, "pages", page.toString()] };

      params.push(param);
    });
  });

  return params;
}

export function generateMetadata({ params }: PageProps): Metadata {
  const { slugs } = params;
  const { pageNo, category } = getPageInfoFromSlugs(slugs || []);
  const { title: siteName, url: baseUrl } = METADATA;

  const title = getTitle(category, pageNo);
  const description = getDescription(category);
  const url = getUrl(baseUrl, category, pageNo);

  return {
    title: { absolute: title },
    description,
    openGraph: {
      ...BASE_OG,
      title,
      description,
      siteName,
      url,
      images: [{ url: `${baseUrl}/placeholder.png`, alt: title }],
    },
  };
}

function getTitle(category: string | null, pageNo: number): string {
  const title = `OMIN's ${
    category ? CATEGORY_NAME_LABELS[category] || category : "Blog"
  }`;

  if (pageNo > 1) {
    return `${title} - Page ${pageNo}`;
  }

  return title;
}

function getDescription(category: string | null): string {
  return category
    ? `${CATEGORY_NAME_LABELS[category] || category} 관련 글을 확인해보세요.`
    : METADATA.description;
}

function getUrl(
  baseUrl: string,
  category: string | null,
  pageNo: number,
): string {
  if (category === null) {
    return pageNo === 1 ? baseUrl : `${baseUrl}/pages/${pageNo}`;
  }

  return pageNo === 1
    ? `${baseUrl}/category/${category}`
    : `${baseUrl}/category/${category}/pages/${pageNo}`;
}
