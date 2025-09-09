import { ContextMenu as ContextMenuPrimitive } from "@kobalte/core/context-menu";
import type { ComponentProps, ValidComponent } from "solid-js";
import { splitProps } from "solid-js";

import { cx } from "@/components/utils/cva";

export const ContextMenuPortal = ContextMenuPrimitive.Portal;

export type ContextMenuProps = ComponentProps<typeof ContextMenuPrimitive>;

export const ContextMenu = (props: ContextMenuProps) => {
  return <ContextMenuPrimitive data-slot="context-menu" {...props} />;
};

export type ContextMenuTriggerProps<T extends ValidComponent = "div"> = ComponentProps<typeof ContextMenuPrimitive.Trigger<T>>;

export const ContextMenuTrigger = <T extends ValidComponent = "div">(props: ContextMenuTriggerProps<T>) => {
  return <ContextMenuPrimitive.Trigger data-slot="context-menu-trigger" {...props} />;
};

export type ContextMenuGroupProps<T extends ValidComponent = "div"> = ComponentProps<typeof ContextMenuPrimitive.Group<T>>;

export const ContextMenuGroup = <T extends ValidComponent = "div">(props: ContextMenuGroupProps<T>) => {
  return <ContextMenuPrimitive.Group data-slot="context-menu-group" {...props} />;
};

export type ContextMenuSubProps = ComponentProps<typeof ContextMenuPrimitive.Sub>;

export const ContextMenuSub = (props: ContextMenuSubProps) => {
  return <ContextMenuPrimitive.Sub data-slot="context-menu-sub" {...props} />;
};

export type ContextMenuRadioGroupProps<T extends ValidComponent = "div"> = ComponentProps<typeof ContextMenuPrimitive.RadioGroup<T>>;

export const ContextMenuRadioGroup = <T extends ValidComponent = "div">(props: ContextMenuRadioGroupProps<T>) => {
  return <ContextMenuPrimitive.RadioGroup data-slot="context-menu-radio-group" {...props} />;
};

export type ContextMenuSubTriggerProps<T extends ValidComponent = "div"> = ComponentProps<typeof ContextMenuPrimitive.SubTrigger<T>> & {
  inset?: boolean;
};

export const ContextMenuSubTrigger = <T extends ValidComponent = "div">(props: ContextMenuSubTriggerProps<T>) => {
  const [, rest] = splitProps(props as ContextMenuSubTriggerProps, ["class", "children", "inset"]);

  return (
    <ContextMenuPrimitive.SubTrigger
      class={cx(
        "data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[expanded]:bg-accent data-[expanded]:text-accent-foreground outline-hidden flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm data-[inset]:pl-8 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        props.class,
      )}
      data-inset={props.inset}
      data-slot="context-menu-sub-trigger"
      {...rest}
    >
      {props.children}
      <svg class="ml-auto" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="m9 18l6-6l-6-6" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
      </svg>
    </ContextMenuPrimitive.SubTrigger>
  );
};

export type ContextMenuSubContentProps<T extends ValidComponent = "div"> = ComponentProps<typeof ContextMenuPrimitive.SubContent<T>>;

export const ContextMenuSubContent = <T extends ValidComponent = "div">(props: ContextMenuSubContentProps<T>) => {
  const [, rest] = splitProps(props as ContextMenuSubContentProps, ["class"]);

  return (
    <ContextMenuPrimitive.SubContent
      class={cx(
        "bg-popover text-popover-foreground data-[expanded]:animate-in data-[closed]:animate-out data-[closed]:fade-out-0 data-[expanded]:fade-in-0 data-[closed]:zoom-out-95 data-[expanded]:zoom-in-95 origin-(--kb-menu-content-transform-origin) z-50 min-w-[8rem] overflow-hidden rounded-md border p-1 shadow-lg outline-none",
        "[[data-popper-positioner][style*='--kb-popper-content-transform-origin:_top']>[data-slot=context-menu-sub-content]]:slide-in-from-top-2 [[data-popper-positioner][style*='--kb-popper-content-transform-origin:_bottom']>[data-slot=context-menu-sub-content]]:slide-in-from-bottom-2 [[data-popper-positioner][style*='--kb-popper-content-transform-origin:_left']>[data-slot=context-menu-sub-content]]:slide-in-from-left-2 [[data-popper-positioner][style*='--kb-popper-content-transform-origin:_right']>[data-slot=context-menu-sub-content]]:slide-in-from-right-2",
        props.class,
      )}
      data-slot="context-menu-sub-content"
      {...rest}
    />
  );
};

export type ContextMenuContentProps<T extends ValidComponent = "div"> = ComponentProps<typeof ContextMenuPrimitive.Content<T>>;

export const ContextMenuContent = <T extends ValidComponent = "div">(props: ContextMenuContentProps<T>) => {
  const [, rest] = splitProps(props as ContextMenuContentProps, ["class"]);

  return (
    <ContextMenuPrimitive.Content
      class={cx(
        "bg-popover text-popover-foreground data-[expanded]:animate-in data-[closed]:animate-out data-[closed]:fade-out-0 data-[expanded]:fade-in-0 data-[closed]:zoom-out-95 data-[expanded]:zoom-in-95 origin-(--kb-menu-content-transform-origin) z-50 min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border p-1 shadow-md outline-none",
        "[[data-popper-positioner][style*='--kb-popper-content-transform-origin:_top']>[data-slot=context-menu-content]]:slide-in-from-top-2 [[data-popper-positioner][style*='--kb-popper-content-transform-origin:_bottom']>[data-slot=context-menu-content]]:slide-in-from-bottom-2 [[data-popper-positioner][style*='--kb-popper-content-transform-origin:_left']>[data-slot=context-menu-content]]:slide-in-from-left-2 [[data-popper-positioner][style*='--kb-popper-content-transform-origin:_right']>[data-slot=context-menu-content]]:slide-in-from-right-2",
        props.class,
      )}
      data-slot="context-menu-content"
      {...rest}
    />
  );
};

export type ContextMenuItemProps<T extends ValidComponent = "div"> = ComponentProps<typeof ContextMenuPrimitive.Item<T>> & {
  inset?: boolean;
  variant?: "default" | "destructive";
};

export const ContextMenuItem = <T extends ValidComponent = "div">(props: ContextMenuItemProps<T>) => {
  const [, rest] = splitProps(props as ContextMenuItemProps, ["class", "inset", "variant"]);

  return (
    <ContextMenuPrimitive.Item
      class={cx(
        "data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:data-[highlighted]:bg-destructive/10 dark:data-[variant=destructive]:data-[highlighted]:bg-destructive/20 data-[variant=destructive]:data-[highlighted]:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive [&_svg:not([class*='text-'])]:text-muted-foreground outline-hidden relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm data-[disabled]:pointer-events-none data-[inset]:pl-8 data-[disabled]:opacity-50 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        props.class,
      )}
      data-inset={props.inset}
      data-slot="context-menu-item"
      data-variant={props.variant}
      {...rest}
    />
  );
};

export type ContextMenuCheckboxItemProps<T extends ValidComponent = "div"> = ComponentProps<typeof ContextMenuPrimitive.CheckboxItem<T>>;

export const ContextMenuCheckboxItem = <T extends ValidComponent = "div">(props: ContextMenuCheckboxItemProps<T>) => {
  const [, rest] = splitProps(props as ContextMenuCheckboxItemProps, ["class", "children"]);

  return (
    <ContextMenuPrimitive.CheckboxItem
      class={cx(
        "data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground outline-hidden relative flex cursor-default select-none items-center gap-2 rounded-sm py-1.5 pl-8 pr-2 text-sm data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        props.class,
      )}
      data-slot="context-menu-checkbox-item"
      {...rest}
    >
      <span class="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
        <ContextMenuPrimitive.ItemIndicator as="svg" class="size-4" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 6L9 17l-5-5" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
        </ContextMenuPrimitive.ItemIndicator>
      </span>
      {props.children}
    </ContextMenuPrimitive.CheckboxItem>
  );
};

export type ContextMenuRadioItemProps<T extends ValidComponent = "div"> = ComponentProps<typeof ContextMenuPrimitive.RadioItem<T>>;

export const ContextMenuRadioItem = <T extends ValidComponent = "div">(props: ContextMenuRadioItemProps<T>) => {
  const [, rest] = splitProps(props as ContextMenuRadioItemProps, ["class", "children"]);

  return (
    <ContextMenuPrimitive.RadioItem
      class={cx(
        "data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground outline-hidden relative flex cursor-default select-none items-center gap-2 rounded-sm py-1.5 pl-8 pr-2 text-sm data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        props.class,
      )}
      data-slot="context-menu-radio-item"
      {...rest}
    >
      <span class="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
        <ContextMenuPrimitive.ItemIndicator as="svg" class="size-2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" fill="currentColor" r="10" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
        </ContextMenuPrimitive.ItemIndicator>
      </span>
      {props.children}
    </ContextMenuPrimitive.RadioItem>
  );
};

export type ContextMenuGroupLabelProps<T extends ValidComponent = "span"> = ComponentProps<typeof ContextMenuPrimitive.GroupLabel<T>> & {
  inset?: boolean;
};

export const ContextMenuGroupLabel = <T extends ValidComponent = "span">(props: ContextMenuGroupLabelProps<T>) => {
  const [, rest] = splitProps(props as ContextMenuGroupLabelProps, ["class", "inset"]);

  return (
    <ContextMenuPrimitive.GroupLabel
      as="div"
      class={cx("text-foreground my-1.5 px-2 text-sm font-medium data-[inset]:pl-8", props.class)}
      data-inset={props.inset}
      data-slot="context-menu-group-label"
      {...rest}
    />
  );
};

export type ContextMenuItemLabelProps<T extends ValidComponent = "div"> = ComponentProps<typeof ContextMenuPrimitive.ItemLabel<T>> & {
  inset?: boolean;
};

export const ContextMenuItemLabel = <T extends ValidComponent = "div">(props: ContextMenuItemLabelProps<T>) => {
  const [, rest] = splitProps(props as ContextMenuItemLabelProps, ["class", "inset"]);

  return (
    <ContextMenuPrimitive.ItemLabel
      class={cx("text-foreground px-2 py-1.5 text-sm font-medium data-[inset]:pl-8", props.class)}
      data-inset={props.inset}
      data-slot="context-menu-item-label"
      {...rest}
    />
  );
};

export type ContextMenuSeparatorProps<T extends ValidComponent = "hr"> = ComponentProps<typeof ContextMenuPrimitive.Separator<T>>;

export const ContextMenuSeparator = <T extends ValidComponent = "hr">(props: ContextMenuSeparatorProps<T>) => {
  const [, rest] = splitProps(props as ContextMenuSeparatorProps, ["class"]);

  return <ContextMenuPrimitive.Separator class={cx("bg-border -mx-1 my-1 h-px", props.class)} data-slot="context-menu-separator" {...rest} />;
};

export type ContextMenuShortcutProps = ComponentProps<"span">;

export const ContextMenuShortcut = (props: ContextMenuShortcutProps) => {
  const [, rest] = splitProps(props, ["class"]);

  return <span class={cx("text-muted-foreground ml-auto text-xs tracking-widest", props.class)} data-slot="context-menu-shortcut" {...rest} />;
};
