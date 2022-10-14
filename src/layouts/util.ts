import type { AstroGlobal } from "astro";

type LayoutProps = AstroGlobal["props"];
type SiteData = Record<string, string>;
interface LayoutData {
  lang: string;
  pageTitle: string;
  siteTitle: string;
  headTitle: string;
}

export function getHeadTitle(siteTitle: string, pageTitle: string): string {
  if (!pageTitle || siteTitle === pageTitle) {
    return siteTitle;
  }

  return `${pageTitle} - ${siteTitle}`;
}

export function getPropOrFrontmatter(props: LayoutProps, key: string) {
  return props[key] ?? props.frontmatter?.[key];
}

export function getLayoutData(
  props: LayoutProps,
  siteData: SiteData = {
    lang: "en",
    title: "Site Title",
  }
): LayoutData {
  const lang = getPropOrFrontmatter(props, "lang") ?? siteData.lang;
  const pageTitle = getPropOrFrontmatter(props, "title");
  const siteTitle = siteData.title;

  return {
    lang,
    pageTitle,
    siteTitle,
    headTitle: getHeadTitle(siteTitle, pageTitle),
  };
}
