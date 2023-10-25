import { StaticRequire } from "next/dist/shared/lib/get-img-props";
import { StaticImageData } from "next/image";
import fs from "node:fs/promises";
import path from "node:path";
import { getPlaiceholder } from "plaiceholder";

export async function getBlurDataUrl(src: string): Promise<string> {
  const buffer = isRemote(src)
    ? await getRemoteImageBuffer(src)
    : await getLocalImageBuffer(src);
  const { base64 } = await getPlaiceholder(buffer, { size: 10 });

  return base64;
}

async function getRemoteImageBuffer(src: string): Promise<Buffer> {
  const imageRes = await fetch(src);
  const arrayBuffer = await imageRes.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  return buffer;
}

async function getLocalImageBuffer(src: string): Promise<Buffer> {
  const imagePath = path.join(process.cwd(), "public", src);
  const file = await fs.readFile(imagePath);

  return file;
}

function isRemote(src: string): boolean {
  return src.startsWith("http");
}

export function getStringSrc(
  imgSrc: string | StaticRequire | StaticImageData,
): string {
  return typeof imgSrc === "string"
    ? imgSrc
    : (imgSrc as StaticRequire).default !== undefined
    ? (imgSrc as StaticRequire).default.src
    : (imgSrc as StaticImageData).src;
}
