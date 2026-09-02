import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { renderMarkdown } from "./markdown";
import type { Article, ArticleFrontmatter, ArticleMeta } from "./types";

const ARTICLES_DIR = path.join(process.cwd(), "content", "articles");

function slugFromFilename(filename: string): string {
  return filename.replace(/\.md$/, "");
}

/**
 * content/articles/*.md の一覧をメタ情報（本文レンダリング前）だけ取得する。
 * 一覧ページ・トップページのカード表示用。
 */
export function getAllArticleMeta(): ArticleMeta[] {
  if (!fs.existsSync(ARTICLES_DIR)) return [];

  const files = fs.readdirSync(ARTICLES_DIR).filter((f) => f.endsWith(".md"));

  const metas = files.map((filename) => {
    const raw = fs.readFileSync(path.join(ARTICLES_DIR, filename), "utf-8");
    const { data } = matter(raw);
    const frontmatter = data as ArticleFrontmatter;
    return {
      slug: slugFromFilename(filename),
      ...frontmatter,
    };
  });

  return metas.sort((a, b) => (a.date < b.date ? 1 : -1));
}

/** 指定スラッグの記事を本文まで含めて取得する（詳細ページ用）。 */
export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const filePath = path.join(ARTICLES_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const frontmatter = data as ArticleFrontmatter;
  const { html, toc } = await renderMarkdown(content);

  return {
    slug,
    html,
    toc,
    ...frontmatter,
  };
}

export function getAllArticleSlugs(): string[] {
  if (!fs.existsSync(ARTICLES_DIR)) return [];
  return fs.readdirSync(ARTICLES_DIR)
    .filter((f) => f.endsWith(".md"))
    .map(slugFromFilename);
}
