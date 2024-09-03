import { deletePost, updatePost } from "@/db/posts"
import { validatePost } from "@/lib/validatePost"
import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "PUT") {
    const postId = req.query.postId as string
    const [data, errors] = validatePost(req.body)
    if (data == null) return res.status(400).json(errors)

    const post = await updatePost(postId, data)

    res.revalidate(`/users/${post.userId}`)
    res.status(200).json(post)
  }

  if (req.method === "DELETE") {
    const post = await deletePost(req.query.postId as string)

    if (post == null) return res.status(404)

    res.revalidate(`/users/${post.userId}`)
    res.status(200).json(post)
  }
}
