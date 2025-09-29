import { cx } from "@gmr/components/utils/cva";
import { Polymorphic, type PolymorphicProps } from "@kobalte/core/polymorphic";
import { resolveFirst } from "@solid-primitives/refs";
import { createSortable } from "@thisbeyond/solid-dnd";
import { createEffect, For, type JSX, splitProps, type ValidComponent } from "solid-js";

import type { RiderNode } from "./rider-nodes";
import { RiderRender } from "./rider-register";

export function DragDrop(props: { container?: boolean; children: JSX.Element }) {
  const resolved = resolveFirst(() => props.children);
  createEffect(() => {
    const target = resolved() as HTMLElement;
    if (!target) {
      return;
    }
    target.draggable = true;
    target.addEventListener("dragover", (event: DragEvent) => {
      const dragdrop = event.dataTransfer?.types.includes("application/vnd.feiling.dragdrop");
      console.log("dragdrop");
      // const dragData = event.dataTransfer?.getData("application/vnd.feiling.dragdrop");
      // console.log("dragover", event.dataTransfer, dragData);
      // const elementDragData = dragData ? JSON.parse(dragData) : null;
      // if (elementDragData && elementDragData.type === "page-element") {
      //   placeholderElement.className = elementDragData.class;
      //   placeholderElement.classList.add("placeholder");
      //   console.log(elementDragData);
      //   target.appendChild(placeholderElement);
      // }
    });
    target.addEventListener("dragstart", (event: DragEvent) => {
      event.stopPropagation();
      const rect = target.getBoundingClientRect();
      console.log("dragstart", target);
      if (target.parentElement) {
        placeholderElement.style.minHeight = `${rect.height}px`;
        placeholderElement.style.minWidth = `${rect.width}px`;
        placeholderElement.className = target.className;
        // target.parentElement.insertBefore(placeholderElement, target);
      }
      event.dataTransfer?.setData(
        "application/vnd.feiling.dragdrop",
        JSON.stringify({ data: { class: target.className, elements: [] }, type: "page-element" }),
      );
    });
  });
  document.createElement("div").addEventListener("dragover", (event: DragEvent) => {});

  return <>{resolved()}</>;
}

export interface RiderRootOptions {
  rider: RiderNode;
}

export type RiderRootCommonProps<T extends HTMLElement = HTMLElement> = {
  class: string;
};

export interface RiderRootRenderProps extends RiderRootCommonProps {}

export type RiderRootProps<T extends ValidComponent | HTMLElement = HTMLElement> = RiderRootOptions & Partial<RiderRootCommonProps>;

export function RiderRoot<T extends ValidComponent = "span">(props: PolymorphicProps<T, RiderRootProps<T>>) {
  const [local, others] = splitProps(props, ["rider", "class"]);
  const sortable = createSortable(local.rider.id);
  return (
    <Polymorphic<RiderRootRenderProps>
      as="span"
      class={cx(local.class, "hover:border-blue-700 border border-transparent")}
      {...others}
      ref={(element: HTMLElement) => {
        sortable(element);
      }}
    >
      {others.children}
    </Polymorphic>
  );
}

export function RiderList(props: { rider: RiderNode; children: RiderNode[] }) {
  return (
    <For each={props.children}>
      {(item) => {
        return <RiderRender rider={item} />;
      }}
    </For>
  );
}
