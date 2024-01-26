"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CATEGORY_ALL, CATEGORY_NAME_LABELS } from "@/constants/category";
import Chip from "./chip";

type Props = {
  name: string;
  count: number;
};

export default function CategoryChip({ name, count }: Props) {
  const pathname = usePathname();
  const currentCategoryName = getCategoryNameFromPath(pathname);

  const urlPath = getPath(name);
  const label = getLabel(name, count);
  const isSelected = name === currentCategoryName;

  return (
    <Link href={urlPath}>
      <Chip label={label} isSelected={isSelected} />
    </Link>
  );
}

function getCategoryNameFromPath(pathname: string) {
  const regex = /pages|\/|category|\d+/g;
  const category = pathname.replace(regex, "");

  return category === "" ? CATEGORY_ALL : category;
}

function getPath(name: string) {
  return name === CATEGORY_ALL ? "/" : `/category/${name}`;
}

function getLabel(name: string, count: number) {
  return `${CATEGORY_NAME_LABELS[name] || name} (${count})`;
}
