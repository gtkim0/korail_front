import {z} from "zod";

export const emergencyFieldPersonnelSchema = z.object({
  workingDate: z.string().min(1, '1글자 이상 입력해주세요.'),
  dayAndNight: z.string().min(1, '1글자 이상 입력해주세요.'),
  shiftTm: z.string().min(1, '1글자 이상 입력해주세요.'),
  routeNm: z.string().min(1, '1글자 이상 입력해주세요.'),
  stationNm: z.string().min(1, '1글자 이상 입력해주세요.'),
  worker: z.string().min(10, '휴대폰 번호를 입력해주세요'),
  position: z.string(),
  emergencyPhone: z.string()
})