import PermissionMenuView from "@/features/permission-menu/components/PermissionMenuView/PermissionMenuView";
import {serverGetAuth} from "@/shared/api/serverAuth";
import {PageProps, PaginationResponseType} from "@/types/common";

interface AuthGroupList {
  authrtExplnCn: string;
  authrtId: string;
  authrtId1: string;
  authrtNm: string;
}

interface PermissionMenuFilterProps {
  authGroup: string;
}

export default async function PermissionMenuServer() {

  /**
   * 모든 권한 그룹 리스트를 불러온후, 첫번째 그룹을 parameter 로 넘겨야함. ( 선택없음, 무조건 1개 선택 )
   */

  const authGroupList = await serverGetAuth<PaginationResponseType<AuthGroupList>>('/api/auths/groups/get-list');
  const initAuthGroup = authGroupList.result.list

  // const schemaOverride: FilterSchema[] = [
  //   // 대메뉴: 서버에서 만든 옵션
  //   {
  //     type: FilterType.Select,
  //     key: 'topMenu',
  //     label: '대메뉴',
  //     options: initAuthGroup,ㄴㄴㄴㄴ
  //     style: {width: '16rem'},
  //   },
  //   // 중메뉴: 대메뉴 선택 시 서버에서 가져오기
  //   {
  //     type: FilterType.Select,
  //     key: 'midMenu',
  //     label: '중메뉴',
  //     asyncOptions: {
  //       endpoint: '/api/menus/mid',
  //       method: 'GET',
  //       params: (v) => ({topId: v.topMenu}),
  //       dependsOn: ['topMenu'],                 // ← topMenu 바뀌면 재요청
  //       map: (raw) => (raw.list ?? raw).map((m: any) => ({key: String(m.id), label: m.name})),
  //       cacheKey: (v) => `mid:${v.topMenu ?? ''}`,
  //     },
  //     style: {width: '16rem'},
  //   },
  //   // 소메뉴: 중메뉴 선택 시 서버에서 가져오기 (혹은 derivedOptions로도 가능)
  //   {
  //     type: FilterType.Select,
  //     key: 'subMenu',
  //     label: '소메뉴',
  //     asyncOptions: {
  //       endpoint: '/api/menus/sub',
  //       params: (v) => ({midId: v.midMenu}),
  //       dependsOn: ['midMenu'],
  //       map: (raw) => (raw.list ?? raw).map((s: any) => ({key: String(s.id), label: s.name})),
  //       cacheKey: (v) => `sub:${v.midMenu ?? ''}`,
  //     },
  //     style: {width: '16rem'},
  //   },
  // ];

  const initialFilter: (PageProps & PermissionMenuFilterProps) = {
    page: 1,
    pagePerSize: 10,
    authGroup: initAuthGroup[0]?.authrtId ?? ''
  }

  return (
    <PermissionMenuView
      initialFilter={initialFilter}
      initialData={[]}
    />
  )
}