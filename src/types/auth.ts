export type AuthMe = {
  profile: {
    acntLockYn: string;
    cpNo: string;
    emlAddr: string;
    joinDt: string;
    lastLgnTm: string | null;
    lgnPswdCn: string | null;
    tptlBannerHistories: string | null;
    tptlIntrHistories: string | null;
    tptlUserAuthrtrs: {
      authrtNo: string;
      tptlAuthrtm: string | null;
      tptlUserm: string | null;
      userId: string;
    }[]
    tptlVideoMngApproveHistories: string | null;
    tptlVideoMngHistories: string | null;
    tptlWrkHistories: string | null;
    userId: string;
    userNm: string;
    whdwlYn: string | null;
  }
}