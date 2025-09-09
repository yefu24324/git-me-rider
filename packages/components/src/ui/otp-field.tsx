import OTPFieldPrimitive from "@corvu/otp-field";
import type { VoidProps } from "solid-js";
import { type ComponentProps, Show, splitProps, type ValidComponent } from "solid-js";

import { cx } from "@/components/utils/cva";

export type OTPFieldProps<T extends ValidComponent = "div"> = ComponentProps<typeof OTPFieldPrimitive<T>>;

export const OTPField = <T extends ValidComponent = "div">(props: OTPFieldProps<T>) => {
  const [, rest] = splitProps(props as OTPFieldProps, ["class"]);

  return <OTPFieldPrimitive class={cx("has-disabled:opacity-50 flex items-center gap-2", props.class)} data-slot="otp-field" {...rest} />;
};

export type OTPFieldGroupProps = ComponentProps<"div">;

export const OTPFieldGroup = (props: OTPFieldGroupProps) => {
  const [, rest] = splitProps(props, ["class"]);

  return <div class={cx("flex items-center", props.class)} data-slot="otp-field-group" {...rest} />;
};

export type OTPFieldSlotProps = VoidProps<ComponentProps<"div"> & { index: number }>;

export const OTPFieldSlot = (props: OTPFieldSlotProps) => {
  const [, rest] = splitProps(props, ["class", "index"]);

  const context = OTPFieldPrimitive.useContext();

  const char = () => context.value()[props.index];
  const hasFakeCaret = () => context.value().length === props.index && context.isInserting();
  const isActive = () => context.activeSlots().includes(props.index);

  return (
    <div
      class={cx(
        "data-[active=true]:border-ring data-[active=true]:ring-ring/50 data-[active=true]:aria-invalid:ring-destructive/20 dark:data-[active=true]:aria-invalid:ring-destructive/40 aria-invalid:border-destructive data-[active=true]:aria-invalid:border-destructive dark:bg-input/30 border-input shadow-xs relative flex h-9 w-9 items-center justify-center border-y border-r text-sm outline-none transition-all first:rounded-l-md first:border-l last:rounded-r-md data-[active=true]:z-10 data-[active=true]:ring-[3px]",
        props.class,
      )}
      data-active={isActive()}
      data-slot="otp-field-slot"
      {...rest}
    >
      {char()}
      <Show when={hasFakeCaret()}>
        <div class="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div class="animate-caret-blink bg-foreground h-4 w-px duration-1000" />
        </div>
      </Show>
    </div>
  );
};

export type OTPFieldSeparatorProps = VoidProps<ComponentProps<"div">>;

export const OTPFieldSeparator = (props: OTPFieldSeparatorProps) => {
  return (
    <div data-slot="otp-field-separator" role="separator" {...props}>
      <svg class="size-4" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M5 12h14" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
      </svg>
    </div>
  );
};

export type OTPFieldInputProps<T extends ValidComponent = "input"> = ComponentProps<typeof OTPFieldPrimitive.Input<T>>;

export const OTPFieldInput = <T extends ValidComponent = "input">(props: OTPFieldInputProps<T>) => {
  return <OTPFieldPrimitive.Input data-slot="otp-field-input" {...props} />;
};
