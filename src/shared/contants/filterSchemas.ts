import {menuColumns} from "@/features/menu/columns/menuColumns";
import {isAccessorColumn} from "@/shared/utils/isAccessorColumn";
import {BannerColumns} from "@/features/banner/columns/BannerColumns";
import {routeMapColumns} from "@/features/routeMap/columns/routeMapColumns";
import {FilterType} from "@/shared/enum/FilterType";
import {PageType} from "@/shared/enum/PageType";
import {OPERATING_STATUS_OPTIONS} from "@/shared/contants/selectOptions/operatingStatusOptions";
import {SELECT_OPTIONS} from "@/shared/contants/selectOptions";
import {FilterSchema} from "@/shared/components/searchFilter/DynamicFilterRenderer/DynamicFilterRenderer";

const categoryFilters = {
  routeMap: ['1', '2', '3', '4']
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
  {key: 'ON', label: 'ON'},
  {key: 'OFF', label: 'OFF'},
];

export const filterSchemas: Record<PageType, FilterSchema[]> = {
  [PageType.MyProfile]: [],
  [PageType.MyMenuAuthorityView]: [
    {
      type: FilterType.Select,
      key: '구분',
      label: '구분',
      options: [],
    },
  ],
  [PageType.PermissionRequest]: [],
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
      label: '데이터기준일자',
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
      label: '검색어 필터',
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
      label: '데이터기준일자',
    },
  ],
  [PageType.RouteMap]: [
    {
      type: FilterType.Checkbox,
      key: 'category',
      label: '검색어 필터',
      options: routeMapColumns
        .filter(isAccessorColumn)
        .filter(i => categoryFilters.routeMap.includes(i.accessorKey))
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
    //   label: '데이터기준일자',
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
  [PageType.StationInfo]: [],
  [PageType.CarriageInfo]: [],
  [PageType.EvacuationInfo]: [
    {
      type: FilterType.Checkbox,
      key: 'category',
      label: '검색어 필터',
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
      label: '검색어 필터',
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
      label: '검색어 필터',
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
      label: '검색어 필터',
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
      options: OPERATING_STATUS_OPTIONS
    },
    {
      type: FilterType.DateRange,
      key: 'range1',
      label: '데이터 기준일자',
    },
  ],
  [PageType.EmergencyManual]: [
    {
      type: FilterType.Checkbox,
      key: 'category',
      label: '검색어 필터',
      options: [
        {key: '1', label: '메뉴얼ID'},
        {key: '2', label: '상황구분'},
        {key: '3', label: '메뉴얼제목'},
        {key: '4', label: '작성자'},
      ]
    },
    {
      type: FilterType.Switch,
      key: 'useYn',
      label: '사용여부',
      options: [
        {key: 'ON', label: 'ON'},
        {key: 'OFF', label: 'OFF'}
      ]
    },
    {
      type: FilterType.DateRange,
      key: 'range1',
      label: '데이터 기준일자',
    },
  ],
  [PageType.EmergencyActionManual]: [
    {
      type: FilterType.Checkbox,
      key: 'category',
      label: '검색어 필터',
      options: [
        {key: '1', label: '메뉴얼ID'},
        {key: '2', label: '상황구분'},
        {key: '3', label: '메뉴얼제목'},
        {key: '4', label: '조치부서'},
      ]
    },
    {
      type: FilterType.Switch,
      key: 'useYn',
      label: '사용여부',
      options: [
        {key: 'ON', label: 'ON'},
        {key: 'OFF', label: 'OFF'}
      ]
    },
    {
      type: FilterType.DateRange,
      key: 'range1',
      label: '데이터 기준일자',
    },
  ],
  [PageType.EmergencyFieldPersonnel]: [
    {
      type: FilterType.Checkbox,
      key: 'category',
      label: '검색어 필터',
      options: [
        {key: '1', label: '노선명'},
        {key: '2', label: '역사명'},
        {key: '3', label: '근무자'},
      ]
    },
    {
      type: FilterType.Select,
      key: 'position',
      label: '직책',
      options: SELECT_OPTIONS.POSITION_OPTIONS
    },
    {
      type: FilterType.DateRange,
      key: 'range1',
      label: '데이터 기준일자',
    },
  ],
  [PageType.EmergencyBroadcastControl]: [
    {
      type: FilterType.Checkbox,
      key: 'category',
      label: '검색어 필터',
      options: [
        {key: '1', label: '방송규칙명'},
        {key: '2', label: '혼잡도'},
        {key: '3', label: '대상노선'},
      ]
    },
  ],
  [PageType.SaveConditionImage]: [],
  [PageType.EmergencyGuideInfo]: [],
  [PageType.NotificationPush]: [],
  [PageType.NotificationRecipient]: [],
  [PageType.NotificationText]: [],
  [PageType.NotificationLog]: [],
  [PageType.NotificationRule]: [],
  [PageType.CongestionVerificationTarget]: [],
  [PageType.CongestionVerificationComplete]: [],
  [PageType.PermissionUser]: [
    {
      type: FilterType.Select,
      key: 'authGroup',
      label: '권한그룹',
      enabledAll: false,
      asyncOptions: {
        endpoint: '/api/auths/groups/get-list',
        method: 'GET',
        // params: () => ({page: 1, size: 9999}),
        map: (raw) => (raw?.list ?? raw ?? []).map((g: any) => {
          return {
            key: g.authrtId,
            label: g.authrtNm
          }
        })
      },
    },
  ],
  [PageType.PermissionMenu]: [
    {
      type: FilterType.Select,
      key: 'authGroup',
      label: '권한그룹',
      enabledAll: false,
      asyncOptions: {
        endpoint: '/api/auths/groups/get-list',
        method: 'GET',
        // params: () => ({page: 1, size: 9999}),
        map: (raw) => (raw?.list ?? raw ?? []).map((g: any) => {
          return {
            key: g.authrtId,
            label: g.authrtNm
          }
        })
      },
    },
    {
      type: FilterType.Select,
      key: 'topMenu',
      label: '대메뉴',
      preload: {
        endpoint: '/api/menus/get-list',
        method: 'GET',
        datasetKey: 'top',
      },
      derivedOptions: {
        fromDataset: 'top',
        dependsOn: [],
        derive: (ds) => {
          return ds.filter((i: any) => i.depth === 1).map((m: any) => ({key: m.menuId, label: m.menuNm}))
        }
      },
      style: {width: '16rem'},
    },
    {
      type: FilterType.Select,
      key: 'midMenu',
      label: '중메뉴',
      derivedOptions: {
        fromDataset: 'top',
        dependsOn: ['topMenu'],
        derive: (ds, v) => {
          const top = (ds ?? []).filter((m: any) => m.upMenuId === v.topMenu);
          return (top ?? []).map((c: any) => ({key: c.menuId, label: c.menuNm}));
        },
      },
      style: {width: '16rem'},
    },
    {
      type: FilterType.Select,
      key: 'subMenu',
      label: '소메뉴',
      derivedOptions: {
        fromDataset: 'top',
        dependsOn: ['topMenu', 'midMenu'],
        derive: (ds, v) => {
          const mid = (ds ?? []).filter((m: any) => m.upMenuId === v.midMenu);
          return (mid ?? []).map((c: any) => ({key: c.menuId, label: c.menuNm}))
        },
      },
      style: {width: '16rem'},
    },
  ],
  [PageType.PermissionGroup]: [
    {
      type: FilterType.Checkbox,
      key: 'category',
      label: '검색어 필터',
      options: [
        {key: '1', label: '그룹ID'},
        {key: '2', label: '그룹명'},
      ]
    },
    {
      type: FilterType.Switch,
      key: 'useYn',
      label: '사용여부',
      options: [
        {key: 'ON', label: 'ON'},
        {key: 'OFF', label: 'OFF'}
      ]
    },
    {
      type: FilterType.DateRange,
      key: 'range1',
      label: '데이터기준 일자',
    },
  ],
  [PageType.TrainStatistics]: [
    {
      type: FilterType.Select,
      key: 'areaOrTrunk',
      label: '광역/간선',
      options: SELECT_OPTIONS.POSITION_OPTIONS,
      style: {
        width: '16rem'
      }
    },
    {
      type: FilterType.Select,
      key: 'route',
      label: '노선선택',
      options: [],
      style: {
        width: '16rem'
      }
    },
    {
      type: FilterType.Select,
      key: 'dayMonthYear',
      label: '열차/역사',
      options: SELECT_OPTIONS.POSITION_OPTIONS,
      style: {
        width: '16rem'
      }
    },
  ],
  [PageType.CongestionEquipStatus]: [
    {
      type: FilterType.Select,
      key: 'areaOrTrunk',
      label: '광역/간선',
      options: SELECT_OPTIONS.POSITION_OPTIONS,
      style: {
        width: '16rem'
      }
    },
    {
      type: FilterType.Select,
      key: 'route',
      label: '노선선택',
      options: SELECT_OPTIONS.POSITION_OPTIONS,
      style: {
        width: '16rem'
      },
    },
    {
      type: FilterType.Select,
      key: 'dayMonthYear',
      label: '열차/역사',
      options: SELECT_OPTIONS.POSITION_OPTIONS,
      style: {
        width: '16rem'
      }
    },
  ],
  [PageType.CongestionAmountUse]: [
    {
      type: FilterType.Select,
      key: 'areaOrTrunk',
      label: '광역/간선',
      options: SELECT_OPTIONS.POSITION_OPTIONS,
      style: {
        width: '16rem'
      }
    },
    {
      type: FilterType.Select,
      key: 'route',
      label: '노선선택',
      options: SELECT_OPTIONS.POSITION_OPTIONS,
      style: {
        width: '16rem'
      }
    },
    {
      type: FilterType.Select,
      key: 'dayMonthYear',
      label: '열차/역사',
      options: SELECT_OPTIONS.POSITION_OPTIONS,
      style: {
        width: '16rem'
      }
    },
  ],
  [PageType.CongestionStation]: [
    {
      type: FilterType.Select,
      key: 'areaOrTrunk',
      label: '광역/간선',
      options: SELECT_OPTIONS.POSITION_OPTIONS,
      style: {
        width: '16rem'
      }
    },
  ],
  [PageType.CongestionArea]: [
    {
      type: FilterType.Select,
      key: 'areaOrTrunk',
      label: '광역/간선',
      options: SELECT_OPTIONS.POSITION_OPTIONS,
      style: {
        width: '16rem'
      }
    },
  ],
  [PageType.MemberManagement]: [],
}