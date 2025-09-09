import { NavigationMenu as NavigationMenuPrimitive } from "@kobalte/core/navigation-menu";
import { type ComponentProps, mergeProps, splitProps, type ValidComponent } from "solid-js";

import { cva, cx } from "@/components/utils/cva";

export const NavigationMenuPortal = NavigationMenuPrimitive.Portal;

export type NavigationMenuProps<T extends ValidComponent = "ul"> = ComponentProps<typeof NavigationMenuPrimitive<T>>;

export const NavigationMenu = <T extends ValidComponent = "ul">(props: NavigationMenuProps<T>) => {
  const merge = mergeProps({ gutter: 6 } as NavigationMenuProps, props);
  const [, rest] = splitProps(merge, ["class", "children"]);

  return (
    <NavigationMenuPrimitive
      class={cx("group/navigation-menu relative flex max-w-max flex-1 items-center justify-center data-[orientation=vertical]:flex-col", props.class)}
      data-slot="navigation-menu"
      {...rest}
    >
      {props.children}
      <NavigationMenuPrimitive.Viewport class="origin-(--kb-menu-content-transform-origin) data-[expanded]:animate-in data-[closed]:animate-out data-[closed]:zoom-out-95 data-[expanded]:zoom-in-90 data-[expanded]:fade-in-0 data-[closed]:fade-out-0 w-(--kb-navigation-menu-viewport-width) h-(--kb-navigation-menu-viewport-height) bg-popover text-popover-foreground z-50 overflow-x-clip overflow-y-visible rounded-md border shadow transition-[width,height] duration-300 data-[orientation=vertical]:overflow-y-clip data-[orientation=vertical]:overflow-x-visible" />
    </NavigationMenuPrimitive>
  );
};

export type NavigationMenuListProps = ComponentProps<typeof NavigationMenuPrimitive.Menu>;

export const NavigationMenuList = (props: NavigationMenuListProps) => {
  return <NavigationMenuPrimitive.Menu data-slot="navigation-menu-list" {...props} />;
};

export type NavigationMenuItemProps<T extends ValidComponent = "a"> = ComponentProps<typeof NavigationMenuPrimitive.Item<T>>;

export const NavigationMenuItem = <T extends ValidComponent = "a">(props: NavigationMenuItemProps<T>) => {
  const [, rest] = splitProps(props as NavigationMenuItemProps, ["class"]);

  return (
    <NavigationMenuPrimitive.Item
      class={cx(
        "data-[expanded]:focus:bg-accent data-[expanded]:hover:bg-accent data-[expanded]:bg-accent/50 data-[expanded]:text-accent-foreground hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus-visible:ring-ring/50 [&_svg:not([class*='text-'])]:text-muted-foreground flex flex-col gap-1 rounded-sm p-2 text-sm outline-none transition-all focus-visible:outline-1 focus-visible:ring-[3px] [&_svg:not([class*='size-'])]:size-4",
        props.class,
      )}
      data-slot="navigation-menu-item"
      {...rest}
    />
  );
};

export const navigationButtonVariant = cva({
  base: [
    "group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium disabled:pointer-events-none disabled:opacity-50 transition-[color,background-color,box-shadow] outline-none",
    "not-hover:data-[expanded]:text-accent-foreground not-hover:data-[expanded]:bg-accent/50",
    "data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground",
  ],
});

export type NavigationMenuTriggerProps<T extends ValidComponent = "button"> = ComponentProps<typeof NavigationMenuPrimitive.Trigger<T>>;

export const NavigationMenuTrigger = <T extends ValidComponent = "button">(props: NavigationMenuTriggerProps<T>) => {
  const [, rest] = splitProps(props as NavigationMenuTriggerProps, ["class", "children"]);

  return (
    <NavigationMenuPrimitive.Trigger
      class={navigationButtonVariant({
        class: props.class,
      })}
      data-slot="navigation-menu-trigger"
      {...rest}
    >
      {props.children}
      <NavigationMenuPrimitive.Icon class="data-[expanded]:group-data-[orientation=vertical]/navigation-menu:rotate-x-180 relative top-[1px] ml-1 size-3 transition-transform duration-300 group-[:any-link]:hidden data-[expanded]:rotate-180 group-data-[orientation=vertical]/navigation-menu:-rotate-90 data-[expanded]:group-data-[orientation=vertical]/navigation-menu:-rotate-90">
        <svg aria-hidden="true" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="m6 9l6 6l6-6" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
        </svg>
      </NavigationMenuPrimitive.Icon>
    </NavigationMenuPrimitive.Trigger>
  );
};

export type NavigationMenuContentProps<T extends ValidComponent = "ul"> = ComponentProps<typeof NavigationMenuPrimitive.Content<T>>;

export const NavigationMenuContent = <T extends ValidComponent = "ul">(props: NavigationMenuContentProps<T>) => {
  const [, rest] = splitProps(props as NavigationMenuContentProps, ["class"]);

  return (
    <NavigationMenuPrimitive.Content
      class={cx(
        "data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out duration-300",
        "data-[orientation=horizontal]:data-[motion=from-end]:slide-in-from-right-52 data-[orientation=horizontal]:data-[motion=from-start]:slide-in-from-left-52 data-[orientation=horizontal]:data-[motion=to-end]:slide-out-to-right-52 data-[orientation=horizontal]:data-[motion=to-start]:slide-out-to-left-52",
        "data-[orientation=vertical]:data-[motion=from-end]:slide-in-from-bottom-52 data-[orientation=vertical]:data-[motion=from-start]:slide-in-from-top-52 data-[orientation=vertical]:data-[motion=to-end]:slide-out-to-bottom-52 data-[orientation=vertical]:data-[motion=to-start]:slide-out-to-top-52",
        "absolute left-0 top-0 p-2 pr-2.5 outline-none",
        "**:data-[slot=navigation-menu-item]:focus:ring-0 **:data-[slot=navigation-menu-item]:focus:outline-none",
        props.class,
      )}
      data-slot="navigation-menu-content"
      {...rest}
    />
  );
};

export type NavigationItemLabelProps<T extends ValidComponent = "div"> = ComponentProps<typeof NavigationMenuPrimitive.ItemLabel<T>>;

export const NavigationItemLabel = <T extends ValidComponent = "div">(props: NavigationItemLabelProps<T>) => {
  const [, rest] = splitProps(props as NavigationItemLabelProps, ["class"]);

  return <NavigationMenuPrimitive.ItemLabel class={cx("text-sm font-medium leading-none", props.class)} data-slot="navigation-menu-label" {...rest} />;
};

export type NavigationItemDescriptionProps<T extends ValidComponent = "div"> = ComponentProps<typeof NavigationMenuPrimitive.ItemDescription<T>>;

export const NavigationItemDescription = <T extends ValidComponent = "div">(props: NavigationItemDescriptionProps<T>) => {
  const [, rest] = splitProps(props as NavigationItemDescriptionProps, ["class"]);

  return (
    <NavigationMenuPrimitive.ItemDescription
      class={cx("text-muted-foreground line-clamp-2 text-sm leading-snug", props.class)}
      data-slot="navigation-menu-description"
      {...rest}
    />
  );
};
