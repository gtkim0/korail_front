import {searchTargetInit, SearchTargetType} from "@/types/dashboard";
import {create} from "zustand";

interface DashboardSelectSlice {
    searchTarget: SearchTargetType;
    //사용자가 설정한 광역/간선 설정값
    initWideRailYn: "Y" | "N";
    setInitWideRailYn: (value: "Y" | "N") => void;
    setTarget: (
        type: SearchTargetType["type"],
        lnNo: string,
        lnNm: string,
        rteDtlNo: string,
        rteDtlNm: string,
        stnCd?: string,
        stnNm?: string
    ) => void;
    setWideRailYn: (value: "Y" | "N") => void;
    reset: () => void;
}

export const useDashboardSelectStore = create<DashboardSelectSlice>((set, get) => ({
    searchTarget: searchTargetInit,
    initWideRailYn: "Y",

    setInitWideRailYn: (value) => {
        set({
            initWideRailYn: value,
            searchTarget: {...searchTargetInit, wideRailYn: value},
        });
    },

    //노선 선택 드롭다운에서 선택
    setTarget: (type, lnNo, lnNm, rteDtlNo, rteDtlNm, stnCd = "", stnNm = "") => {
        set((state) => ({
            searchTarget: {...state.searchTarget, type, lnNo, lnNm, rteDtlNo, rteDtlNm, stnCd, stnNm},
        }));
    },

    // 광역 간선 토글
    setWideRailYn: (value) => {
        set((state) => ({
            searchTarget: {...searchTargetInit, wideRailYn: value},
        }));
    },

    // reset 시 사용자 설정 초기값 기준으로 리셋
    reset: () => {
        const initYn = get().initWideRailYn;
        set({
            searchTarget: {...searchTargetInit, wideRailYn: initYn},
        });
    },
}));