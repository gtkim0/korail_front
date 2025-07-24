import {z} from "zod";

export const congestionVerificationCompleteSchema = z.object({
  division: z.string().min(1, '1글자 이상 입력해주세요.'),
  title: z.string().min(1, '1글자 이상 입력해주세요.'),
  content: z.string().min(1, '1글자 이상 입력해주세요.'),
})