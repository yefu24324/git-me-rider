import { DragDropProvider, DragDropSensors, SortableProvider } from "@thisbeyond/solid-dnd";
import type { Root, RootContent } from "mdast";
import { fromMarkdown } from "mdast-util-from-markdown";
import { For } from "solid-js";

import css from "../../assets/github-markdown.min.css?inline";
import { ShadowRoot } from "../shadow-root/shadow-root";
import { useWorkbenchContext } from "../workbench/workbench-context";
import tailwindcss from "./ext.css?inline";
import { active } from "./markdown-plugin";
import type { HeaderRiderNode, ImageRiderNode, ParagraphRiderNode, RiderNode, TextRiderNode } from "./rider-nodes";
import { RiderRender } from "./rider-register";

/** 生成一个UUID */
function uuid() {
  return crypto.randomUUID();
}

export function toRider(tree: Root): RiderNode[] {
  const result: RiderNode[] = tree.children.map(toRiderNode).filter((child) => !!child);
  return result;
}

export function toRiderNode(node: RootContent): RiderNode | undefined {
  if (node.type === "heading") {
    const children = node.children.map((node) => toRiderNode(node)).filter((child) => !!child);
    const result: HeaderRiderNode = {
      children,
      id: uuid(),
      node,
      type: "header",
    };
    return result;
  }
  if (node.type === "paragraph") {
    const result: ParagraphRiderNode = {
      children: node.children.map((node) => toRiderNode(node)).filter((child) => !!child),
      id: uuid(),
      node: node,
      type: "paragraph",
    };
    return result;
  }
  if (node.type === "image") {
    const result: ImageRiderNode = {
      id: uuid(),
      node: node,
      type: "image",
    };
    return result;
  }
  if (node.type === "text") {
    const result: TextRiderNode = {
      id: uuid(),
      node: node,
      type: "text",
    };
    return result;
  }
}

export function MarkdownDesigner() {
  const context = useWorkbenchContext();
  const tree = fromMarkdown(context.content);
  console.log(tree);
  const riders = toRider(tree);
  console.log("riders", riders);
  active();

  return (
    <ShadowRoot>
      <style>{css}</style>
      <style>{tailwindcss}</style>
      <DragDropProvider>
        <DragDropSensors />
        <div class="markdown-body">
          <SortableProvider ids={riders.map((item) => item.id)}>
            <For each={riders}>
              {(item) => {
                return <RiderRender rider={item} />;
              }}
            </For>
          </SortableProvider>
        </div>
      </DragDropProvider>
    </ShadowRoot>
  );
}
