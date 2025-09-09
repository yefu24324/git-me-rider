import { NumberField as NumberFieldPrimitive } from "@kobalte/core/number-field";
import type { ValidComponent, VoidProps } from "solid-js";
import { type ComponentProps, splitProps } from "solid-js";

import { cx } from "@/components/utils/cva";

export type NumberFieldProps<T extends ValidComponent = "div"> = ComponentProps<typeof NumberFieldPrimitive<T>>;

export const NumberField = <T extends ValidComponent = "div">(props: NumberFieldProps<T>) => {
  const [, rest] = splitProps(props as NumberFieldProps, ["class"]);

  return <NumberFieldPrimitive class={cx("grid gap-2", props.class)} data-slot="number-field" {...rest} />;
};

export type NumberFieldGroupProps = ComponentProps<"div">;

export const NumberFieldGroup = (props: NumberFieldGroupProps) => {
  const [, rest] = splitProps(props, ["class"]);

  return (
    <div
      class={cx(
        "focus-within:border-ring focus-within:ring-ring/50 border-input has-aria-invalid:ring-destructive/20 dark:has-aria-invalid:ring-destructive/40 has-aria-invalid:border-destructive relative rounded-md border transition-shadow focus-within:ring-[3px]",
        props.class,
      )}
      data-slot="number-field-group"
      {...rest}
    />
  );
};

export type NumberFieldLabelProps<T extends ValidComponent = "label"> = ComponentProps<typeof NumberFieldPrimitive.Label<T>>;

export const NumberFieldLabel = <T extends ValidComponent = "label">(props: NumberFieldLabelProps<T>) => {
  const [, rest] = splitProps(props as NumberFieldLabelProps, ["class"]);

  return (
    <NumberFieldPrimitive.Label
      class={cx(
        "aria-invalid:text-destructive flex select-none items-center gap-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-50 group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50",
        props.class,
      )}
      data-slot="number-field-label"
      {...rest}
    />
  );
};

export type NumberFieldInputProps<T extends ValidComponent = "input"> = VoidProps<ComponentProps<typeof NumberFieldPrimitive.Input<T>>>;

export const NumberFieldInput = <T extends ValidComponent = "input">(props: NumberFieldInputProps<T>) => {
  const [, rest] = splitProps(props as NumberFieldInputProps, ["class"]);

  return (
    <NumberFieldPrimitive.Input
      class={cx(
        "placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 shadow-xs flex h-9 w-full min-w-0 rounded-md bg-transparent px-3 py-1 text-center text-base outline-none transition-colors disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        props.class,
      )}
      data-slot="number-field-input"
      {...rest}
    />
  );
};

export type NumberFieldDecrementTriggerProps<T extends ValidComponent = "button"> = VoidProps<ComponentProps<typeof NumberFieldPrimitive.DecrementTrigger<T>>>;

export const NumberFieldDecrementTrigger = <T extends ValidComponent = "button">(props: NumberFieldDecrementTriggerProps<T>) => {
  const [, rest] = splitProps(props as NumberFieldDecrementTriggerProps, ["class"]);

  return (
    <NumberFieldPrimitive.DecrementTrigger
      class={cx("absolute left-0 top-1/2 -translate-y-1/2 p-3 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50", props.class)}
      data-slot="number-field-decrement-trigger"
      {...rest}
    >
      <svg class="size-4" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M5 12h14" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
      </svg>
    </NumberFieldPrimitive.DecrementTrigger>
  );
};

export type NumberFieldIncrementTriggerProps<T extends ValidComponent = "button"> = VoidProps<ComponentProps<typeof NumberFieldPrimitive.IncrementTrigger<T>>>;

export const NumberFieldIncrementTrigger = <T extends ValidComponent = "button">(props: NumberFieldIncrementTriggerProps<T>) => {
  const [, rest] = splitProps(props as NumberFieldIncrementTriggerProps, ["class"]);

  return (
    <NumberFieldPrimitive.IncrementTrigger
      class={cx("absolute right-0 top-1/2 -translate-y-1/2 p-3 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50", props.class)}
      data-slot="number-field-increment-trigger"
      {...rest}
    >
      <svg class="size-4" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 5v14m-7-7h14" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
      </svg>
    </NumberFieldPrimitive.IncrementTrigger>
  );
};

export type NumberFieldErrorMessageProps<T extends ValidComponent = "div"> = ComponentProps<typeof NumberFieldPrimitive.ErrorMessage<T>>;

export const NumberFieldErrorMessage = <T extends ValidComponent = "div">(props: NumberFieldErrorMessageProps<T>) => {
  const [, rest] = splitProps(props as NumberFieldErrorMessageProps, ["class"]);

  return <NumberFieldPrimitive.ErrorMessage class={cx("text-destructive text-sm", props.class)} data-slot="number-field-error-message" {...rest} />;
};

export type NumberFieldDescriptionProps<T extends ValidComponent = "div"> = ComponentProps<typeof NumberFieldPrimitive.Description<T>>;

export const NumberFieldDescription = <T extends ValidComponent = "div">(props: NumberFieldDescriptionProps<T>) => {
  const [, rest] = splitProps(props as NumberFieldDescriptionProps, ["class"]);

  return <NumberFieldPrimitive.Description class={cx("text-muted-foreground text-sm", props.class)} data-slot="number-field-description" {...rest} />;
};
