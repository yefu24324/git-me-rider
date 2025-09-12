import { Select as SelectPrimitive } from "@kobalte/core/select";
import type { ComponentProps, ValidComponent, VoidProps } from "solid-js";
import { mergeProps, splitProps } from "solid-js";

import { cx } from "@/components/utils/cva";

export const SelectPortal = SelectPrimitive.Portal;

export type SelectProps<Option, OptGroup = never, T extends ValidComponent = "div"> = ComponentProps<typeof SelectPrimitive<Option, OptGroup, T>>;

export const Select = <Option, OptGroup = never, T extends ValidComponent = "div">(props: SelectProps<Option, OptGroup, T>) => {
  const [, rest] = splitProps(props as SelectProps<Option, OptGroup>, ["class"]);

  return <SelectPrimitive class={cx("space-y-2", props.class)} data-slot="select" {...rest} />;
};

export type SelectValueProps<Options, T extends ValidComponent = "span"> = ComponentProps<typeof SelectPrimitive.Value<Options, T>>;

export const SelectValue = <Options, T extends ValidComponent = "span">(props: SelectValueProps<Options, T>) => {
  return <SelectPrimitive.Value data-slot="select-value" {...props} />;
};

export type SelectTriggerProps<T extends ValidComponent = "button"> = ComponentProps<typeof SelectPrimitive.Trigger<T>> & {
  size?: "sm" | "default";
};

export const SelectTrigger = <T extends ValidComponent = "button">(props: SelectTriggerProps<T>) => {
  const merge = mergeProps({ size: "default" } as SelectTriggerProps, props);
  const [, rest] = splitProps(merge, ["class", "size", "children"]);

  return (
    <SelectPrimitive.Trigger
      class={cx(
        "border-input data-[placeholder]:text-muted-foreground [&_svg:not([class*='text-'])]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 data-[invalid]:ring-destructive/20 dark:data-[invalid]:ring-destructive/40 data-[invalid]:border-destructive dark:bg-input/30 dark:hover:bg-input/50 shadow-xs flex w-fit items-center justify-between gap-2 whitespace-nowrap rounded-md border bg-transparent px-3 py-2 text-sm outline-none transition-[color,box-shadow] focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:h-9 data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        props.class,
      )}
      data-size={props.size}
      data-slot="select-trigger"
      {...rest}
    >
      {props.children}
      <SelectPrimitive.Icon<ValidComponent>
        as={(props) => (
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path d="m6 9l6 6l6-6" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
          </svg>
        )}
        class="size-4 opacity-50"
      />
    </SelectPrimitive.Trigger>
  );
};

export type SelectContentProps<T extends ValidComponent = "div"> = VoidProps<ComponentProps<typeof SelectPrimitive.Content<T>>>;

export const SelectContent = <T extends ValidComponent = "div">(props: SelectContentProps<T>) => {
  const [, rest] = splitProps(props as SelectContentProps, ["class"]);

  return (
    <SelectPrimitive.Content
      class={cx(
        "bg-popover text-popover-foreground data-[expanded]:animate-in data-[closed]:animate-out data-[closed]:fade-out-0 data-[expanded]:fade-in-0 data-[closed]:zoom-out-95 data-[expanded]:zoom-in-95 origin-(--kb-select-content-transform-origin) relative z-50 min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border shadow-md",
        "[[data-popper-positioner][style*='--kb-popper-content-transform-origin:_top']>[data-slot=select-content]]:slide-in-from-top-2 [[data-popper-positioner][style*='--kb-popper-content-transform-origin:_bottom']>[data-slot=select-content]]:slide-in-from-bottom-2 [[data-popper-positioner][style*='--kb-popper-content-transform-origin:_left']>[data-slot=select-content]]:slide-in-from-left-2 [[data-popper-positioner][style*='--kb-popper-content-transform-origin:_right']>[data-slot=select-content]]:slide-in-from-right-2",
        props.class,
      )}
      data-slot="select-content"
      {...rest}
    >
      <SelectPrimitive.Listbox class="p-1 outline-none" />
    </SelectPrimitive.Content>
  );
};

export type SelectItemProps<T extends ValidComponent = "li"> = ComponentProps<typeof SelectPrimitive.Item<T>>;

export const SelectItem = <T extends ValidComponent = "li">(props: SelectItemProps<T>) => {
  const [, rest] = splitProps(props as SelectItemProps, ["class", "children"]);

  return (
    <SelectPrimitive.Item
      class={cx(
        "focus:bg-accent focus:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground outline-hidden *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2 relative flex w-full cursor-default select-none items-center justify-between gap-2 rounded-sm px-2 py-1.5 text-sm data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        props.class,
      )}
      data-slot="select-item"
      {...rest}
    >
      <SelectPrimitive.ItemLabel>{(props as SelectItemProps).children}</SelectPrimitive.ItemLabel>
      <SelectPrimitive.ItemIndicator<ValidComponent>
        as={(props) => (
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path d="M20 6L9 17l-5-5" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
          </svg>
        )}
        class="size-3.5"
      />
    </SelectPrimitive.Item>
  );
};

export type SelectSectionProps<T extends ValidComponent = "li"> = ComponentProps<typeof SelectPrimitive.Section<T>>;

export const SelectSection = <T extends ValidComponent = "li">(props: SelectSectionProps<T>) => {
  const [, rest] = splitProps(props as SelectSectionProps, ["class"]);

  return <SelectPrimitive.Section class={cx("text-muted-foreground px-2 py-1.5 text-xs", props.class)} data-slot="select-section" {...rest} />;
};

export type SelectDescriptionProps<T extends ValidComponent = "div"> = ComponentProps<typeof SelectPrimitive.Description<T>>;

export const SelectDescription = <T extends ValidComponent = "div">(props: SelectDescriptionProps<T>) => {
  const [, rest] = splitProps(props as SelectDescriptionProps, ["class"]);

  return (
    <SelectPrimitive.Description class={cx("text-muted-foreground text-sm data-[disabled]:opacity-50", props.class)} data-slot="select-description" {...rest} />
  );
};

export type SelectLabelProps<T extends ValidComponent = "label"> = ComponentProps<typeof SelectPrimitive.Label<T>>;

export const SelectLabel = <T extends ValidComponent = "label">(props: SelectLabelProps<T>) => {
  const [, rest] = splitProps(props as SelectLabelProps, ["class"]);

  return (
    <SelectPrimitive.Label
      class={cx(
        "flex select-none items-center gap-2 text-sm font-medium leading-none data-[disabled]:pointer-events-none data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
        props.class,
      )}
      data-slot="select-label"
      {...rest}
    />
  );
};

export type SelectErrorMessageProps<T extends ValidComponent = "div"> = ComponentProps<typeof SelectPrimitive.ErrorMessage<T>>;

export const SelectErrorMessage = <T extends ValidComponent = "div">(props: SelectErrorMessageProps<T>) => {
  const [, rest] = splitProps(props as SelectErrorMessageProps, ["class"]);

  return (
    <SelectPrimitive.ErrorMessage class={cx("text-destructive text-sm data-[disabled]:opacity-50", props.class)} data-slot="select-errormessage" {...rest} />
  );
};
