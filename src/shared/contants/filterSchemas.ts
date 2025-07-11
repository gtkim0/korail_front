import {menuColumns} from "@/features/menu/columns/menuColumns";
import {isAccessorColumn} from "@/shared/utils/isAccessorColumn";
import {BannerColumns} from "@/features/banner/columns/BannerColumns";
import {routeMapColumns} from "@/features/routeMap/columns/routeMapColumns";
import {FilterType} from "@/shared/enum/FilterType";

type FilterSchema = {
  type: string;
  key: string;
  label: string;
  options?: { key: string, label: string }[];
  endPoint?: string;
}

const categoryFilters = {
  routeMap: ['1','2','3','4']
}

export const filterSchemas: Record<string, FilterSchema[]>= {
  menu: [
    {
      type: FilterType.Checkbox,
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
      type: FilterType.Switch,
      key: 'enabled',
      label: '사용여부',
      options: [
        {key: 'ON', label: '사용함'},
        {key: 'OFF', label: '사용 안함'}
      ]
    },
  ],
  banner: [
    {
      type: FilterType.Checkbox,
      key: 'category',
      label: '검색어 필터',
      options: BannerColumns
        .filter(isAccessorColumn)
        .map(col => ({
          key: col.accessorKey,
          label: col.header,
        }))
    },
    {
      type: FilterType.DateRange,
      key: 'range',
      label: '기간',
    },
    {
      type: FilterType.Switch,
      key: 'useYn',
      label: '사용유무',
      options: [
        {key: 'ON', label: 'ON'},
        {key: 'OFF', label: 'OFF'}
      ]
    },
  ],
  congestionStep: [
    {
      type: FilterType.Checkbox,
      key: 'category',
      label: '검색 기준',
      options: [
        {key: '1', label: '번호(코드)'},
        {key: '2', label: '임계치'},
      ]
    },
    {
      type: FilterType.Checkbox,
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
      type: FilterType.ColorPicker,
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
      type: FilterType.Switch,
      key: 'guide',
      label: '안내방송',
      options: [
        {key: 'ON', label: 'ON'},
        {key: 'OFF', label: 'OFF'}
      ]
    },
    {
      type: FilterType.Switch,
      key: 'message',
      label: '문자전송',
      options: [
        {key: 'ON', label: 'ON'},
        {key: 'OFF', label: 'OFF'}
      ]
    },
    {
      type: FilterType.DateRange,
      key: 'range',
      label: '기간',
    },
  ],
  routeMap: [
    {
      type: FilterType.Checkbox,
      key: 'category',
      label: '검색어 필터',
      options: routeMapColumns
        .filter(isAccessorColumn)
        .filter(i=> categoryFilters.routeMap.includes(i.accessorKey))
        .map(col => ({
          key: col.accessorKey,
          label: col.header,
        }))
    },
    {
      type: FilterType.ColorPicker,
      key: 'color',
      label: '색상',
    },
    {
      type: FilterType.DateRange,
      key: 'range1',
      label: '개통일자',
    },
    {
      type: FilterType.DateRange,
      key: 'range2',
      label: '데이터기준일자',
    },
    // {
    //   type: FilterType.SearchModal,
    //   key: 'searchModal',
    //   label: '기간',
    // },
  ],
  operationInfo: [
    {
      type: FilterType.Checkbox,
      key: 'category',
      label: '검색어 필터',
      options: [
        {key: '1', label: '열차번호'},
        {key: '2', label: '노선명'},
        {key: '3', label: '노선번호'},
        {key: '4', label: '기점'},
        {key: '5', label: '종점'},
        {key: '6', label: '운행구간정거장'},
      ]
    },
    {
      type: FilterType.Select,
      key: '구분',
      label: '구분',
      options: [
        {key: '1', label: '구분A'},
        {key: '2', label: '구분B'},
        {key: '3', label: '구분C'},
      ]
    },
    {
      type: FilterType.Select,
      key: '운행유형',
      label: '운행유형',
      options: [
        {key: '1', label: '운행유형A'},
        {key: '2', label: '운행유형B'},
        {key: '3', label: '운행유형C'},
      ]
    },
    {
      type: FilterType.Select,
      key: '요일구분',
      label: '요일구분',
      options: [
        {key: '1', label: '요일구분A'},
        {key: '2', label: '요일구분B'},
        {key: '3', label: '요일구분C'},
      ]
    },
    {
      type: FilterType.DateRange,
      key: 'range2',
      label: '데이터기준일자',
    },
  ]
}