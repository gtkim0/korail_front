import {z} from "zod";

export const permissionMenuSchema = z.object({
  groupId: z.string().min(1, '1글자 이상 입력해주세요.'),
  groupNm: z.string().min(1, '1글자 이상 입력해주세요.'),
  priLevel: z.string().min(1, '1글자 이상 입력해주세요.'),
  description: z.string().min(1, '1글자 이상 입력해주세요.'),
})


