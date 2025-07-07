import {ColumnDef} from "@tanstack/react-table";

export type Menu = {
  major: string;
  middle: string;
  sub: string;
  path: string;
  componentName: string;
  date: string; // ISO date string
};

export const menuColumns: ColumnDef<Menu>[] = [
  {
    accessorKey: 'major',
    header: '대분류',
  },
  {
    accessorKey: 'middle',
    header: '중분류',
  },
  {
    accessorKey: 'sub',
    header: '소분류',
  },
  {
    accessorKey: 'path',
    header: '경로',
  },
  {
    accessorKey: 'componentName',
    header: '매칭컴포넌트',
  },
  {
    accessorKey: 'date',
    header: '데이터기준일자',
  },
];

export const dummyMenuData: Menu[] = [
  {
    major: '관리자',
    middle: '사용자 관리',
    sub: '권한 관리',
    path: '/admin/users/roles',
    componentName: 'UserRoleManager',
    date: '2024-07-01',
  },
  {
    major: '관리자',
    middle: '사용자 관리',
    sub: '계정 생성',
    path: '/admin/users/create',
    componentName: 'UserCreator',
    date: '2024-07-01',
  },
  {
    major: '콘텐츠',
    middle: '게시판',
    sub: '공지사항',
    path: '/content/notice',
    componentName: 'NoticeBoard',
    date: '2024-07-02',
  },
  {
    major: '콘텐츠',
    middle: '게시판',
    sub: 'FAQ',
    path: '/content/faq',
    componentName: 'FaqBoard',
    date: '2024-07-02',
  },
  {
    major: '통계',
    middle: '사용 로그',
    sub: '페이지 방문',
    path: '/stats/logs/page',
    componentName: 'PageVisitLog',
    date: '2024-07-03',
  },
  {
    major: '통계',
    middle: '사용 로그',
    sub: '페이지 방문',
    path: '/stats/logs/page',
    componentName: 'PageVisitLog',
    date: '2024-07-03',
  },
  {
    major: '통계',
    middle: '사용 로그',
    sub: '페이지 방문',
    path: '/stats/logs/page',
    componentName: 'PageVisitLog',
    date: '2024-07-03',
  },
  {
    major: '통계',
    middle: '사용 로그',
    sub: '페이지 방문',
    path: '/stats/logs/page',
    componentName: 'PageVisitLog',
    date: '2024-07-03',
  },
  {
    major: '통계',
    middle: '사용 로그',
    sub: '페이지 방문',
    path: '/stats/logs/page',
    componentName: 'PageVisitLog',
    date: '2024-07-03',
  }, {
    major: '통계',
    middle: '사용 로그',
    sub: '페이지 방문',
    path: '/stats/logs/page',
    componentName: 'PageVisitLog',
    date: '2024-07-03',
  },
  {
    major: '통계',
    middle: '사용 로그',
    sub: '페이지 방문',
    path: '/stats/logs/page',
    componentName: 'PageVisitLog',
    date: '2024-07-03',
  },
  {
    major: '통계',
    middle: '사용 로그',
    sub: '페이지 방문',
    path: '/stats/logs/page',
    componentName: 'PageVisitLog',
    date: '2024-07-03',
  },
  {
    major: '통계',
    middle: '사용 로그',
    sub: '페이지 방문',
    path: '/stats/logs/page',
    componentName: 'PageVisitLog',
    date: '2024-07-03',
  }, {
    major: '통계',
    middle: '사용 로그',
    sub: '페이지 방문',
    path: '/stats/logs/page',
    componentName: 'PageVisitLog',
    date: '2024-07-03',
  },
  {
    major: '통계',
    middle: '사용 로그',
    sub: '페이지 방문',
    path: '/stats/logs/page',
    componentName: 'PageVisitLog',
    date: '2024-07-03',
  },
  {
    major: '통계',
    middle: '사용 로그',
    sub: '페이지 방문',
    path: '/stats/logs/page',
    componentName: 'PageVisitLog',
    date: '2024-07-03',
  },

];