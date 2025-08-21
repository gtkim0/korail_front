import {z} from "zod";

export const permissionGroupSchema = z.object({
  authrtId: z.string().min(1, '1글자 이상 입력해주세요.'),
  authrtNm: z.string().min(1, '1글자 이상 입력해주세요.'),
  authrtExplnCn: z.string().min(1, '1글자 이상 입력해주세요.'),
})


