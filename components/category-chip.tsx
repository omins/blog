"use client";

import Link from "next/link";
import { useSelectedLayoutSegments } from "next/navigation";
import { CATEGORY_ALL, CATEGORY_NAME_LABELS } from "@/constants/category";
import Chip from "./chip";

type Props = {
  category: { name: string; count: number };
};

export default function CategoryChip({ category }: Props) {
  const { name, count } = category;

  const urlPath = getPath(name);
  const label = getLabel(name, count);
  const segments = useSelectedLayoutSegments();
  const selected = isSelected(name, segments);

  return (
    <Link href={urlPath}>
      <Chip label={label} isSelected={selected} />
    </Link>
  );
}

function getPath(name: string) {
  return name === CATEGORY_ALL ? "/" : `/category/${name}`;
}

function getLabel(name: string, count: number) {
  return `${CATEGORY_NAME_LABELS[name] || name} (${count})`;
}

function isSelected(name: string, segments: string[]) {
  return (
    segments[segments.length - 1] === name ||
    (name === CATEGORY_ALL && segments.length === 0)
  );
}
