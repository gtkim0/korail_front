import {z} from "zod";

export const notificationRecipientSchema = z.object({
  notificationGrp: z.string().min(1, '1글자 이상 입력해주세요.'),
  targetStation: z.string().min(1, '1글자 이상 입력해주세요.'),
  recipientList: z.string().min(1, '1글자 이상 입력해주세요.'),
})