import { Progress as ProgressPrimitive } from "@kobalte/core/progress";
import { type ComponentProps, splitProps, type ValidComponent } from "solid-js";

import { cx } from "@/components/utils/cva";

export type ProgressProps<T extends ValidComponent = "div"> = ComponentProps<typeof ProgressPrimitive<T>>;

export const Progress = <T extends ValidComponent = "div">(props: ProgressProps<T>) => {
  const [, rest] = splitProps(props as ProgressProps, ["class", "children"]);

  return (
    <ProgressPrimitive class={cx("flex w-full flex-col gap-3", props.class)} data-slot="progress" {...rest}>
      {props.children}
      <ProgressPrimitive.Track class="bg-primary/20 relative h-2 w-full overflow-hidden rounded-full" data-slot="progress-track">
        <ProgressPrimitive.Fill class="bg-primary w-(--kb-progress-fill-width) h-full transition-all" data-slot="progress-fill" />
      </ProgressPrimitive.Track>
    </ProgressPrimitive>
  );
};

export type ProgressGroupProps = ComponentProps<"div">;

export const ProgressGroup = (props: ProgressGroupProps) => {
  const [, rest] = splitProps(props, ["class"]);

  return <div class={cx("flex justify-between", props.class)} data-slot="progress-group" {...rest} />;
};

export type ProgressLabelProps<T extends ValidComponent = "span"> = ComponentProps<typeof ProgressPrimitive.Label<T>>;

export const ProgressLabel = <T extends ValidComponent = "span">(props: ProgressLabelProps<T>) => {
  const [, rest] = splitProps(props as ProgressLabelProps, ["class"]);

  return <ProgressPrimitive.Label class={cx("select-none text-sm font-medium", props.class)} data-slot="progress-label" {...rest} />;
};

export type ProgressValueLabelProps<T extends ValidComponent = "span"> = ComponentProps<typeof ProgressPrimitive.ValueLabel<T>>;

export const ProgressValueLabel = <T extends ValidComponent = "span">(props: ProgressValueLabelProps<T>) => {
  const [, rest] = splitProps(props as ProgressValueLabelProps, ["class"]);

  return <ProgressPrimitive.ValueLabel class={cx("select-none text-sm font-medium", props.class)} data-slot="progress-value-label" {...rest} />;
};
