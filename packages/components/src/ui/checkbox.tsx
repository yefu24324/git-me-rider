import { Checkbox as CheckboxPrimitive } from "@kobalte/core/checkbox";
import type { ComponentProps, ValidComponent } from "solid-js";
import { splitProps } from "solid-js";

import { cx } from "@/components/utils/cva";

export type CheckboxProps<T extends ValidComponent = "div"> = ComponentProps<typeof CheckboxPrimitive<T>>;

export const Checkbox = <T extends ValidComponent = "div">(props: CheckboxProps<T>) => {
  return <CheckboxPrimitive data-slot="checkbox" {...props} />;
};

export type CheckboxLabelProps<T extends ValidComponent = "label"> = ComponentProps<typeof CheckboxPrimitive.Label<T>>;

export const CheckboxLabel = <T extends ValidComponent = "label">(props: CheckboxLabelProps<T>) => {
  const [, rest] = splitProps(props as CheckboxLabelProps, ["class"]);

  return (
    <CheckboxPrimitive.Label
      class={cx(
        "flex select-none items-center gap-2 text-sm font-medium leading-none data-[disabled]:pointer-events-none data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
        props.class,
      )}
      data-slot="checkbox-label"
      {...rest}
    />
  );
};

export type CheckboxDescriptionProps<T extends ValidComponent = "div"> = ComponentProps<typeof CheckboxPrimitive.Description<T>>;

export const CheckboxDescription = <T extends ValidComponent = "div">(props: CheckboxDescriptionProps<T>) => {
  const [, rest] = splitProps(props as CheckboxDescriptionProps, ["class"]);

  return (
    <CheckboxPrimitive.Description
      class={cx("text-muted-foreground text-sm data-[disabled]:opacity-50", props.class)}
      data-slot="checkbox-description"
      {...rest}
    />
  );
};

export type CheckboxInputProps<T extends ValidComponent = "input"> = ComponentProps<typeof CheckboxPrimitive.Input<T>>;

export const CheckboxInput = <T extends ValidComponent = "input">(props: CheckboxInputProps<T>) => {
  const [, rest] = splitProps(props as CheckboxInputProps, ["class"]);

  return (
    <CheckboxPrimitive.Input
      class={cx("[&:focus-visible+div]:ring-ring/50 peer [&:focus-visible+div]:ring-[3px]", props.class)}
      data-slot="checkbox-input"
      {...rest}
    />
  );
};

export type CheckboxControlProps<T extends ValidComponent = "div"> = ComponentProps<typeof CheckboxPrimitive.Control<T>>;

export const CheckboxControl = <T extends ValidComponent = "div">(props: CheckboxControlProps<T>) => {
  const [, rest] = splitProps(props as CheckboxControlProps, ["class"]);

  return (
    <>
      <CheckboxInput />
      <CheckboxPrimitive.Control
        class={cx(
          "peer-focus-visible:border-ring border-input dark:bg-input/30 data-[checked]:bg-primary data-[checked]:text-primary-foreground dark:data-[checked]:bg-primary data-[checked]:border-primary aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive shadow-xs size-4 shrink-0 rounded-[4px] border outline-none transition-shadow disabled:cursor-not-allowed disabled:opacity-50",
          props.class,
        )}
        data-slot="checkbox-control"
        {...rest}
      >
        <CheckboxPrimitive.Indicator class="flex items-center justify-center text-current transition-none" data-slot="checkbox-indicator">
          <svg class="size-3.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 6L9 17l-5-5" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
          </svg>
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Control>
    </>
  );
};
