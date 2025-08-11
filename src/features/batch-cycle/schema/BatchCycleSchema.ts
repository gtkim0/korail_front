import {z} from "zod";

export const batchCycleSchema = z.object({
  tableName: z.string().min(1, '1글자 이상 입력해주세요.'),
  desc: z.string().min(1, '1글자 이상 입력해주세요.'),
  type: z.string().min(1, '1글자 이상 입력해주세요.'),
  cycleVal: z.string().min(1, '1글자 이상 입력해주세요.'),
  cycleUnit: z.string().min(1, '1글자 이상 입력해주세요.'),
  recount: z.string().min(1, '1글자 이상 입력해주세요.'),
  time: z.string().min(1, '1글자 이상 입력해주세요.'),
  repeatType: z.string().min(1, '1글자 이상 입력해주세요.')
})