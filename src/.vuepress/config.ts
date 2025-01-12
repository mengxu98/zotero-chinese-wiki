import { defineUserConfig } from "vuepress";
import theme from "./theme.js";
import { searchProPlugin } from "vuepress-plugin-search-pro";
// import { baiduTongjiPlugin } from "@vuepress-plume/vuepress-plugin-baidu-tongji";

export default defineUserConfig({
  base: process.env.NETLIFY ? "/" : "/wiki/",

  locales: {
    "/": {
      lang: "zh-CN",
      title: "Zotero 中文小组",
      description: "Zotero 非官方中文维护小组",
    },
  },

  theme,
  plugins: [
    searchProPlugin({
      // 索引全部内容
      indexContent: true,
      // 为分类和标签添加索引
    }),

    /**
     * 百度统计
     * @see https://www.npmjs.com/package/@vuepress-plume/vuepress-plugin-baidu-tongji
     *
     */
    // baiduTongjiPlugin({
    //   key: "fc5b45ae006a231c1d5cff4610df7267",
    //   // key: process.env.CONTEXT === "production" ? "fc5b45ae006a231c1d5cff4610df7267" : "", // 百度统计使用的 key
    // }),
    () => {
      const key =
        process.env.CONTEXT === "production"
          ? "fc5b45ae006a231c1d5cff4610df7267"
          : "";
      return {
        name: "vuepress-plugin-baidu-tongji",
        extendsPage: (page) => {
          page.frontmatter.head = page.frontmatter.head || [];
          page.frontmatter.head?.push([
            "script",
            {
              type: "text/javascript",
            },
            "var _hmt = _hmt || []",
          ]);
          page.frontmatter.head?.push([
            "script",
            { src: `https://hm.baidu.com/hm.js?${key}` },
          ]);
        },
      };
    },
  ],

  // Enable it with pwa
  // shouldPrefetch: false,
});
