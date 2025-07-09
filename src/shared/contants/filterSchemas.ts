import {menuColumns} from "@/features/menu/columns/menuColumns";
import {isAccessorColumn} from "@/shared/utils/isAccessorColumn";

type FilterSchema = {
  type: string;
  key: string;
  label: string;
  options?: { key: string, label: string }[];
}

export const filterSchemas: Record<string, FilterSchema[]>= {
  menu: [
    {
      type: 'checkbox',
      key: 'category',
      label: '검색어 필터',
      options: menuColumns
        .filter(isAccessorColumn)
        .map(col => ({
          key: col.accessorKey,
          label: col.header,
        }))
    },
    {
      type: 'switch',
      key: 'enabled',
      label: '사용여부',
      options: [
        {key: 'ON', label: '사용함'},
        {key: 'OFF', label: '사용 안함'}
      ]
    },
    // {
    //   type: 'select',
    //   key: 'status',
    //   label: '상태',
    //   options: [
    //     {
    //       key: '',
    //       label: ''
    //     }
    //   ],
    // },
    // {
    //   type: 'dateRange',
    //   key: 'range',
    //   label: '기간',
    // },
  ],
  // banner: [],
  congestionStep: [
    {
      type: 'checkbox',
      key: 'category',
      label: '검색 기준',
      options: [
        {key: '1', label: '번호(코드)'},
        {key: '2', label: '임계치'},
      ]
    },
    {
      type: 'checkbox',
      key: 'step',
      label: '혼잡도 단계',
      options: [
        {key: '1', label: '보통'},
        {key: '2', label: '주의'},
        {key: '3', label: '혼잡'},
        {key: '4', label: '심각'}
      ]
    },
    {
      type: 'colorPicker',
      key: 'color',
      label: '색상',
    },
    {
      type: 'switch',
      key: 'alarm',
      label: '알람발생',
      options: [
        {key: 'ON', label: 'ON'},
        {key: 'OFF', label: 'OFF'}
      ]
    },
    {
      type: 'switch',
      key: 'guide',
      label: '안내방송',
      options: [
        {key: 'ON', label: 'ON'},
        {key: 'OFF', label: 'OFF'}
      ]
    },
    {
      type: 'switch',
      key: 'message',
      label: '문자전송',
      options: [
        {key: 'ON', label: 'ON'},
        {key: 'OFF', label: 'OFF'}
      ]
    },
    {
      type: 'dateRange',
      key: 'range',
      label: '기간',
    },
  ]
}