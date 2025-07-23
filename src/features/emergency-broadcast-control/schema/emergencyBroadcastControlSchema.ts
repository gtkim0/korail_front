import {z} from "zod";

export const emergencyBroadcastControlSchema = z.object({
  broadcastRuleNm: z.string().min(1, '1글자 이상 입력해주세요.'),
  congestion: z.string().min(1, '1글자 이상 입력해주세요.'),
  targetRoute: z.string().min(1, '1글자 이상 입력해주세요.'),
  targetStation: z.string().min(1, '1글자 이상 입력해주세요.'),
  targetZone: z.string().min(1, '1글자 이상 입력해주세요.'),
  numOfBroadCast: z.string().min(1, '1글자 이상 입력해주세요.'),
  announcement: z.string(),
  autoBroadcast: z.string()
})