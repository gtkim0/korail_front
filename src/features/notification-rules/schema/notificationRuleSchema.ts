import {z} from "zod";

export const notificationRuleSchema = z.object({
  ruleNm: z.string().min(1, '1글자 이상 입력해주세요.'),
  congestion: z.string().min(1, '1글자 이상 입력해주세요.'),
  targetStationNm: z.string().min(1, '1글자 이상 입력해주세요.'),
  duration: z.string().min(1, '1글자 이상 입력해주세요.'),
  channelNm: z.string().min(1, '1글자 이상 입력해주세요.'),
  notificationGrp: z.string().min(10, '휴대폰 번호를 입력해주세요'),
  notificationText: z.string(),
  notificationContent: z.string(),
  useYn: z.string()
})