import {z} from "zod";

export const permissionMenuSchema = z.object({
  authGroupId: z.string().min(1, '1글자 이상 입력해주세요.'),
  depth3MenuId: z.string().min(1, '1글자 이상 입력해주세요.'),
  inptAuthrtYn: z.string().min(1, '1글자 이상 입력해주세요.'),
  inqAuthrtYn: z.string().min(1, '1글자 이상 입력해주세요.'),
  mdfcnAuthrtYn: z.string().min(1, '1글자 이상 입력해주세요.'),
  delAuthrtYn: z.string().min(1, '1글자 이상 입력해주세요.'),
})


