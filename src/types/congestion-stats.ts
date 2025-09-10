// 개별 단계 정보
export interface StageSummaryType {
    /** 혼잡도단계번호 */
    dgcnStgNo: number;
    /** 단계명 */
    stgNm: string;
    /** 갯수 */
    stageCnt: number;

}

// 노선별 단계 정보
export interface RouteCongestionType {
    /** 노선번호 */
    rteNo: string;
    /** 노선명 */
    rteNm: string;
    /** 혼잡도단계별목록 */
    stages: StageSummaryType[];

}

// 최상위 응답 타입
export interface CongStatsResType {
    total: StageSummaryType[];   // 전체 합산 단계 데이터
    list: RouteCongestionType[];    // 노선별 데이터
}