export const SITE = {
  title: "前端博客",
  description: "yxz的个人博客",
  defaultLanguage: "en_US",
};

export const OPEN_GRAPH = {
  image: {
    src: "https://github.com/withastro/astro/blob/main/assets/social/banner.jpg?raw=true",
    alt:
      "astro logo on a starry expanse of space," +
      " with a purple saturn-like planet floating in the right foreground",
  },
  twitter: "astrodotbuild",
};

// This is the type of the frontmatter you put in the docs markdown files.
export type Frontmatter = {
  title: string;
  description: string;
  layout: string;
  image?: { src: string; alt: string };
  dir?: "ltr" | "rtl";
  ogLocale?: string;
  lang?: string;
};

export const KNOWN_LANGUAGES = {
  English: "en",
} as const;
export const KNOWN_LANGUAGE_CODES = Object.values(KNOWN_LANGUAGES);

export const GITHUB_EDIT_URL = `https://github.com/yang-xianzhu/blog`;

export const COMMUNITY_INVITE_URL = `https://github.com/yang-xianzhu/blog`;

// See "Algolia" section of the README for more information.
export const ALGOLIA = {
  indexName: "XXXXXXXXXX",
  appId: "XXXXXXXXXX",
  apiKey: "XXXXXXXXXX",
};

export type Sidebar = Record<
  typeof KNOWN_LANGUAGE_CODES[number],
  Record<string, { text: string; link: string }[]>
>;
export const SIDEBAR: Sidebar = {
  en: {
    "": [
      { text: "首页", link: "blog/home" },
      { text: "面试题", link: "blog/interview-uestions" },
      { text: "源码", link: "blog/source-code" },
      { text: "算法", link: "blog/algorithm" },
      { text: "书籍", link: "blog/books" },
      { text: "工具库", link: "blog/tool-library" },
      { text: "工程化", link: "blog/engineering" },
    ],
    // 'Another Section': [{ text: 'Page 4', link: 'en/page-4' }],
  },
};
