"use server"

import { createPost, deletePost, updatePost } from "@/db/posts"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function createPostAction(prevState: unknown, formData: FormData) {
  const [postData, formErrors] = validatePost(formData)

  if (postData == null) return formErrors

  const post = await createPost(postData)

  revalidatePath("/posts")
  revalidatePath(`/users/${post.userId}`)
  redirect(`/posts/${post.id}`)
}

export async function editPostAction(postId: number, prevState: unknown, formData: FormData) {
  const [postData, formErrors] = validatePost(formData)

  if (postData == null) return formErrors

  const post = await updatePost(postId, postData)

  revalidatePath("/posts")
  revalidatePath(`/posts/${post.id}`)
  revalidatePath(`/users/${post.userId}`)
  redirect(`/posts/${post.id}`)
}

export async function deletePostAction(postId: number | string) {
  const post = await deletePost(postId)

  revalidatePath("/posts")
  revalidatePath(`/users/${post.userId}`)
  revalidatePath(`/posts/${post.id}`)
  redirect("/posts")
}

function validatePost(formData: FormData) {
  const formErrors: { title?: string; body?: string; userId?: string } = {}
  const title = formData.get("title") as string
  const body = formData.get("body") as string
  const userId = Number(formData.get("userId"))
  let isValid = true

  if (title === "") {
    formErrors.title = "Required"
    isValid = false
  }

  if (body === "") {
    formErrors.body = "Required"
    isValid = false
  }

  if (isNaN(userId)) {
    formErrors.userId = "Required"
    isValid = false
  }

  return [isValid ? {title, body, userId} : undefined, formErrors] as const
}
