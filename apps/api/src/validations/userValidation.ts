import { z } from "zod";

export const userValidation = z.object({
  email: z.string().email(),
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  username: z.string().optional(),
  telegram_id: z.string().min(1),
});
