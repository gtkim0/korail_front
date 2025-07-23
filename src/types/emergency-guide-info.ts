import {SELECT_OPTIONS} from "@/shared/contants/selectOptions";

export type EmergencyGuideInfoColumnType = {
  id: string;
  zone: typeof SELECT_OPTIONS.ZONE_OPTIONS[number]['key'];
  title: string;
  content: string;
  date: string;
}