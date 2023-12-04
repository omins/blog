"use client";

import Giscus from "@giscus/react";

export default function Comments() {
  return (
    <div className="p-4">
      <Giscus
        repo="omins/blog"
        repoId="R_kgDOKbTTZw"
        category="Comments"
        categoryId="DIC_kwDOKbTTZ84Cbeiy"
        mapping="pathname"
        strict="0"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        theme="preferred_color_scheme"
        lang="ko"
        loading="lazy"
      />
    </div>
  );
}
