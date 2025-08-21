import {z} from "zod";

export const memberManagementSchema = z.object({
  userId: z.string().min(1, '1글자 이상 입력해주세요.'),  // 회원 아이디
  userNm: z.string().min(1, '1글자 이상 입력해주세요.'),
  authority: z.string().min(1, '1글자 이상 입력해주세요.'),
  areaOrTrunk: z.string().min(1, '1글자 이상 입력해주세요.'),
  interestDirection: z.string().min(1, '1글자 이상 입력해주세요.'),
  interestStation: z.string().min(1, '1글자 이상 입력해주세요.'),
  useYn: z.string().min(1, '1글자 이상 입력해주세요.')
})