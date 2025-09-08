export type TRifLnmsType = {
    "lnNo": string,
    "lnNm":string,
    "lnClorNo":string,
    "imgPathUrlCn": string
}
export type TPtlDgcnCrtrmsType ={
    "dgcnStgNo": number,
    "stgNm": string,
    "crtcVl": number,
    "indctClorNo": string,
    "alrmOcrnEstnc": string,
    "leadBrdEstnc": string,
    "charTrsmEstnc": string
}
export type SettingType ={
    tRifLnms:TRifLnmsType[]
    tPtlDgcnCrtrms:TPtlDgcnCrtrmsType[]
}