import {useQuery} from "@tanstack/react-query";
import {useDashboardSelectStore} from "@/shared/store/slice/dashboardSelectSlice";
import {useClientApi} from "@/shared/hooks/useClientApi";
import {RouteDirectionListType} from "@/types/routes-direction";

//노선 드롭다운과 컴포넌트가 api 호출 시점이 다를 예정
export const useGetRoutesList = (initialData?: RouteDirectionListType, queryKey?: string) => {
    const api = useClientApi();
    const {searchTarget} = useDashboardSelectStore();
    return useQuery({
        queryKey: ["dropDown", searchTarget.wideRailYn], queryFn: async () => {
            const res = await api.get("/api/dashboards/routes/directions/get-list", {wideRailYn: searchTarget.wideRailYn})
            return res.result
        },
        initialData
    });
}

export const useGetCongStats = (isTrain: boolean, initialData?: RouteDirectionListType) => {
    const api = useClientApi();
    const {searchTarget} = useDashboardSelectStore();
    return useQuery({
        queryKey: ["CongestionStats", searchTarget, isTrain], queryFn: async () => {
            const res = await api.get(`/api/dashboards/${isTrain ? "trains" : "stations"}/congestion/statistics`, {wideRailYn: searchTarget.wideRailYn})
            return res.result
        },
        initialData
    });
}

