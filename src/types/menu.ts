export type BaseMenu = {
  depth: number;  // depth
  lnkgUrlAddrCn?: string; // url
  menuExplnCn?: string;
  menuId: string;
  menuNm: string;
  menuSortSn: number;
  insdPrgrmIdntfNm?: string;
  tptlMenuAuthrtrs: string | null;
  upMenuId: string;
}

export interface SettingMenu extends Omit<BaseMenu, 'tptlMenuAuthrtrs'> {
  cid?: string;
  upCid?: string;
}
