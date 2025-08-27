import {ColumnDef} from "@tanstack/react-table";
import {MyMenuAuthorityColumnType} from "@/types/mymenu-authority";
import styles from "@/shared/components/table/BaseTable/BaseTable.module.scss";

export const authorityColumns: ColumnDef<MyMenuAuthorityColumnType>[] = [
  {
    accessorKey: 'major',
    header: '대분류'
  },
  {
    accessorKey: 'middle',
    header: '중분류'
  },
  {
    accessorKey: 'sub',
    header: '소분류'
  },
  {
    accessorKey: 'description',
    header: '메뉴도움말'
  },
  {
    accessorKey: 'programId',
    header: '프로그램ID'
  },
  {
    accessorKey: 'showYn',
    header: '메뉴표출여부'
  },
  {
    accessorKey: 'c',
    header: 'C',
    cell: info => {
      return (
        <input
          type="checkbox"
          className={styles.checkbox}
          checked={info.getValue() as boolean}
          disabled
        />
      )
    },
  },
  {
    accessorKey: 'r',
    header: 'R'
  },
  {
    accessorKey: 'u',
    header: 'U'
  },
  {
    accessorKey: 'd',
    header: 'D'
  },
  {
    accessorKey: 'date',
    header: '데이터 기준일자'
  },
]