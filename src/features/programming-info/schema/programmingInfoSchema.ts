import {z} from "zod";

export const programmingInfoSchema = z.object({
  routeType: z.string().min(2, '1글자 이상 입력해주세요.'),
  routeNum: z.string().min(2, '1글자 이상 입력해주세요.'),
  orgNum: z.string().min(2, '1글자 이상 입력해주세요.'),
  routeName: z.string(),
  trainCnt: z.string().min(2, '1글자 이상 입력해주세요.'),
})