import { ColumnDef } from '@tanstack/react-table';
import styles from './BaseTable/BaseTable.module.scss'; // checkbox 클래스도 여기에 포함된다고 가정

export function withRowSelection<T extends object>(
  columns: ColumnDef<T, any>[]
): ColumnDef<T, any>[] {
  return [
    {
      id: 'select',
      header: ({ table }) => (
        <input
          type="checkbox"
          className={styles.checkbox}
          checked={table.getIsAllPageRowsSelected()}
          onChange={table.getToggleAllPageRowsSelectedHandler()}
        />
      ),
      cell: ({ row }) => (
        <input
          type="checkbox"
          className={styles.checkbox}
          checked={row.getIsSelected()}
          disabled={!row.getCanSelect()}
          onChange={row.getToggleSelectedHandler()}
        />
      ),
      size: 40,
    },
    ...columns,
  ];
}