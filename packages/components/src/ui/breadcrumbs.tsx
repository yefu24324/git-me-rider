import { Breadcrumbs as BreadcrumbsPrimitive } from "@kobalte/core/breadcrumbs";
import type { VoidProps } from "solid-js";
import { type ComponentProps, splitProps, type ValidComponent } from "solid-js";

import { cx } from "@/components/utils/cva";

export type BreadcrumbsProps<T extends ValidComponent = "nav"> = ComponentProps<typeof BreadcrumbsPrimitive<T>>;

export const Breadcrumbs = <T extends ValidComponent = "nav">(props: BreadcrumbsProps<T>) => {
  return (
    <BreadcrumbsPrimitive
      data-slot="breadcrumbs"
      separator={
        <svg class="size-4" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="m9 18l6-6l-6-6" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
        </svg>
      }
      {...props}
    />
  );
};

export type BreadcrumbListProps = ComponentProps<"ol">;

export const BreadcrumbList = (props: BreadcrumbListProps) => {
  const [, rest] = splitProps(props, ["class"]);

  return (
    <ol
      class={cx("text-muted-foreground flex flex-wrap items-center gap-1.5 break-words text-sm sm:gap-2.5", props.class)}
      data-slot="breadcrumb-list"
      {...rest}
    />
  );
};

export type BreadcrumbsItemProps = ComponentProps<"li">;

export const BreadcrumbsItem = (props: BreadcrumbsItemProps) => {
  const [, rest] = splitProps(props, ["class"]);

  return <li class={cx("inline-flex items-center gap-1.5", props.class)} data-slot="breadcrumb-item" {...rest} />;
};

export type BreadcrumbsLinkProps<T extends ValidComponent = "a"> = ComponentProps<typeof BreadcrumbsPrimitive.Link<T>>;

export const BreadcrumbsLink = <T extends ValidComponent = "a">(props: BreadcrumbsLinkProps<T>) => {
  const [, rest] = splitProps(props as BreadcrumbsLinkProps, ["class"]);

  return (
    <BreadcrumbsPrimitive.Link
      class={cx("hover:text-foreground data-[current]:text-foreground transition-colors data-[current]:font-normal", props.class)}
      data-slot="breadcrumb-link"
      {...rest}
    />
  );
};

export type BreadcrumbsSeparatorProps<T extends ValidComponent = "span"> = ComponentProps<typeof BreadcrumbsPrimitive.Separator<T>>;

export const BreadcrumbsSeparator = <T extends ValidComponent = "span">(props: BreadcrumbsSeparatorProps<T>) => {
  const [, rest] = splitProps(props as BreadcrumbsSeparatorProps, ["class"]);

  return <BreadcrumbsPrimitive.Separator class={cx("[&>svg]:size-3.5", props.class)} data-slot="breadcrumb-separator" {...rest} />;
};

export type BreadcrumbsEllipsisProps = VoidProps<ComponentProps<"span">>;

export const BreadcrumbsEllipsis = (props: BreadcrumbsEllipsisProps) => {
  const [, rest] = splitProps(props, ["class"]);

  return (
    <span aria-hidden="true" class={cx("flex size-9 items-center justify-center", props.class)} data-slot="breadcrumb-ellipsis" role="presentation" {...rest}>
      <svg class="size-4" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
          <circle cx="12" cy="12" r="1" />
          <circle cx="19" cy="12" r="1" />
          <circle cx="5" cy="12" r="1" />
        </g>
      </svg>
      <span class="sr-only">More</span>
    </span>
  );
};
