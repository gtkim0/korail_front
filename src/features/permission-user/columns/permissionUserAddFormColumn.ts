export const permissionUserAddFormColumn = {
  left: [
    {key: 'userId', header: '회원 아이디'},
    {key: 'userNm', header: '이름'},
    {key: 'jbgdCd', header: '소속'},
    {key: 'deptCd', header: '직급'},
    {key: 'cpNo', header: '연락처'},
  ] as const,
  right: [
    {key: 'userId', header: '회원 아이디'},
    {key: 'userNm', header: '이름'},
  ] as const
}