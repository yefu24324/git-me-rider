import type { ComponentProps } from "solid-js";
import { splitProps } from "solid-js";

import { cx } from "@/components/utils/cva";

export type CardProps = ComponentProps<"div">;

export const Card = (props: CardProps) => {
  const [, rest] = splitProps(props, ["class"]);

  return <div class={cx("bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm", props.class)} data-slot="card" {...rest} />;
};

export type CardHeaderProps = ComponentProps<"div">;

export const CardHeader = (props: CardHeaderProps) => {
  const [, rest] = splitProps(props, ["class"]);

  return (
    <div
      class={cx(
        "@container/card-header has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6 grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6",
        props.class,
      )}
      data-slot="card-header"
      {...rest}
    />
  );
};

export type CardTitleProps = ComponentProps<"div">;

export const CardTitle = (props: CardTitleProps) => {
  const [, rest] = splitProps(props, ["class"]);

  return <div class={cx("font-semibold leading-none", props.class)} data-slot="card-title" {...rest} />;
};

export type CardDescriptionProps = ComponentProps<"div">;

export const CardDescription = (props: CardDescriptionProps) => {
  const [, rest] = splitProps(props, ["class"]);

  return <div class={cx("text-muted-foreground text-sm", props.class)} data-slot="card-description" {...rest} />;
};

export type CardActionProps = ComponentProps<"div">;

export const CardAction = (props: CardActionProps) => {
  const [, rest] = splitProps(props, ["class"]);

  return <div class={cx("col-start-2 row-span-2 row-start-1 self-start justify-self-end", props.class)} data-slot="card-action" {...rest} />;
};

export type CardContentProps = ComponentProps<"div">;

export const CardContent = (props: CardContentProps) => {
  const [, rest] = splitProps(props, ["class"]);

  return <div class={cx("px-6", props.class)} data-slot="card-content" {...rest} />;
};

export type CardFooterProps = ComponentProps<"div">;

export const CardFooter = (props: CardFooterProps) => {
  const [, rest] = splitProps(props, ["class"]);

  return <div class={cx("[.border-t]:pt-6 flex items-center px-6", props.class)} data-slot="card-footer" {...rest} />;
};
