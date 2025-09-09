import type { ComponentProps } from "solid-js";
import { splitProps } from "solid-js";

import { cx } from "@/components/utils/cva";

export type TableProps = ComponentProps<"table">;

export const Table = (props: TableProps) => {
  const [, rest] = splitProps(props, ["class"]);

  return (
    <div class="relative w-full overflow-x-auto" data-slot="table-container">
      <table class={cx("w-full caption-bottom text-sm", props.class)} data-slot="table" {...rest} />
    </div>
  );
};

export type TableHeaderProps = ComponentProps<"thead">;

export const TableHeader = (props: TableHeaderProps) => {
  const [, rest] = splitProps(props, ["class"]);

  return <thead class={cx("[&_tr]:border-b", props.class)} data-slot="table-header" {...rest} />;
};

export type TableBodyProps = ComponentProps<"tbody">;

export const TableBody = (props: TableBodyProps) => {
  const [, rest] = splitProps(props, ["class"]);

  return <tbody class={cx("[&_tr:last-child]:border-0", props.class)} data-slot="table-body" {...rest} />;
};

export type TableFooterProps = ComponentProps<"tfoot">;

export const TableFooter = (props: TableFooterProps) => {
  const [, rest] = splitProps(props, ["class"]);

  return <tfoot class={cx("bg-muted/50 border-t font-medium [&>tr]:last:border-b-0", props.class)} data-slot="table-footer" {...rest} />;
};

export type TableRowProps = ComponentProps<"tr">;

export const TableRow = (props: TableRowProps) => {
  const [, rest] = splitProps(props, ["class"]);

  return <tr class={cx("hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors", props.class)} data-slot="table-row" {...rest} />;
};

export type TableHeadProps = ComponentProps<"th">;

export const TableHead = (props: TableHeadProps) => {
  const [, rest] = splitProps(props, ["class"]);

  return (
    <th
      class={cx(
        "text-foreground h-10 whitespace-nowrap px-2 text-left align-middle font-medium [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        props.class,
      )}
      data-slot="table-head"
      {...rest}
    />
  );
};

export type TableCellProps = ComponentProps<"td">;

export const TableCell = (props: TableCellProps) => {
  const [, rest] = splitProps(props, ["class"]);

  return (
    <td
      class={cx("whitespace-nowrap p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]", props.class)}
      data-slot="table-cell"
      {...rest}
    />
  );
};

export type TableCaptionProps = ComponentProps<"caption">;

export const TableCaption = (props: TableCaptionProps) => {
  const [, rest] = splitProps(props, ["class"]);

  return <caption class={cx("text-muted-foreground mt-4 text-sm", props.class)} data-slot="table-caption" {...rest} />;
};
