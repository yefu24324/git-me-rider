import { Slider as SliderPrimitive } from "@kobalte/core/slider";
import type { VoidProps } from "solid-js";
import { type ComponentProps, splitProps, type ValidComponent } from "solid-js";

import { cx } from "@/components/utils/cva";

export type SliderProps<T extends ValidComponent = "div"> = ComponentProps<typeof SliderPrimitive<T>>;

export const Slider = <T extends ValidComponent = "div">(props: SliderProps<T>) => {
  const [, rest] = splitProps(props as SliderProps, ["class"]);

  return (
    <SliderPrimitive
      class={cx(
        "relative flex w-full touch-none select-none flex-col items-center gap-2 data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[disabled]:opacity-50",
        props.class,
      )}
      data-slot="slider"
      {...rest}
    />
  );
};

export type SliderTrackProps<T extends ValidComponent = "div"> = ComponentProps<typeof SliderPrimitive.Track<T>>;

export const SliderTrack = <T extends ValidComponent = "div">(props: SliderTrackProps<T>) => {
  const [, rest] = splitProps(props as SliderTrackProps, ["class"]);

  return (
    <SliderPrimitive.Track
      class={cx(
        "bg-muted relative rounded-full data-[orientation=horizontal]:h-1.5 data-[orientation=vertical]:h-[inherit] data-[orientation=vertical]:min-h-[inherit] data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-1.5",
        props.class,
      )}
      data-slot="slider-track"
      {...rest}
    />
  );
};

export type SliderFillProps<T extends ValidComponent = "div"> = VoidProps<ComponentProps<typeof SliderPrimitive.Fill<T>>>;

export const SliderFill = <T extends ValidComponent = "div">(props: SliderFillProps<T>) => {
  const [, rest] = splitProps(props as SliderFillProps, ["class"]);

  return (
    <SliderPrimitive.Fill
      class={cx("bg-primary absolute rounded-full data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full", props.class)}
      data-slot="slider-fill"
      {...rest}
    />
  );
};

export type SliderThumbProps<T extends ValidComponent = "span"> = VoidProps<ComponentProps<typeof SliderPrimitive.Thumb<T>>>;

export const SliderThumb = <T extends ValidComponent = "span">(props: SliderThumbProps<T>) => {
  const [, rest] = splitProps(props as SliderThumbProps, ["class"]);

  return (
    <SliderPrimitive.Thumb
      class={cx(
        "border-primary bg-background ring-ring/50 focus-visible:outline-hidden size-4 rounded-full border shadow-sm transition-[color,box-shadow] hover:ring-4 focus-visible:ring-4 disabled:pointer-events-none disabled:opacity-50 data-[orientation=horizontal]:-top-1 data-[orientation=vertical]:-left-1",
        props.class,
      )}
      data-slot="slider-thumb"
      {...rest}
    >
      <SliderPrimitive.Input />
    </SliderPrimitive.Thumb>
  );
};

export type SliderGroupProps = ComponentProps<"div">;

export const SliderGroup = (props: SliderGroupProps) => {
  const [, rest] = splitProps(props, ["class"]);

  return <div class={cx("flex w-full justify-between", props.class)} data-slot="slider-group" {...rest} />;
};

export type SliderLabelProps<T extends ValidComponent = "label"> = ComponentProps<typeof SliderPrimitive.Label<T>>;

export const SliderLabel = <T extends ValidComponent = "label">(props: SliderLabelProps<T>) => {
  const [, rest] = splitProps(props as SliderLabelProps, ["class"]);

  return <SliderPrimitive.Label class={cx("select-none text-sm font-medium", props.class)} data-slot="slider-label" {...rest} />;
};

export type SliderValueLabelProps<T extends ValidComponent = "div"> = ComponentProps<typeof SliderPrimitive.ValueLabel<T>>;

export const SliderValueLabel = <T extends ValidComponent = "div">(props: SliderValueLabelProps<T>) => {
  const [, rest] = splitProps(props as SliderValueLabelProps, ["class"]);

  return <SliderPrimitive.ValueLabel class={cx("select-none text-sm font-medium", props.class)} data-slot="slider-value-label" {...rest} />;
};

export type SliderDescriptionProps<T extends ValidComponent = "div"> = ComponentProps<typeof SliderPrimitive.Description<T>>;

export const SliderDescription = <T extends ValidComponent = "div">(props: SliderDescriptionProps<T>) => {
  const [, rest] = splitProps(props as SliderDescriptionProps, ["class"]);

  return <SliderPrimitive.Description class={cx("text-muted-foreground text-sm", props.class)} data-slot="slider-description" {...rest} />;
};

export type SliderErrorMessageProps<T extends ValidComponent = "div"> = ComponentProps<typeof SliderPrimitive.ErrorMessage<T>>;

export const SliderErrorMessage = <T extends ValidComponent = "div">(props: SliderErrorMessageProps<T>) => {
  const [, rest] = splitProps(props as SliderErrorMessageProps, ["class"]);

  return <SliderPrimitive.ErrorMessage class={cx("text-destructive text-sm", props.class)} data-slot="slider-ErrorMessage" {...rest} />;
};
