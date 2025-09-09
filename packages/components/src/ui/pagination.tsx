import { Pagination as PaginationPrimitive, usePaginationContext } from "@kobalte/core/pagination";
import type { VoidProps } from "solid-js";
import { type ComponentProps, mergeProps, splitProps, type ValidComponent } from "solid-js";

import { cx } from "@/components/utils/cva";
import type { ButtonProps } from "./button";
import { buttonVariants } from "./button";

export const PaginationItems = PaginationPrimitive.Items;

export type PaginationProps<T extends ValidComponent = "nav"> = ComponentProps<typeof PaginationPrimitive<T>>;

export const Pagination = <T extends ValidComponent = "nav">(props: PaginationProps<T>) => {
  const [, rest] = splitProps(props as PaginationProps, ["class"]);

  return (
    <PaginationPrimitive
      class={cx("mx-auto flex w-full justify-center [&>ul]:flex [&>ul]:flex-row [&>ul]:items-center [&>ul]:gap-1", props.class)}
      data-slot="pagination"
      {...rest}
    />
  );
};

export type PaginationEllipsisProps<T extends ValidComponent = "div"> = VoidProps<ComponentProps<typeof PaginationPrimitive.Ellipsis<T>>>;

export const PaginationEllipsis = <T extends ValidComponent = "div">(props: PaginationEllipsisProps<T>) => {
  const [, rest] = splitProps(props as PaginationEllipsisProps, ["class"]);

  return (
    <PaginationPrimitive.Ellipsis class={cx("flex size-9 items-center justify-center", props.class)} data-slot="pagination-ellipsis" {...rest}>
      <svg class="size-4" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
          <circle cx="12" cy="12" r="1" />
          <circle cx="19" cy="12" r="1" />
          <circle cx="5" cy="12" r="1" />
        </g>
      </svg>
    </PaginationPrimitive.Ellipsis>
  );
};

export type PaginationItemProps<T extends ValidComponent = "button"> = ComponentProps<typeof PaginationPrimitive.Item<T>> & Pick<ButtonProps, "size">;

export const PaginationItem = <T extends ValidComponent = "button">(props: PaginationItemProps<T>) => {
  const merge = mergeProps({ size: "icon" } as PaginationItemProps, props);
  const [, rest] = splitProps(merge, ["class", "page", "size"]);

  const context = usePaginationContext();

  const isCurrent = () => context.page() === props.page;

  return (
    <PaginationPrimitive.Item
      class={buttonVariants({
        class: props.class,
        size: props.size,
        variant: isCurrent() ? "outline" : "ghost",
      })}
      data-slot="pagination-item"
      page={props.page}
      {...rest}
    />
  );
};

export type PaginationNextProps<T extends ValidComponent = "button"> = VoidProps<ComponentProps<typeof PaginationPrimitive.Next<T>>>;

export const PaginationNext = <T extends ValidComponent = "button">(props: PaginationNextProps<T>) => {
  const [, rest] = splitProps(props as PaginationNextProps, ["class"]);

  return (
    <PaginationPrimitive.Next
      class={cx(
        buttonVariants({
          class: props.class,
          variant: "ghost",
        }),
        "gap-1 px-2.5 sm:pr-2.5",
      )}
      data-slot="pagination-next"
      {...rest}
    >
      <svg class="size-4" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="m9 18l6-6l-6-6" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
      </svg>
    </PaginationPrimitive.Next>
  );
};

export type PaginationPreviousProps<T extends ValidComponent = "button"> = VoidProps<ComponentProps<typeof PaginationPrimitive.Previous<T>>>;

export const PaginationPrevious = <T extends ValidComponent = "button">(props: PaginationPreviousProps<T>) => {
  const [, rest] = splitProps(props as PaginationPreviousProps, ["class"]);

  return (
    <PaginationPrimitive.Previous
      class={cx(
        buttonVariants({
          class: props.class,
          variant: "ghost",
        }),
        "gap-1 px-2.5 sm:pl-2.5",
      )}
      data-slot="pagination-previous"
      {...rest}
    >
      <svg class="size-4" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="m15 18l-6-6l6-6" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
      </svg>
    </PaginationPrimitive.Previous>
  );
};
