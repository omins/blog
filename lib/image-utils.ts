import fs from "node:fs/promises";
import path from "node:path";
import { getPlaiceholder } from "plaiceholder";

export const getBlurDataUrl = async (src: string) => {
  const imagePath = path.join(process.cwd(), "public", src);
  const file = await fs.readFile(imagePath);
  const { base64 } = await getPlaiceholder(file, { size: 10 });

  return base64;
};

export const isLocalImageFileValid = async (src: string) => {
  try {
    const imagePath = path.join(process.cwd(), "public", src);
    const file = await fs.readFile(imagePath);

    return !file?.length ? false : true;
  } catch (error) {
    console.log("error", error);
    return false;
  }
};
