import { parseMarkdown } from "@gmr/core";

import { useWorkbenchContext } from "../workbench/workbench-context";

export function MarkdownDesigner() {
  const context = useWorkbenchContext();
  const ast = parseMarkdown(context.content);
  console.log(context.content);
  console.log(ast);
  return (
    <div class="markdown-body">
      <MarkdownControlHeaderRender text="H1" />
    </div>
  );
}

export function MarkdownControlHeaderRender(props: { text: string }) {
  return (
    <div class="markdown-heading">
      <h1 class="heading-element">{props.text}</h1>
      <a aria-label="Permalink: H1" class="anchor" href="#h1" id="user-content-h1">
        <span aria-hidden="true" class="octicon octicon-link"></span>
      </a>
    </div>
  );
}
