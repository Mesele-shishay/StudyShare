import { Request, Response } from "express";
import { userValidation } from "../validations/userValidation";
import { prisma } from "@repo/db";

export const getUser = async (req: Request, res: Response) => {
  const validateData = userValidation.safeParse(req.body);
  if (!validateData.success) {
    return res.status(400).json({ message: validateData.error.message });
  }
  const { email, first_name, last_name, username, telegram_id } =
    validateData.data;
  const user = await prisma.user.create({
    data: { email, first_name, last_name, username, telegram_id },
  });
  res.json({ message: "User added successfully" });
};
