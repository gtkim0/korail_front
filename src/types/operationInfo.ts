import {ROUTE_TYPE_OPTIONS} from "@/shared/contants/selectOptions/routeTypeOptions";
import {SELECT_OPTIONS} from "@/shared/contants/selectOptions";

export type OperationInfo = {
  1: string;
  2: string;
  3: string;
  4: string;
  5: string;
  6: string;
  7: string;
  8: string;
  9: string;
  10: string;
  11: string;
  12: string
}

export type OperationInfoColumnType = {
  type: typeof SELECT_OPTIONS.ZONE_OPTIONS[number]['key'],
  trainNum: string;
  routeId: string;
  routeNm: string;
  startStationId: string;
  startStationNm: string;
  endStationId: string;
  endStationNm: string;
  operationType: string;
  dayClassification: string;
  operationStation: string;
  startTm: string;
  endTm: string;
}