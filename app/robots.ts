import { MetadataRoute } from "next";
import { METADATA } from "@/lib/metadata";

export default function robots(): MetadataRoute.Robots {
  const { url } = METADATA;
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${url}/sitemap.xml`,
  };
}
