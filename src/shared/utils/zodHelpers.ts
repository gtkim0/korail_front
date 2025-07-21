import {z} from 'zod';

export function zRequiredNumber(
  {
    min,
    max,
    minMessage = `최소 ${min} 이상이어야 합니다.`,
    maxMessage = `최대 ${max} 이하여야 합니다.`,
    requiredMessage = '필수값입니다.',
    intMessage = '정수만 입력 가능합니다.'
  }: {
  min?: number;
  max?: number;
  minMessage?: string;
  maxMessage?: string;
  requiredMessage?: string;
  intMessage?: string;
}) {
  let schema = z.number().int(intMessage);

  if (min !== undefined) schema = schema.min(min, minMessage);
  if (max !== undefined) schema = schema.max(max, maxMessage);

  return z
    .preprocess(
      (val) => {
        if (val === '' || val === null || val === undefined) return undefined;
        const parsed = Number(val);
        return Number.isNaN(parsed) ? undefined : parsed;
      },
      z.union([schema, z.undefined()])
    )
    .refine((val) => val !== undefined, {
      message: requiredMessage,
    });
}