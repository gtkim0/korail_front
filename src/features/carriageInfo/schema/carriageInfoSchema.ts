import {z} from "zod";

export const carriageInfoSchema = z.object({
  trainNum: z.string().min(2, '1글자 이상 입력해주세요.'),
  trainType: z.string().min(2, '1글자 이상 입력해주세요.'),
  passengerNum: z.string().min(2, '1글자 이상 입력해주세요.'),
  floorArea: z.string().min(2, '1글자 이상 입력해주세요.'),
  cctv1: z.string().min(2, '1글자 이상 입력해주세요.'),
  cctv2: z.string().min(2, '1글자 이상 입력해주세요.'),
  introductionDate: z.string().min(2, '1글자 이상 입력해주세요.'),
})


