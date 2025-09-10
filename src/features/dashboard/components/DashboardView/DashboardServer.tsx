import {serverGetAuth} from "@/shared/api/serverAuth";
import type {AuthMe} from "@/types/auth";
import DashboardView from "@/features/dashboard/components/DashboardView/DashboardView";
import {SettingType} from "@/types/setting";
import {RouteDirectionListType} from "@/types/routes-direction";
import Loading from "@/app/(auth)/auth/login/loading";
import {CongStatsResType} from "@/types/congestion-stats";

export default async function DashboardServer() {

    // 설정 및 정보 불러오는 API
    const profileRes = await serverGetAuth<AuthMe>(`/api/auths/me`)
    const settingRes = await serverGetAuth<SettingType>(`/api/settings`)
    // 광역이면 Y 간선이면 N
    const wideRailYn = profileRes.result.profile.wideRailYn

    // 초기 데이터 불러오는 API
    const routeDirectionRes = await serverGetAuth<RouteDirectionListType>(`/api/dashboards/routes/directions/get-list`, {wideRailYn: wideRailYn})
    const trainCongStatsRes = await serverGetAuth<CongStatsResType>(`/api/dashboards/trains/congestion/statistics`, {wideRailYn: wideRailYn})
    const stationCongStatsRes = await serverGetAuth<CongStatsResType>(`/api/dashboards/stations/congestion/statistics`, {wideRailYn: wideRailYn})
    const trainCongStatusRes = ""
    const stationCongStatusRes = ""

    if (profileRes.result && settingRes.result && routeDirectionRes.result && trainCongStatsRes.result && stationCongStatsRes.result) {
        return <DashboardView
            initialData={{
                profileRes: profileRes.result,
                settingRes: settingRes.result,
                routeDirectionRes: routeDirectionRes.result,
                trainCongStatsRes: trainCongStatsRes.result,
                stationCongStatsRes: stationCongStatsRes.result
            }}/>
    } else {
        return <Loading/>
    }

}