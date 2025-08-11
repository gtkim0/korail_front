export type SearchType = "all" | "station" | "line";

export interface SearchTargetType {
    type: SearchType,
    name: string
}

export const searchTargetInit: SearchTargetType = {type: "all", name: ""}