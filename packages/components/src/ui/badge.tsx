import { Badge as BadgePrimitive } from "@kobalte/core/badge";
import type { VariantProps } from "cva";
import type { ComponentProps, ValidComponent } from "solid-js";
import { splitProps } from "solid-js";

import { cva } from "@/components/utils/cva";

export const badgeVariants = cva({
  base: "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  defaultVariants: {
    variant: "default",
  },
  variants: {
    variant: {
      default: "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
      destructive:
        "border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
      outline: "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
      secondary: "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
    },
  },
});

export type BadgeProps<T extends ValidComponent = "span"> = ComponentProps<typeof BadgePrimitive<T>> & VariantProps<typeof badgeVariants>;

export const Badge = <T extends ValidComponent = "span">(props: BadgeProps<T>) => {
  const [, rest] = splitProps(props as BadgeProps, ["class", "variant"]);

  return (
    <BadgePrimitive
      class={badgeVariants({
        class: props.class,
        variant: props.variant,
      })}
      data-slot="badge"
      {...rest}
    />
  );
};
