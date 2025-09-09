import { Search as SearchPrimitive, useSearchContext } from "@kobalte/core/search";
import type { Accessor, JSX } from "solid-js";
import { type ComponentProps, Show, splitProps, type ValidComponent } from "solid-js";

import { cx } from "@/components/utils/cva";

export const SearchPortal = SearchPrimitive.Portal;

export type SearchProps<Option, OptGroup = never, T extends ValidComponent = "div"> = ComponentProps<typeof SearchPrimitive<Option, OptGroup, T>>;

export const Search = <Option, OtpGroup = never, T extends ValidComponent = "div">(props: SearchProps<Option, OtpGroup, T>) => {
  return <SearchPrimitive class="flex flex-col gap-2" data-slot="search" {...props} />;
};

export type SearchIconProps<T extends ValidComponent = "span"> = ComponentProps<typeof SearchPrimitive.Icon<T>>;

export const SearchIcon = <T extends ValidComponent = "span">(props: SearchIconProps<T>) => {
  const [, rest] = splitProps(props as SearchIconProps, ["class"]);

  return (
    <SearchPrimitive.Icon
      class={cx("[&_svg:not([class*='text-'])]:text-muted-foreground [&_svg:not([class*='size-'])]:size-3.5", props.class)}
      data-slot="search-icon"
      {...rest}
    />
  );
};

export type SearchIndicatorProps<T extends ValidComponent = "div"> = ComponentProps<typeof SearchPrimitive.Indicator<T>>;

export const SearchIndicator = <T extends ValidComponent = "div">(props: SearchIndicatorProps<T>) => {
  const [, rest] = splitProps(props as SearchIndicatorProps, ["class"]);

  return <SearchPrimitive.Indicator class={cx("flex items-center justify-center", props.class)} data-slot="search-indicator" {...rest} />;
};

export type SearchControlProps<T extends ValidComponent = "div"> = ComponentProps<typeof SearchPrimitive.Control<T>> & {
  leftIndicator?: Accessor<JSX.Element>;
  rightIndicator?: Accessor<JSX.Element>;
};

export const SearchControl = <T extends ValidComponent = "div">(props: SearchControlProps<T>) => {
  const [, rest] = splitProps(props as SearchControlProps, ["class", "leftIndicator", "rightIndicator"]);

  return (
    <SearchPrimitive.Control
      class={cx(
        "dark:bg-input/30 border-input shadow-xs flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-base transition-[color,box-shadow] data-[disabled]:pointer-events-none data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50 md:text-sm",
        "data-[invalid]:ring-destructive/20 dark:data-[invalid]:ring-destructive/40 data-[invalid]:border-destructive",
        props.class,
      )}
      data-slot="search-control"
      {...rest}
    >
      {props.leftIndicator?.()}
      <SearchPrimitive.Input
        class={cx(
          "w-full focus-visible:outline-none",
          props.leftIndicator?.() && "pl-3",
          (!props.rightIndicator?.() && !props.leftIndicator?.()) || props.rightIndicator?.() ? "pr-3" : null,
        )}
        data-slot="search-input"
      />
      <Show fallback={props.rightIndicator?.()} when={!props.rightIndicator?.() && !props.leftIndicator?.()}>
        <SearchIndicator
          loadingComponent={
            <SearchIcon class="animate-spin">
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M12 2v4m4.2 1.8l2.9-2.9M18 12h4m-5.8 4.2l2.9 2.9M12 18v4m-7.1-2.9l2.9-2.9M2 12h4M4.9 4.9l2.9 2.9"
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                />
              </svg>
            </SearchIcon>
          }
        >
          <SearchIcon>
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                <path d="m21 21l-4.34-4.34" />
                <circle cx="11" cy="11" r="8" />
              </g>
            </svg>
          </SearchIcon>
        </SearchIndicator>
      </Show>
    </SearchPrimitive.Control>
  );
};

export type SearchContentProps<T extends ValidComponent = "div"> = ComponentProps<typeof SearchPrimitive.Content<T>>;

export const SearchContent = <T extends ValidComponent = "div">(props: SearchContentProps<T>) => {
  const [, rest] = splitProps(props as SearchContentProps, ["class"]);

  return (
    <SearchPrimitive.Content
      class={cx(
        "bg-popover text-popover-foreground data-[expanded]:animate-in data-[closed]:animate-out data-[closed]:fade-out-0 data-[expanded]:fade-in-0 data-[closed]:zoom-out-95 data-[expanded]:zoom-in-95 origin-(--kb-search-content-transform-origin) relative z-50 min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border shadow-md",
        "[[data-popper-positioner][style*='--kb-popper-content-transform-origin:_top']>[data-slot=search-content]]:slide-in-from-top-2 [[data-popper-positioner][style*='--kb-popper-content-transform-origin:_bottom']>[data-slot=search-content]]:slide-in-from-bottom-2 [[data-popper-positioner][style*='--kb-popper-content-transform-origin:_left']>[data-slot=search-content]]:slide-in-from-left-2 [[data-popper-positioner][style*='--kb-popper-content-transform-origin:_right']>[data-slot=search-content]]:slide-in-from-right-2",
        // TODO: remove when maintainer found a fix
        "data-[closed]:hidden",
        props.class,
      )}
      data-slot="search-content"
      onCloseAutoFocus={(e) => {
        e.preventDefault();
      }}
      {...rest}
    />
  );
};

export type SearchNoResultProps<T extends ValidComponent = "span"> = ComponentProps<typeof SearchPrimitive.NoResult<T>>;

export const SearchNoResult = <T extends ValidComponent = "span">(props: SearchNoResultProps<T>) => {
  const [, rest] = splitProps(props as SearchContentProps, ["class"]);

  return <SearchPrimitive.NoResult class={cx("py-6 text-center text-sm", props.class)} data-slot="search-no-result" {...rest} />;
};

export type SearchItemProps<T extends ValidComponent = "li"> = ComponentProps<typeof SearchPrimitive.Item<T>>;

export const SearchItem = <T extends ValidComponent = "li">(props: SearchItemProps<T>) => {
  const [, rest] = splitProps(props as SearchItemProps, ["class"]);

  return (
    <SearchPrimitive.Item
      class={cx(
        "data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground outline-hidden relative flex w-full cursor-default select-none items-center justify-between gap-2 rounded-sm px-2 py-1.5 text-sm data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        props.class,
      )}
      data-slot="search-item"
      {...rest}
    />
  );
};

export type SearchLabelProps<T extends ValidComponent = "label"> = ComponentProps<typeof SearchPrimitive.Label<T>>;

export const SearchLabel = <T extends ValidComponent = "label">(props: SearchLabelProps<T>) => {
  const [, rest] = splitProps(props as SearchLabelProps, ["class"]);

  return (
    <SearchPrimitive.Label
      class={cx(
        "select-none text-sm font-medium",
        "data-[disabled]:pointer-events-none data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
        "data-[invalid]:text-destructive",
        props.class,
      )}
      data-slot="search-label"
      {...rest}
    />
  );
};

export type SearchDescriptionProps<T extends ValidComponent = "div"> = ComponentProps<typeof SearchPrimitive.Description<T>>;

export const SearchDescription = <T extends ValidComponent = "div">(props: SearchDescriptionProps<T>) => {
  const [, rest] = splitProps(props as SearchDescriptionProps, ["class"]);

  return <SearchPrimitive.Description class={cx("text-muted-foreground text-sm", props.class)} data-slot="search-description" {...rest} />;
};

export type SearchItemDescriptionProps<T extends ValidComponent = "div"> = ComponentProps<typeof SearchPrimitive.ItemDescription<T>>;

export const SearchItemDescription = <T extends ValidComponent = "div">(props: SearchItemDescriptionProps<T>) => {
  const [, rest] = splitProps(props as SearchItemDescriptionProps, ["class"]);

  return <SearchPrimitive.ItemDescription class={cx("text-muted-foreground text-sm", props.class)} data-slot="search-item-description" {...rest} />;
};

export type SearchItemLabelProps<T extends ValidComponent = "div"> = ComponentProps<typeof SearchPrimitive.ItemLabel<T>>;

export const SearchItemLabel = <T extends ValidComponent = "div">(props: SearchItemLabelProps<T>) => {
  return <SearchPrimitive.ItemLabel data-slot="search-item-label" {...props} />;
};

export type SearchListboxProps<Option, OptGroup = never, T extends ValidComponent = "ul"> = ComponentProps<typeof SearchPrimitive.Listbox<Option, OptGroup, T>>;

export const SearchListbox = <Option, OptGroup = never, T extends ValidComponent = "ul">(props: SearchListboxProps<Option, OptGroup, T>) => {
  const [, rest] = splitProps(props as SearchListboxProps<Option>, ["class"]);
  const context = useSearchContext();

  return (
    <Show when={!context.noResult()}>
      <SearchPrimitive.Listbox class={cx("p-1", props.class)} data-slot="search-listbox" {...rest} />
    </Show>
  );
};

export type SearchSectionProps<T extends ValidComponent = "li"> = ComponentProps<typeof SearchPrimitive.Section<T>>;

export const SearchSection = <T extends ValidComponent = "li">(props: SearchSectionProps<T>) => {
  return <SearchPrimitive.Section data-slot="search-section" {...props} />;
};
