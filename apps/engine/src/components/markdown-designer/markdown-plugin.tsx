import { toMarkdown } from "mdast-util-to-markdown";
import { For, Show } from "solid-js";
import { Dynamic } from "solid-js/web";

import { RiderRoot } from "./dragdrop";
import type { HeaderRiderNode, ImageRiderNode, ParagraphRiderNode, RiderNode, TextRiderNode } from "./rider-nodes";
import { RiderRender, registerRider } from "./rider-register";

export function active() {
  registerRider((props: { rider: RiderNode }) => {
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
  });
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
    <RiderRoot as="div" class="markdown-heading" rider={props.rider}>
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
    </RiderRoot>
  );
}

export function MarkdownControlParagraphRender(props: { rider: ParagraphRiderNode }) {
  return (
    <RiderRoot as="p" rider={props.rider}>
      <For each={props.rider.children}>
        {(item) => {
          return <RiderRender rider={item} />;
        }}
      </For>
    </RiderRoot>
  );
}

export function MarkdownControlImageRender(props: { rider: ImageRiderNode }) {
  console.log(props.rider.node);
  return (
    <RiderRoot as="a" rider={props.rider}>
      <img draggable={false} src={props.rider.node.url} style="max-width: 100%;" />
    </RiderRoot>
  );
}
