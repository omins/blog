import { redirect } from "next/navigation";
import { CATEGORY_ALL } from "@/constants/category";
import { POSTS_PER_PAGE } from "@/constants/posts";
import { getPageInfoFromSlugs } from "@/lib/pages";
import { getPages } from "@/lib/pages-utils";
import { getAllCategoriesWithCount, getPosts } from "@/lib/posts";
import PaginatedPostList from "@/components/layout/paginated-list";

export const dynamicParams = false;

type Props = { params: { slugs: string[] | undefined } };

export default async function MainPage({ params }: Props) {
  const { slugs } = params;

  const { pageNo, category } = getPageInfoFromSlugs(slugs || []);
  const allPosts = category === null ? getPosts() : getPosts({ category });

  if (slugs?.includes("pages") && slugs?.includes("1")) {
    const path = category === null ? "/" : `/category/${category}`;
    redirect(path);
  }

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

/**
 * Needs to cover 4 cases:
 * 1. /
 * 2. /category/:category
 * 3. /pages/:page
 * 4. /category/:category/pages/:page
 *  */

export function generateStaticParams() {
  const params: { slugs: string[] }[] = [];
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

// export async function generateMetadata(
//   {
//     params,
//     searchParams,
//   }: {
//     params: { slug: string };
//     searchParams: { [key: string]: string | string[] | undefined };
//   },
//   parent: ResolvingMetadata,
// ): Promise<Metadata> {
//   const { slug: category } = params;
//   const { url: baseUrl, title: siteName } = METADATA;

//   const categoryName = CATEGORY_NAME_LABELS[category] || category;
//   const posts = getPosts({ category });

//   const description = `${categoryName} 관련 ${posts.length}개의 글을 확인해보세요.`;
//   const title = `OMIN's ${categoryName}`;

//   return {
//     // Using template for title declared in root layout
//     title: `${categoryName}`,
//     description,
//     openGraph: {
//       ...BASE_OG,
//       title,
//       description,
//       url: `${baseUrl}/category/${category}`,
//       images: [{ url: "/placeholder.png", alt: "parent alt" }],
//     },
//   };
// }
