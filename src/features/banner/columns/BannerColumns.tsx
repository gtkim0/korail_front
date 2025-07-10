import {ColumnDef} from "@tanstack/react-table";
import {Menu} from "@/features/menu/columns/menuColumns";

export type BannerColumnsType = {
  name: string;
  imageName: string;
  imageUrl: string;
  startDate: string;
  endDate: string;
  useYn: string;
  date: string;
}

export const dummyBannerData = [
  {
    name: '대시보드',
    imageName : 'banner1.png',
    imageUrl: 'https://test.com/banner1',
    startDate: '2025-06-12',
    endDate: '2015-06-25',
    useYn: '유',
    date: '2025-06-25',
  },
]

export const BannerColumns: ColumnDef<BannerColumnsType>[] = [
  {
    accessorKey: 'name',
    header: '배너이름',
  },
  {
    accessorKey: 'imageName',
    header: '이미지명',
  },
  {
    accessorKey: 'imageUrl',
    header: 'URL',
  },
  {
    accessorKey: 'startDate',
    header: '시작일',
  },
  {
    accessorKey: 'endDate',
    header: '종료일',
  },
  {
    accessorKey: 'useYn',
    header: '사용유무',
  },
  {
    accessorKey: 'date',
    header: '데이터기준일자',
  },
];