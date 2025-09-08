import type {AuthMe} from "@/types/auth";
import {SettingType} from "@/types/setting";
import {RouteDirectionListType} from "@/types/routes-direction";

export type SearchType = "all" | "station" | "line";

export interface SearchTargetType {
    type: SearchType,
    name: string
}

export const searchTargetInit: SearchTargetType = {type: "all", name: ""}

export interface DashBoardProps {
    initialData: { profileRes: AuthMe, settingRes: SettingType, routeDirectionRes: RouteDirectionListType }
}