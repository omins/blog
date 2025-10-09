import type { Locale } from "./locales";

export const INTRO_CONTENT: Record<Locale, { heading: string; subtitle: string; body: string[] }> =
  {
    ko: {
      heading: "코드, 언어, 도구를 기록하는 공간",
      subtitle: "Astro로 이전된 블로그에서 로컬라이제이션 워크플로와 생산성 팁을 공유합니다.",
      body: [
        "이 프로젝트는 Next.js 기반 블로그를 Astro 콘텐츠 컬렉션으로 옮기기 위한 실험이자 실전 기록입니다.",
        "한국어와 영어를 동시에 지원하면서도 유지보수 부담을 최소화하는 것이 목표입니다.",
      ],
    },
    en: {
      heading: "Notes on code, language, and workflows",
      subtitle:
        "Documenting the migration to Astro and the tooling that keeps translations healthy.",
      body: [
        "This is a living log of how the blog evolves as the content moves from Next.js to Astro.",
        "Expect posts about localization, developer experience, and the scripts that smooth the process.",
      ],
    },
  };

export function getIntroForLocale(locale: Locale) {
  return INTRO_CONTENT[locale];
}
