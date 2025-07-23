import {z} from "zod";

export const notificationPushSchema = z.object({
  status: z.string().min(1, '1글자 이상 입력해주세요.'),
  channelName: z.string().min(1, '1글자 이상 입력해주세요.'),
  channelType: z.string().min(1, '1글자 이상 입력해주세요.'),
  method: z.string().min(1, '1글자 이상 입력해주세요.'),
  uri: z.string().min(1, '1글자 이상 입력해주세요.'),
})