import {z} from "zod";

export const emergencyManualSchema = z.object({
  manualId: z.string().min(1, '1글자 이상 입력해주세요.'),
  situationClass: z.string().min(1, '1글자 이상 입력해주세요.'),
  manualSubject: z.string().min(1, '1글자 이상 입력해주세요.'),
  writer: z.string().min(1, '1글자 이상 입력해주세요.'),
  appliedArea: z.string().min(1, '1글자 이상 입력해주세요.'),
  phone: z.string().min(10, '휴대폰 번호를 입력해주세요'),
  useYn: z.boolean(),
  file: z.any().refine((file) => file instanceof File || file === null, {
    message: '비상대피도 파일을 선택해주세요.'
  })
})