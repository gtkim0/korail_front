export type PermissionMenuColumnType = {
  depth1MenuNm: string;
  depth2MenuNm: string;
  depth3MenuNm: string;
  depth3MenuExplnCn: string;
  depth3PrgrmId: string;
  inptAuthrtYn: 'Y' | 'N';  // create
  inqAuthrtYn: 'Y' | 'N';   // read
  mdfcnAuthrtYn: 'Y' | 'N'; // update
  delAuthrtYn: 'Y' | 'N';   // delete
  date: string;
}


export type PermissionMenuResponseType = {
  delAuthrtYn: 'Y' | 'N';
  depth1MenuExplnCn: string;
  depth1MenuId: string;
  depth1MenuNm: string;
  depth1PrgrmId: string;
  depth2MenuExplnCn: string;
  depth2MenuId: string;
  depth2MenuNm: string;
  depth2PrgrmId: string;
  depth3MenuExplnCn: string;
  depth3MenuId: string;
  depth3MenuNm: string;
  depth3PrgrmId: string;
  dwnldAuthrtYn: 'Y' | 'N';
  inptAuthrtYn: 'Y' | 'N';
  inqAuthrtYn: 'Y' | 'N';
  mdfcnAuthrtYn: 'Y' | 'N';
}