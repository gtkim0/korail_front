import {POSITION_OPTIONS} from "@/shared/contants/selectOptions/positionOptions";
import {ZONE_OPTIONS} from "@/shared/contants/selectOptions/zoneOptions";
import {SHIFT_TYPE_OPTIONS} from "@/shared/contants/selectOptions/shiftTypeOptions";
import {ROUTE_TYPE_OPTIONS} from "@/shared/contants/selectOptions/routeTypeOptions";
import {NOTIFICATION_SNS_OPTIONS} from "@/shared/contants/selectOptions/notificationSnsOptions";
import {DAY_CLASSIFICATION_OPTIONS} from "@/shared/contants/selectOptions/dayClassificationOptions";
import {OPERATING_STATUS_OPTIONS} from "@/shared/contants/selectOptions/operatingStatusOptions";
import {OPERATION_TYPE_OPTIONS} from "@/shared/contants/selectOptions/operationTypeOptions";
import {TRAIN_OR_STATION} from "@/shared/contants/selectOptions/trainOrStations";

export const SELECT_OPTIONS = {
  POSITION_OPTIONS,
  ZONE_OPTIONS,
  SHIFT_TYPE_OPTIONS,
  ROUTE_TYPE_OPTIONS,
  NOTIFICATION_SNS_OPTIONS,
  DAY_CLASSIFICATION_OPTIONS,
  OPERATING_STATUS_OPTIONS,
  OPERATION_TYPE_OPTIONS,
  TRAIN_OR_STATION
} as const;