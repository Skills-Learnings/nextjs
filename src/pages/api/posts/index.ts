import { createPost } from "@/db/posts"
import { validatePost } from "@/lib/validatePost"
import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "POST") {
    const [data, errors] = validatePost(req.body)

    if (data == null) return res.status(400).json(errors)

    const post = await createPost(data)

    res.revalidate(`/users/${post.userId}`)
    res.status(201).json(post)
  }

  res.status(405)
}
