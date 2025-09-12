/** 운행정보_선기본목록 */
export interface LineType {
    /** 선번호 */
    lnNo: string;
    /** 선명 */
    lnNm: string;
    /** 선색상번호 */
    lnClorNo: string;
    /** 이미지경로URL내용 */
    imgPathUrlCn: string;
    /** 운행정보_역기본목록 */
    trifStnms: StationType[];
    /** 운행정보_노선상세기본목록 */
    trifRteDtlms: RouteDirectionType[];
}
/** 운행정보_역기본목록 */
export interface StationType {
    /** 역코드 */
    stnCd: string;
    /** 역명 */
    stnNm: string;
    /** 역한문명 */
    stnCinaNm: string;
    /** 역영문명 */
    stnEngNm: string;
    /** 환승역여부 */
    trfstnYn: "Y" | "N";
    /** 혼잡도목측여부 */
    dgcnEmsmYn: "Y" | "N";
    /** 역위치X좌표 */
    stnPstnXcod: number;
    /** 역위치Y좌표 */
    stnPstnYcod: number;
    /** 역사안내도파일명 */
    stbLeadDgrFileNm: string;
    /** 역사안내도경로내용 */
    stbLeadDgrPathCn: string;
    /** 비상대응매뉴얼파일명 */
    emrcMeulFileNm: string;
    /** 비상대응매뉴얼경로내용 */
    emrcMeulPathCn: string;
    /** 운영기관명 */
    operInstNm: string;
    /** 운행정보_환승역기본목록 */
    trifTrfstnms: TransferRouteType[];
}
/** 운행정보_환승역기본목록 */
export interface TransferRouteType {
    /** 환승노선번호 */
    trfstnCd: string;
    /** 환승노선명 */
    trfstnNm: string;
}
/** 운행정보_노선상세기본목록 */
export interface RouteDirectionType {
    /** 노선상세번호 */
    rteDtlNo: number;
    /** 노선상세명 */
    rteDtlNm: string;
    /** 츌발역코드 */
    dptreStnCd: string;
    /** 출발역명 */
    dptreStnNm: string;
    /** 도착역코드 */
    arvlStnCd: string;
    /** 도착역명 */
    arvlStnNm: string;
    /** 운행정보_역기본목록 */
    trifStnms: StationType[];
}

export type RouteDirectionListType ={
        /** 운행정보_선기본목록 */
        list: LineType[];
        /** 운행정보_선기본갯수 */
        totalCount: number;
}




