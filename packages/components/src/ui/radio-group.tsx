import { RadioGroup as RadioGroupPrimitive } from "@kobalte/core/radio-group";
import type { VoidProps } from "solid-js";
import { type ComponentProps, splitProps, type ValidComponent } from "solid-js";

import { cx } from "@/components/utils/cva";

export type RadioGroupProps<T extends ValidComponent = "div"> = ComponentProps<typeof RadioGroupPrimitive<T>>;

export const RadioGroup = <T extends ValidComponent = "div">(props: RadioGroupProps<T>) => {
  const [, rest] = splitProps(props as RadioGroupProps, ["class"]);

  return <RadioGroupPrimitive class={cx("grid gap-3", props.class)} data-slot="radio-group" {...rest} />;
};

export type RadioGroupItemsProps = ComponentProps<"div">;

export const RadioGroupItems = (props: RadioGroupItemsProps) => {
  const [, rest] = splitProps(props, ["class"]);

  return <div class={cx("flex gap-3", props.class)} data-slot="radio-group-items" role="presentation" {...rest} />;
};

export type RadioGroupItemProps<T extends ValidComponent = "div"> = ComponentProps<typeof RadioGroupPrimitive.Item<T>>;

export const RadioGroupItem = <T extends ValidComponent = "div">(props: RadioGroupItemProps<T>) => {
  const [, rest] = splitProps(props as RadioGroupItemProps, ["class", "children"]);

  return (
    <RadioGroupPrimitive.Item class={cx("flex items-center gap-3", props.class)} data-slot="radio-group-item" {...rest}>
      <RadioGroupPrimitive.ItemInput class="peer/radio-group" data-slot="radio-group-item-input" />
      {props.children}
    </RadioGroupPrimitive.Item>
  );
};

export type RadioGroupItemControlProps<T extends ValidComponent = "div"> = ComponentProps<typeof RadioGroupPrimitive.ItemControl<T>>;

export const RadioGroupItemControl = <T extends ValidComponent = "div">(props: RadioGroupItemControlProps<T>) => {
  const [, rest] = splitProps(props as RadioGroupItemControlProps, ["class"]);

  return (
    <RadioGroupPrimitive.ItemControl
      class={cx(
        "border-input dark:bg-input/30 shadow-xs flex size-4 items-center justify-center rounded-full border outline-none transition-[color,box-shadow] disabled:cursor-not-allowed disabled:opacity-50",
        "data-[invalid]:ring-destructive/20 dark:data-[invalid]:ring-destructive/40 data-[invalid]:border-destructive",
        "peer-focus-visible/radio-group:ring-ring/50 peer-focus-visible/radio-group:border-ring peer-focus-visible/radio-group:ring-[3px]",
        props.class,
      )}
      data-slot="radio-group-item-control"
      {...rest}
    />
  );
};

export type RadioGroupItemIndicatorProps<T extends ValidComponent = "div"> = VoidProps<ComponentProps<typeof RadioGroupPrimitive.ItemIndicator<T>>>;

export const RadioGroupItemIndicator = <T extends ValidComponent = "div">(props: RadioGroupItemIndicatorProps<T>) => {
  const [, rest] = splitProps(props as RadioGroupItemIndicatorProps, ["class"]);

  return (
    <RadioGroupPrimitive.ItemIndicator
      class={cx("data-[checked]:bg-primary size-2 rounded-full", props.class)}
      data-slot="radio-group-item-indicator"
      forceMount
      {...rest}
    />
  );
};

export type RadioGroupLabelProps<T extends ValidComponent = "span"> = ComponentProps<typeof RadioGroupPrimitive.Label<T>>;

export const RadioGroupLabel = <T extends ValidComponent = "span">(props: RadioGroupLabelProps<T>) => {
  const [, rest] = splitProps(props as RadioGroupLabelProps, ["class"]);

  return <RadioGroupPrimitive.Label class={cx("select-none text-sm font-medium", props.class)} data-slot="radio-group-label" forceMount {...rest} />;
};

export type RadioGroupItemLabelProps<T extends ValidComponent = "span"> = ComponentProps<typeof RadioGroupPrimitive.ItemLabel<T>>;

export const RadioGroupItemLabel = <T extends ValidComponent = "span">(props: RadioGroupItemLabelProps<T>) => {
  const [, rest] = splitProps(props as RadioGroupItemLabelProps, ["class"]);

  return <RadioGroupPrimitive.ItemLabel class={cx("select-none text-sm font-medium", props.class)} data-slot="radio-group-item-label" forceMount {...rest} />;
};

export type RadioGroupDescriptionProps<T extends ValidComponent = "span"> = ComponentProps<typeof RadioGroupPrimitive.Label<T>>;

export const RadioGroupDescription = <T extends ValidComponent = "span">(props: RadioGroupDescriptionProps<T>) => {
  const [, rest] = splitProps(props as RadioGroupDescriptionProps, ["class"]);

  return <RadioGroupPrimitive.Description class={cx("text-muted-foreground text-sm", props.class)} data-slot="radio-group-description" forceMount {...rest} />;
};

export type RadioGroupErrorMessageProps<T extends ValidComponent = "span"> = ComponentProps<typeof RadioGroupPrimitive.ErrorMessage<T>>;

export const RadioGroupErrorMessage = <T extends ValidComponent = "span">(props: RadioGroupErrorMessageProps<T>) => {
  const [, rest] = splitProps(props as RadioGroupErrorMessageProps, ["class"]);

  return <RadioGroupPrimitive.ErrorMessage class={cx("text-destructive text-sm", props.class)} data-slot="radio-group-error-message" forceMount {...rest} />;
};
