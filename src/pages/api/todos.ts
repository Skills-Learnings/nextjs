import { NextApiRequest, NextApiResponse } from "next";
import db from "../../db/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if(req.method !== "POST") return;
  const title = req.body.title;
  const todo = await db.todo.create({data: {title, userId: 1, completed: false},})
  res.revalidate("/todos");
  return res.status(200).json(todo)
}
