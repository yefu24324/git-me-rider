import remarkParse from "remark-parse";
import remarkStringify from "remark-stringify";
import { unified } from "unified";

// 设置 Unified 处理器
export const processor = unified()
  .use(remarkParse) // Markdown 解析器
  .use(remarkStringify); // Markdown 生成器

export function parseMarkdown(markdown: string) {
  return processor.parse(markdown);
}
