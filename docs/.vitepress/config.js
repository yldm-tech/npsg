import { defineConfig } from 'vitepress';
import { demoBlockPlugin } from 'vitepress-theme-demoblock';
import nav from './configs/nav';
import sidebar from './configs/sidebar';

export default defineConfig({
  title: 'Npsg',
  description: '基于Nestjs的server框架',
  head: [
    [
      'link',
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/assets/favicons/apple-touch-icon.png',
      },
    ],
    [
      'link',
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/assets/favicons/favicon-32x32.png',
      },
    ],
    [
      'link',
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/assets/favicons/favicon-16x16.png',
      },
    ],
    ['link', { rel: 'manifest', href: '/assets/favicons/site.webmanifest' }],
    [
      'link',
      {
        rel: 'mask-icon',
        href: '/assets/favicons/safari-pinned-tab.svg',
        color: '#3a0839',
      },
    ],
    ['link', { rel: 'shortcut icon', href: '/assets/favicons/favicon.ico' }],
    ['meta', { name: 'msapplication-TileColor', content: '#3a0839' }],
    [
      'meta',
      {
        name: 'msapplication-config',
        content: '/assets/favicons/browserconfig.xml',
      },
    ],
    ['meta', { name: 'theme-color', content: '#ffffff' }],
  ],

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
