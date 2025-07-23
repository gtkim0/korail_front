import {z} from "zod";

export const notificationLogSchema = z.object({
  reservationNm: z.string().min(1, '1글자 이상 입력해주세요.'),
  sendTm: z.string().refine((value) => {
    const sendTime = new Date(value);
    const now = new Date();
    const oneHourLater = new Date(now.getTime() + 60 * 60 * 1000);
    return sendTime > oneHourLater;
  }, {
    message: '전송 시각은 현재 시각 기준 1시간 이후여야 합니다.',
  }),
  channelNm: z.string().min(1, '1글자 이상 입력해주세요.'),
  notificationGrp: z.string().min(1, '1글자 이상 입력해주세요.'),
  notificationText: z.string().min(1, '1글자 이상 입력해주세요.'),
  notificationContent: z.string().min(1, '1글자 이상 입력해주세요.')
})