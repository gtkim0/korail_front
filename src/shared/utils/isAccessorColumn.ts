import {ColumnDef} from "@tanstack/react-table";

export function isAccessorColumn<T>(col: ColumnDef<T>): col is { accessorKey: string; header: string } {
  return typeof (col as any).accessorKey === 'string' && typeof col.header === 'string';
}