import type {AuthMe} from "@/types/auth";
import {SettingType} from "@/types/setting";
import {RouteDirectionListType} from "@/types/routes-direction";
import {CongStatsResType} from "@/types/congestion-stats";

export type SearchType = "all" | "station" | "line";

export interface SearchTargetType {
    type: SearchType,
    //호선 번호
    lnNo: string;
    //호선명
    lnNm: string;
    //방면 번호
    rteDtlNo: string;
    // 방면 명
    rteDtlNm: string;
    // 역 번호
    stnCd: string;
    //역 이름
    stnNm: string;
    //광역 간선
    wideRailYn: "Y" | "N"
}

export const searchTargetInit: SearchTargetType = {
    type: "all",
    lnNo: "",
    lnNm: "",
    rteDtlNo: "",
    rteDtlNm: "",
    stnCd: "",
    stnNm: "",
    wideRailYn: "Y"
}

export interface DashBoardProps {
    initialData: {
        profileRes: AuthMe,
        settingRes: SettingType,
        routeDirectionRes: RouteDirectionListType,
        trainCongStatsRes: CongStatsResType,
        stationCongStatsRes: CongStatsResType
    }
}