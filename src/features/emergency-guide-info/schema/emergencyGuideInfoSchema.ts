import {z} from "zod";

export const emergencyGuideInfoSchema = z.object({
  zone: z.string().min(1, '1글자 이상 입력해주세요.'),
  title: z.string().min(1, '1글자 이상 입력해주세요.').max(10,'10자 이내로 입력해주세요'),
  content: z.string().min(1, '1글자 이상 입력해주세요.').max(200,'10자 이내로 입력해주세요'),
})