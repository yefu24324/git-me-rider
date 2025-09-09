import CalendarPrimitive from "@corvu/calendar";
import type { ComponentProps, ValidComponent } from "solid-js";
import { Match, Switch, splitProps } from "solid-js";

import { cx } from "@/components/utils/cva";
import { buttonVariants } from "./button";

export type CalendarProps = ComponentProps<typeof CalendarPrimitive>;

export const Calendar = (props: CalendarProps) => {
  return <CalendarPrimitive data-slot="calendar" {...props} />;
};

export type CalendarNavProps<T extends ValidComponent = "button"> = ComponentProps<typeof CalendarPrimitive.Nav<T>>;

export const CalendarNav = <T extends ValidComponent = "button">(props: CalendarNavProps<T>) => {
  const [, rest] = splitProps(props as CalendarNavProps, ["action", "class"]);

  return (
    <CalendarPrimitive.Nav
      action={props.action}
      class={buttonVariants({
        class: ["size-7 bg-transparent p-0 opacity-50 hover:opacity-100", props.class],
        variant: "outline",
      })}
      data-slot="calendar-nav"
      {...rest}
    >
      <Switch>
        <Match when={props.action === "prev-year" || props.action === "prev-month"}>
          <svg class="size-4" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="m15 18l-6-6l6-6" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
          </svg>
        </Match>
        <Match when={props.action === "next-year" || props.action === "next-month"}>
          <svg class="size-4" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="m9 18l6-6l-6-6" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
          </svg>
        </Match>
      </Switch>
    </CalendarPrimitive.Nav>
  );
};

export type CalendarLabelProps<T extends ValidComponent = "h2"> = ComponentProps<typeof CalendarPrimitive.Label<T>>;

export const CalendarLabel = <T extends ValidComponent = "h2">(props: CalendarLabelProps<T>) => {
  const [, rest] = splitProps(props as CalendarLabelProps, ["class"]);

  return <CalendarPrimitive.Label class={cx("text-sm font-medium", props.class)} data-slot="calendar-label" {...rest} />;
};

export type CalendarTableProps<T extends ValidComponent = "table"> = ComponentProps<typeof CalendarPrimitive.Table<T>>;

export const CalendarTable = <T extends ValidComponent = "table">(props: CalendarTableProps<T>) => {
  return <CalendarPrimitive.Table data-slot="calendar-table" {...props} />;
};

export type CalendarHeadCellProps<T extends ValidComponent = "th"> = ComponentProps<typeof CalendarPrimitive.HeadCell<T>>;

export const CalendarHeadCell = <T extends ValidComponent = "th">(props: CalendarHeadCellProps<T>) => {
  const [, rest] = splitProps(props as CalendarHeadCellProps, ["class"]);

  return (
    <CalendarPrimitive.HeadCell
      class={cx("text-muted-foreground w-8 rounded-md text-[0.8rem] font-normal", props.class)}
      data-slot="calendar-head-cell"
      {...rest}
    />
  );
};

export type CalendarCellProps<T extends ValidComponent = "td"> = ComponentProps<typeof CalendarPrimitive.Cell<T>>;

export const CalendarCell = <T extends ValidComponent = "td">(props: CalendarCellProps<T>) => {
  const [, rest] = splitProps(props as CalendarCellProps, ["class"]);

  return (
    <CalendarPrimitive.Cell
      class={cx(
        "has-[[data-in-range]]:bg-accent relative p-0 text-center text-sm focus-within:relative focus-within:z-20 has-[[data-range-end]]:rounded-r-md has-[[data-range-start]]:rounded-l-md has-[[data-disabled][data-selected]]:opacity-50 has-[[data-in-range]]:first:rounded-l-md has-[[data-in-range]]:last:rounded-r-md",
        props.class,
      )}
      data-slot="calendar-cell"
      {...rest}
    />
  );
};

export type CalendarCellTriggerProps<T extends ValidComponent = "button"> = ComponentProps<typeof CalendarPrimitive.CellTrigger<T>>;

export const CalendarCellTrigger = <T extends ValidComponent = "button">(props: CalendarCellTriggerProps<T>) => {
  const [, rest] = splitProps(props as CalendarCellTriggerProps, ["class"]);

  return (
    <CalendarPrimitive.CellTrigger
      class={buttonVariants({
        class: [
          "size-8 p-0 font-normal aria-selected:opacity-100",
          "data-[today]:bg-accent data-[today]:text-accent-foreground dark:data-[today]:focus-visible:ring-secondary",
          "aria-selected:not-[[data-in-range]]:bg-primary aria-selected:not-[[data-in-range]]:text-primary-foreground aria-selected:not-[[data-in-range]]:hover:bg-primary aria-selected:not-[[data-in-range]]:hover:text-primary-foreground",
          "data-[range-start]:aria-selected:bg-primary data-[range-start]:aria-selected:text-primary-foreground data-[range-start]:aria-selected:hover:bg-primary! data-[range-start]:aria-selected:hover:text-primary-foreground!",
          "data-[range-end]:aria-selected:bg-primary data-[range-end]:aria-selected:text-primary-foreground data-[range-end]:aria-selected:hover:bg-primary! data-[range-end]:aria-selected:hover:text-primary-foreground!",
          props.class,
        ],
        variant: "ghost",
      })}
      data-slot="calendar-cell-trigger"
      {...rest}
    />
  );
};
