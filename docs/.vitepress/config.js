import { defineConfig } from 'vitepress';
import { demoBlockPlugin } from 'vitepress-theme-demoblock';
import nav from './configs/nav';
import sidebar from './configs/sidebar';

export default defineConfig({
  title: 'Npsg',
  description: '基于Nestjs的server框架',

  lastUpdated: true,
  cleanUrls: 'without-subfolders',

  base: process.env.BASE || '/npsg',
  head: [['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.png' }]],

  markdown: {
    headers: {
      level: [0, 0],
    },

    // options for markdown-it-anchor
    anchor: { permalink: false },

    // options for markdown-it-toc
    toc: { includeLevel: [1, 2] },

    // light: #f9fafb, dark: --vp-code-block-bg
    theme: { light: 'github-light', dark: 'github-dark' },

    config: (md) => {
      md.use(demoBlockPlugin, {
        cssPreprocessor: 'less',
      });
    },
  },

  themeConfig: {
    outlineTitle: '本页目录',
    lastUpdatedText: '上次更新',
    logo: '/logo.png',

    algolia: {
      appId: 'TEEBDL6LJX',
      apiKey: '6c09da47a1ddf9596d3c6b4a156c2e69',
      indexName: 'npsg-index',
    },

    // nav
    nav,

    // sidebar
    sidebar,

    editLink: {
      pattern: 'https://github.com/lantron-ltd/npsg/edit/main/docs/:path',
      text: '在 GitHub 上编辑此页',
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/lantron-ltd/npsg' },
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: `Copyright © ${new Date().getFullYear()} npst`,
    },
  },
});
