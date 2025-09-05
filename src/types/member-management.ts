export type AuthorityGroup = {
  authrtId: string;
  authrtNm: string;
}

export type MemberManagementColumnType = {
  userId: string;  // 회원아이디
  userNm: string;   // 회원이름
  tptlUserAuthrtrs: AuthorityGroup[]; // 소속권한그룹
  wideRailYn: 'Y' | 'N', // 구분 ( 광역 OR 간선 / 광역: Y, 간선: N)
  interestDirection: string; // 관심방면
  interestStation: string; // 관심역사
  acntLockYn: 'Y' | 'N'; // Y: 사용불가, N: 사용가능
  joinDt: string;
}

export interface MemberManagementAddFormType {
  /** 회원 아이디 */
  userId: string;

  /** 비밀번호 */
  lgnPswdCn: string;

  /** 이름 */
  userNm: string;

  /** 소속 권한 그룹 */
  authority: string[];

  /** 소속 */
  deptCd: string;

  /** 직급 */
  jbgdCd: string;

  /** 이메일 */
  emlAddr: string;

  /** 연락처 */
  cpNo: string;

  /** 계정 사용 여부 */
  acntLockYn: 'Y' | 'N';

  /** 광역/간선 여부 (Y: 광역, N: 간선) */
  wideRailYn: 'Y' | 'N';
}