import { CATEGORY_ALL, CATEGORY_NAME_LABELS } from "@/constants/category";
import { getAllCategoriesWithCount } from "@/lib/posts";

export const METADATA = {
  title: "OMIN's Blog",
  description: "주로 학습한 내용 혹은 회고글을 올립니다.",
  author: "Minseok OH",
  url: process.env.BASE_URL || "https://www.omin.dev",
  googleSiteVerificationCode: process.env.GOOGLE_SITE_VERIFICATION_CODE || "",
  naverSiteVerificationCode: process.env.NAVER_SITE_VERIFICATION_CODE || "",
  gtagId: process.env.GTAG_ID || "",
};

export const BASE_OG = {
  locale: "ko_KR",
  type: "website",
  siteName: METADATA.title,
};

export function getAllKeywords(): string[] {
  const categories = getAllCategoriesWithCount()
    .filter((category) => category.name !== CATEGORY_ALL)
    .map((category) => CATEGORY_NAME_LABELS[category.name] || category.name);

  return categories;
}

export function getRootStructuredData() {
  const { title, author: authorName, description, url } = METADATA;
  const author = {
    "@type": "Person",
    name: authorName,
  };

  return {
    "@context": "https://schema.org/",
    "@type": "Blog",
    "@id": url,
    name: title,
    description,
    author,
    copyrightYear: 2023,
    image: {
      "@type": "ImageObject",
      "@id": `${url}/placeholder.png`,
      url: `${url}/placeholder.png`,
    },
  };
}
