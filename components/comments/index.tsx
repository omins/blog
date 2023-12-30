"use client";

import Giscus from "@giscus/react";

export default function Comments() {
  return (
    <div className="p-4">
      <p className="mb-2 w-full text-center">
        🚨 댓글 위젯을 불러올 때 간헐적인 오류가 있어
        <br />
        라이브러리 수정 중이에요.
      </p>
      {/* <Giscus
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
      /> */}
    </div>
  );
}
