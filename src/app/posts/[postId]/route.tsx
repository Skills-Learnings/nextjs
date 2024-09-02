import { deletePost, getPost, updatePost } from "@/db/posts"
import { revalidatePath } from "next/cache"
import { notFound } from "next/navigation"
import { NextRequest } from "next/server"

export async function GET(
  request: NextRequest,
  { params: { postId } }: { params: { postId: string } }
) {
  const post = await getPost(postId)
  if (post == null) return notFound()
  return Response.json(post)
}

export async function PUT(
  request: NextRequest,
  { params: { postId } }: { params: { postId: string } }
) {
  const body = await request.json()
  const post = await updatePost(postId, body)
  if (post == null) return notFound()
  revalidatePath("/posts")
  revalidatePath(`/posts/${post.id}`)
  return Response.json(post)
}

export async function DELETE(
  request: NextRequest,
  { params: { postId } }: { params: { postId: string } }
) {
  const post = await deletePost(postId)
  if (post == null) return notFound()
  revalidatePath("/posts")
  revalidatePath(`/posts/${post.id}`)

  return Response.json(post)
}
