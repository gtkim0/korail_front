import {z} from "zod";

export const authGroupManagerSchema = z.object({
  grpId: z.string().min(1, '1글자 이상 입력해주세요.'),
  grpNm: z.string().min(1, '1글자 이상 입력해주세요.'),
  authorityLv: z.string().min(1, '1글자 이상 입력해주세요.'),
  description: z.string().min(1, '1글자 이상 입력해주세요.'),
  create: z.string().min(1, '1글자 이상 입력해주세요.'),
  read: z.string().min(1, '1글자 이상 입력해주세요.'),
  update: z.string().min(1, '1글자 이상 입력해주세요.'),
  delete: z.string().min(1, '1글자 이상 입력해주세요.'),
  useYn: z.string().min(1, '1글자 이상 입력해주세요.'),
})