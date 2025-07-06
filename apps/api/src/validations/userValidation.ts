import { z } from "zod";

export const userValidation = z.object({
  email: z.string().email("Please provide a valid email address"),
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  username: z.string().optional(),
  telegram_id: z.string().min(1, "Telegram ID is required"),
});
