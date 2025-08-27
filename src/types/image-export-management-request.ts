import {SELECT_OPTIONS} from "@/shared/contants/selectOptions";

export type ImageExportManagementRequestType = {
  measureDate: string;
  type: typeof SELECT_OPTIONS.TRAIN_OR_STATION[number]['key'],
  installArea: string;
  detailContent: string;
  measureCount: number;
  standardArea: number;
  congest: string;
}
