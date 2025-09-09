import ResizablePrimitive from "@corvu/resizable";
import { type ComponentProps, mergeProps, Show, splitProps, type ValidComponent } from "solid-js";

import { cx } from "@/components/utils/cva";

export type ResizableProps<T extends ValidComponent = "div"> = ComponentProps<typeof ResizablePrimitive<T>>;

export const Resizable = <T extends ValidComponent>(props: ResizableProps<T>) => {
  const [, rest] = splitProps(props as ResizableProps, ["class"]);

  return <ResizablePrimitive class={cx("size-full", props.class)} data-slot="resizable" {...rest} />;
};

export type ResizablePanelProps<T extends ValidComponent = "div"> = ComponentProps<typeof ResizablePrimitive.Panel<T>>;

export const ResizablePanel = <T extends ValidComponent>(props: ResizablePanelProps<T>) => {
  return <ResizablePrimitive.Panel data-slot="resizable-panel" {...props} />;
};

export type ResizableHandleProps<T extends ValidComponent = "div"> = ComponentProps<typeof ResizablePrimitive.Handle<T>> & {
  withHandle?: boolean;
};

export const ResizableHandle = <T extends ValidComponent>(props: ResizableHandleProps<T>) => {
  const merge = mergeProps({ withHandle: false } as ResizableHandleProps, props);
  const [, rest] = splitProps(merge, ["class", "withHandle"]);

  return (
    <ResizablePrimitive.Handle
      class={cx(
        "bg-border focus-visible:ring-ring focus-visible:outline-hidden relative flex w-px items-center justify-center after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:ring-1 focus-visible:ring-offset-1",
        "data-[orientation=vertical]:h-px data-[orientation=vertical]:w-full data-[orientation=vertical]:after:left-0 data-[orientation=vertical]:after:h-1 data-[orientation=vertical]:after:w-full data-[orientation=vertical]:after:-translate-y-1/2 data-[orientation=vertical]:after:translate-x-0 [&[data-orientation=vertical]>div]:rotate-90",
        props.class,
      )}
      data-slot="resizable-handle"
      {...rest}
    >
      <Show when={props.withHandle}>
        <div class="bg-border rounded-xs z-10 flex h-4 w-3 items-center justify-center border">
          <svg class="size-2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
              <circle cx="9" cy="12" r="1" />
              <circle cx="9" cy="5" r="1" />
              <circle cx="9" cy="19" r="1" />
              <circle cx="15" cy="12" r="1" />
              <circle cx="15" cy="5" r="1" />
              <circle cx="15" cy="19" r="1" />
            </g>
          </svg>
        </div>
      </Show>
    </ResizablePrimitive.Handle>
  );
};
