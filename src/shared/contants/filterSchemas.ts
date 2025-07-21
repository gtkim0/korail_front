import {menuColumns} from "@/features/menu/columns/menuColumns";
import {isAccessorColumn} from "@/shared/utils/isAccessorColumn";
import {BannerColumns} from "@/features/banner/columns/BannerColumns";
import {routeMapColumns} from "@/features/routeMap/columns/routeMapColumns";
import {FilterType} from "@/shared/enum/FilterType";
import { PageType } from "@/shared/enum/PageType";

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

function buildColumnOptions(columns: any[], filterKeys?: string[]) {
  return columns
    .filter(isAccessorColumn)
    .filter(col => !filterKeys || filterKeys.includes(col.accessorKey))
    .map(col => ({
      key: col.accessorKey,
      label: col.header,
    }));
}

const onOffOptions = [
  { key: 'ON', label: 'ON' },
  { key: 'OFF', label: 'OFF' },
];

export const filterSchemas: Record<PageType, FilterSchema[]>= {
  [PageType.Menu]: [
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
      options: onOffOptions
    },
  ],
  [PageType.Banner]: [
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
  [PageType.CongestionStep]: [
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
      type: FilterType.Switch,
      key: 'alarm',
      label: '알람발생',
      options: onOffOptions
    },
    {
      type: FilterType.Switch,
      key: 'guide',
      label: '안내방송',
      options: onOffOptions
    },
    {
      type: FilterType.Switch,
      key: 'message',
      label: '문자전송',
      options: onOffOptions
    },
    {
      type: FilterType.DateRange,
      key: 'range',
      label: '기간',
    },
  ],
  [PageType.RouteMap]: [
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
  [PageType.OperationInfo]: [
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
  ],
  [PageType.BatchCycle]: [
    {
      type: FilterType.Checkbox,
      key: 'category',
      label: '검색어 필터',
      options: [
        {accessorKey: '1', header: '차량번호'},
        {accessorKey: '2', header: '승차인원'},
        {accessorKey: '3', header: '바닥면전'},
        {accessorKey: '4', header: 'CCTV1'},
      ].filter(isAccessorColumn)
        .map(col => ({
          key: col.accessorKey,
          label: col.header,
        }))
    },
    {
      type: FilterType.Radio,
      key: 'q',
      label: '방식',
      options: [
        {key: '1', label: '일정간격'},
        {key: '2', label: '특정시간'},
      ]
    },

    {
      type: FilterType.DateRange,
      key: 'range2',
      label: '데이터기준일자',
    },
  ],
  [PageType.ProgrammingInfo]: [
    {
      type: FilterType.Checkbox,
      key: 'category',
      label: '검색어 필터',
      options: [
        {accessorKey: '1', header: '노선번호'},
        {accessorKey: '2', header: '노선명'},
        {accessorKey: '3', header: '편성번호'},
        {accessorKey: '4', header: '차량번호'},
      ].filter(isAccessorColumn)
        .map(col => ({
          key: col.accessorKey,
          label: col.header,
        }))
    },
    {
      type: FilterType.Select,
      key: 'type',
      label: '구분',
      options: [
        {key: '1', label: '간선'},
        {key: '2', label: '고속'},
      ]
    },
    {
      type: FilterType.DateRange,
      key: 'range1',
      label: '개통일자',
    },
  ],
  [PageType.StationInfo] : [],
  [PageType.CarriageInfo] : [],
  [PageType.EvacuationInfo] : [
    {
      type: FilterType.Checkbox,
      key: 'category',
      label: '검색 기준',
      options: [
        {key: '1', label: '노선번호'},
        {key: '2', label: '노선명'},
        {key: '3', label: '역사번호'},
        {key: '4', label: '역사명'},
      ]
    },
    {
      type: FilterType.DateRange,
      key: 'range1',
      label: '개통일자',
    },
  ],
  [PageType.ZoneInfo]: [
    {
      type: FilterType.Checkbox,
      key: 'category',
      label: '검색 기준',
      options: [
        {key: '1', label: '노선명'},
        {key: '2', label: '역사명'},
        {key: '3', label: '구역종류'},
        {key: '4', label: '구역명'},
        {key: '5', label: 'CCTVID'},
      ]
    },
    {
      type: FilterType.Switch,
      key: 'enabled',
      label: '방송구역',
      options: onOffOptions
    },
    {
      type: FilterType.DateRange,
      key: 'range1',
      label: '개통일자',
    },
  ],
  [PageType.SpecialPeriod]: [
    {
      type: FilterType.Checkbox,
      key: 'category',
      label: '검색 기준',
      options: [
        {key: '1', label: '노선번호'},
        {key: '2', label: '노선명'},
        {key: '3', label: '역사번호'},
        {key: '4', label: '역사명'},
      ]
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
    {
      type: FilterType.DateRange,
      key: 'range1',
      label: '개통일자',
    },
  ],
  [PageType.Instrumentation]: [
    {
      type: FilterType.Checkbox,
      key: 'category',
      label: '검색 기준',
      options: [
        {key: '1', label: '관리번호'},
        {key: '2', label: 'IP'},
        {key: '3', label: '편성번호'},
        {key: '4', label: '차량번호'},
      ]
    },
    {
      type: FilterType.Select,
      key: 'operatingStatus',
      label: '운영상태',
      options: [
        {key: '1', label: '운영중'},
        {key: '2', label: '수리중'},
        {key: '3', label: '통신불가'},
      ]
    },
    {
      type: FilterType.DateRange,
      key: 'range1',
      label: '데이터 기준일자',
    },
  ]
}