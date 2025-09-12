import { resolveFirst } from "@solid-primitives/refs";
import { createEffect, type JSX } from "solid-js";

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
