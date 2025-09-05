export interface AuthUser {
  authrtId: string;
  userId: string;
  authrtNm: string;
  userNm: string;
  jbgdCd: string;
  deptCd: string;
  cpNo: string;
  acntLockYn: 'Y' | 'N';
  joinDt: string;
}