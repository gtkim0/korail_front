import {serverGetAuth} from "@/shared/api/serverAuth";
import type {AuthMe} from "@/types/auth";
import DashboardView from "@/features/dashboard/components/DashboardView/DashboardView";
import {SettingType} from "@/types/setting";
import {RouteDirectionListType} from "@/types/routes-direction";
import Loading from "@/app/(auth)/auth/login/loading";

export default async function DashboardServer() {

    const profileRes = await serverGetAuth<AuthMe>(`/api/auths/me`, {
        logout: false,
    })
    const settingRes = await serverGetAuth<SettingType>(`/api/settings`, {
        logout: false,
    })
    // 광역이면 Y 간선이면 N
    const wideRailYn = profileRes.result.profile.wideRailYn == "Y"

    const routeDirectionRes = await serverGetAuth<RouteDirectionListType>(`/api/dashboards/routes/directions/get-list`, {
        logout: false,
    })


    if (profileRes.result && settingRes.result && routeDirectionRes.result) {
        return <DashboardView
            initialData={{
                profileRes: profileRes.result,
                settingRes: settingRes.result,
                routeDirectionRes: routeDirectionRes.result
            }}/>
    } else {
        return <Loading/>
    }

}