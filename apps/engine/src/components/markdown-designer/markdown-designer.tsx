import type { Heading, Root, RootContent, Text } from "mdast";
import { fromMarkdown } from "mdast-util-from-markdown";
import { toMarkdown } from "mdast-util-to-markdown";
import { For } from "solid-js";
import { Dynamic } from "solid-js/web";

import { useWorkbenchContext } from "../workbench/workbench-context";

export interface RiderMap {
  header: HeaderRiderNode;
  text: TextRiderNode;
}

export type RiderNode = RiderMap[keyof RiderMap];

export interface HeaderRiderNode {
  type: "header";
  node: Heading;
  children: RiderNode[];
}

export interface TextRiderNode {
  type: "text";
  node: Text;
}

export function toRider(tree: Root): RiderNode[] {
  const result: RiderNode[] = tree.children.map(toRiderNode).filter((child) => !!child);
  return result;
}

export function toRiderNode(node: RootContent): RiderNode | undefined {
  if (node.type === "heading") {
    const children = node.children.map((node) => toRiderNode(node)).filter((child) => !!child);
    return {
      children,
      node,
      type: "header",
    } as HeaderRiderNode;
  }
  if (node.type === "text") {
    return {
      node: node,
      type: "text",
    } as TextRiderNode;
  }
}

export function MarkdownDesigner() {
  const context = useWorkbenchContext();
  const tree = fromMarkdown(context.content);
  console.log(tree);
  const riders = toRider(tree);
  console.log("riders", riders);
  // const ast = parseMarkdown(context.content);
  // console.log(context.content);
  // console.log(ast);
  // const a = ast.children[0] as Parent;
  return (
    <div class="markdown-body">
      <For each={riders}>
        {(item) => {
          if (item.type === "header") {
            return <MarkdownControlHeaderRender rider={item} />;
          }
        }}
      </For>
    </div>
  );
}

export function RiderRender(props: { rider: RiderNode }) {
  if (props.rider.type === "header") {
    return <MarkdownControlHeaderRender rider={props.rider} />;
  }
  if (props.rider.type === "text") {
    return <MarkdownControlTextRender rider={props.rider} />;
  }
}

export function MarkdownControlTextRender(props: { rider: TextRiderNode }) {
  const text = toMarkdown(props.rider.node);
  return <div class="markdown-text">{text}</div>;
}

export function MarkdownControlHeaderRender(props: { rider: HeaderRiderNode }) {
  const text = toMarkdown(props.rider.node);
  return (
    <div class="markdown-heading">
      <Dynamic class="heading-element" component={"h" + props.rider.node.depth}>
        <For each={props.rider.children}>
          {(item) => {
            return <RiderRender rider={item} />;
          }}
        </For>
      </Dynamic>
      <a aria-label="Permalink: H1" class="anchor" href="#h1" id="user-content-h1">
        <span aria-hidden="true" class="octicon octicon-link"></span>
      </a>
    </div>
  );
}
