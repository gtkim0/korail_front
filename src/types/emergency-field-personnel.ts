import {SELECT_OPTIONS} from "@/shared/contants/selectOptions";

export type EmergencyFieldPersonnelColumnType = {
  id: string;
  workingDate: string;
  dayAndNight: 'day' | 'night';
  shiftTm: string;
  routeNm: string;
  stationNm: string;
  worker: string;
  position: typeof SELECT_OPTIONS.POSITION_OPTIONS[number]['key'];
  emergencyPhone: string;
  date: string;
}