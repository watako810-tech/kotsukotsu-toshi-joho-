import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import { visit } from "unist-util-visit";
import { toString as mdastToString } from "mdast-util-to-string";
import GithubSlugger from "github-slugger";
import type { TocItem } from "./types";

/**
 * MarkdownをHTML文字列に変換し、同時に見出し(h2/h3)から目次(TOC)を抽出する。
 * TOCのid生成には rehype-slug と同じ github-slugger アルゴリズムを使い、
 * 本文側の見出しIDとTOCのリンク先を一致させている。
 */
export async function renderMarkdown(markdown: string): Promise<{ html: string; toc: TocItem[] }> {
  const tree = unified().use(remarkParse).use(remarkGfm).parse(markdown);

  const slugger = new GithubSlugger();
  const toc: TocItem[] = [];

  visit(tree, "heading", (node: any) => {
    if (node.depth < 2 || node.depth > 3) return;
    const text = mdastToString(node);
    if (!text) return;
    const id = slugger.slug(text);
    toc.push({ id, text, depth: node.depth });
  });

  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeSlug)
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(markdown);

  return { html: String(file), toc };
}
