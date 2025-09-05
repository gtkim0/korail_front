import {z} from "zod";

export const memberManagementSchema = z.object({
  userId: z.string().min(1, '1글자 이상 입력해주세요.'),  // 회원 아이디
  lgnPswdCn: z.string().min(1),
  userNm: z.string().min(1, '1글자 이상 입력해주세요.'),
  // authority: z.string().min(1, '1글자 이상 입력해주세요.'),
  deptCd: z.string().min(1, '1글자 이상 입력해주세요.'),
  jbgdCd: z.string().min(1, '1글자 이상 입력해주세요.'),
  cpNo: z.string().min(1, '1글자 이상 입력해주세요.'),
  acntLockYn: z.string().min(1, '1글자 이상 입력해주세요.'),
  wideRailYn: z.string().min(1, '1글자 이상 입력해주세요.'),
  emlAddr: z.string().min(1, '1글자 이상 입력해주세요.')
})