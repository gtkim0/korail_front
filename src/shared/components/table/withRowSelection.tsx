import {ColumnDef} from '@tanstack/react-table';
import styles from './BaseTable/BaseTable.module.scss';

export function withRowSelection<T extends object>(
  columns: ColumnDef<T, any>[]
): ColumnDef<T, any>[] {
  return [
    {
      id: 'select',
      header: ({table}) => (
        <input
          onClick={(e) => e.stopPropagation()}
          type="checkbox"
          className={styles.checkbox}
          checked={table.getIsAllPageRowsSelected()}
          onChange={table.getToggleAllPageRowsSelectedHandler()}
        />
      ),
      cell: ({row}) => (
        <input
          type="checkbox"
          onClick={(e) => e.stopPropagation()}
          className={styles.checkbox}
          checked={row.getIsSelected()}
          disabled={!row.getCanSelect()}
          onChange={(e) => {
            e.stopPropagation();
            row.getToggleSelectedHandler()(e);
          }}
        />
      ),
      size: 40,
      minSize: 40,
      maxSize: 40
    },
    ...columns,
  ];
}