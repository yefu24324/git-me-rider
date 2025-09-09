import { ToggleButton as ToggleButtonPrimitive } from "@kobalte/core/toggle-button";
import type { VariantProps } from "cva";
import { type ComponentProps, splitProps, type ValidComponent } from "solid-js";

import { cva } from "@/components/utils/cva";

export const toggleButtonVariants = cva({
  base: "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium hover:bg-muted hover:text-muted-foreground disabled:pointer-events-none disabled:opacity-50 data-[pressed]:bg-accent data-[pressed]:text-accent-foreground [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] outline-none transition-[color,background-color,box-shadow] whitespace-nowrap",
  defaultVariants: {
    size: "default",
    variant: "default",
  },
  variants: {
    size: {
      default: "h-9 px-2 min-w-9",
      lg: "h-10 px-2.5 min-w-10",
      sm: "h-8 px-1.5 min-w-8",
    },
    variant: {
      default: "bg-transparent",
      outline: "border border-input bg-transparent shadow-xs hover:bg-accent hover:text-accent-foreground",
    },
  },
});

export type ToggleButtonProps<T extends ValidComponent = "button"> = ComponentProps<typeof ToggleButtonPrimitive<T>> &
  VariantProps<typeof toggleButtonVariants>;

export const ToggleButton = <T extends ValidComponent = "button">(props: ToggleButtonProps<T>) => {
  const [, rest] = splitProps(props as ToggleButtonProps, ["class", "variant", "size"]);

  return (
    <ToggleButtonPrimitive
      class={toggleButtonVariants({
        class: props.class,
        size: props.size,
        variant: props.variant,
      })}
      data-slot="toggle"
      {...rest}
    />
  );
};
