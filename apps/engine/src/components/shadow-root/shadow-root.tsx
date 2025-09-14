import type { ParentComponent } from "solid-js";
import { Portal } from "solid-js/web";

export const ShadowRoot: ParentComponent = (props) => {
  let div: HTMLDivElement;
  return (
    <div ref={div!}>
      <Portal mount={div!} useShadow={true}>
        {props.children}
      </Portal>
    </div>
  );
};
