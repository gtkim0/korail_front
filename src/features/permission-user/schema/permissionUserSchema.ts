import {z} from "zod";

export const permissionUserSchema = z.object({
  selected: z.array(z.any()).default([])
})


