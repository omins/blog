"use client";

import Link from "next/link";
import { CATEGORY_ALL, CATEGORY_NAME_LABELS } from "@/constants/category";
import Chip from "./chip";

type Props = {
  name: string;
  count: number;
  currentCategoryName: string;
};

export default function CategoryChip({
  name,
  count,
  currentCategoryName,
}: Props) {
  const urlPath = getPath(name);
  const label = getLabel(name, count);
  const isSelected = name === currentCategoryName;

  return (
    <Link href={urlPath}>
      <Chip label={label} isSelected={isSelected} />
    </Link>
  );
}

function getPath(name: string) {
  return name === CATEGORY_ALL ? "/" : `/category/${name}`;
}

function getLabel(name: string, count: number) {
  return `${CATEGORY_NAME_LABELS[name] || name} (${count})`;
}
