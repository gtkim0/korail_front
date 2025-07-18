import {ColumnDef} from "@tanstack/react-table";

export type EvacuationInfoColumnsType = {
  id: string;
  title: string;
  content: string;
  userId: string;
  status: string;
  image_url: string;
}

export const evacuationInfoColumns: ColumnDef<EvacuationInfoColumnsType>[] = [
  {
    accessorKey: 'title',
    header: '제목'
  },
  {
    accessorKey: 'content',
    header: '본문'
  },
  {
    accessorKey: 'userId',
    header: '작성자'
  },
  {
    accessorKey: 'status',
    header: '상태'
  },
  {
    accessorKey: 'image_url',
    header: '이미지'
  },
]