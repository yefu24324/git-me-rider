import type { Heading, Image, Paragraph, Root, RootContent, Text } from "mdast";
import { fromMarkdown } from "mdast-util-from-markdown";
import { toMarkdown } from "mdast-util-to-markdown";
import { For, Show } from "solid-js";
import { Dynamic } from "solid-js/web";

import css from "../../assets/github-markdown.min.css?inline";
import { ShadowRoot } from "../shadow-root/shadow-root";
import { useWorkbenchContext } from "../workbench/workbench-context";
import tailwindcss from "./ext.css?inline";

export interface RiderMap {
  header: HeaderRiderNode;
  paragraph: ParagraphRiderNode;
  image: ImageRiderNode;
  text: TextRiderNode;
}

export type RiderNode = RiderMap[keyof RiderMap];

export interface HeaderRiderNode {
  type: "header";
  node: Heading;
  children: RiderNode[];
}

export interface ParagraphRiderNode {
  type: "paragraph";
  node: Paragraph;
  children: RiderNode[];
}

export interface ImageRiderNode {
  type: "image";
  node: Image;
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
  if (node.type === "paragraph") {
    return {
      children: node.children.map((node) => toRiderNode(node)).filter((child) => !!child),
      node: node,
      type: "paragraph",
    } as ParagraphRiderNode;
  }
  if (node.type === "image") {
    return {
      node: node,
      type: "image",
    } as ImageRiderNode;
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

  return (
    <ShadowRoot>
      <style>{css}</style>
      <style>{tailwindcss}</style>
      <div class="markdown-body">
        <For each={riders}>
          {(item) => {
            return <RiderRender rider={item} />;
          }}
        </For>
      </div>
    </ShadowRoot>
  );
}

export function RiderRender(props: { rider: RiderNode }) {
  if (props.rider.type === "header") {
    return <MarkdownControlHeaderRender rider={props.rider} />;
  }
  if (props.rider.type === "paragraph") {
    return <MarkdownControlParagraphRender rider={props.rider} />;
  }
  if (props.rider.type === "image") {
    return <MarkdownControlImageRender rider={props.rider} />;
  }
  if (props.rider.type === "text") {
    return <MarkdownControlTextRender rider={props.rider} />;
  }
  return <div>Unknown rider type: {props.rider.type}</div>;
}

export function MarkdownControlTextRender(props: { rider: TextRiderNode }) {
  const text = toMarkdown(props.rider.node);
  return (
    <Show when={text.trim()}>
      <div class="markdown-text">{text}</div>
    </Show>
  );
}

export function MarkdownControlHeaderRender(props: { rider: HeaderRiderNode }) {
  const text = toMarkdown(props.rider.node);
  return (
    <div class="markdown-heading hover:border-blue-700 border border-transparent">
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

export function MarkdownControlParagraphRender(props: { rider: ParagraphRiderNode }) {
  return (
    <p>
      <For each={props.rider.children}>
        {(item) => {
          return <RiderRender rider={item} />;
        }}
      </For>
    </p>
  );
}

export function MarkdownControlImageRender(props: { rider: ImageRiderNode }) {
  console.log(props.rider.node);
  return (
    <a href={props.rider.node.url}>
      <img src={props.rider.node.url} style="max-width: 100%;" />
    </a>
  );
}
