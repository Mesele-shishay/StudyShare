import { Request, Response } from "express";

export const getRoot = (req: Request, res: Response) => {
  res.json({ message: "API is running!" });
};
