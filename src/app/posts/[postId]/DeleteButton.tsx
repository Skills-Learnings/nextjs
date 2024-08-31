"use client"

import { deletePostAction } from "@/app/actions/posts"
import { useTransition } from "react"

export default function DeleteButton({ postId }: { postId: string }) {
  const [isPending, startTransition] = useTransition()
  return (
    <button
      disabled={isPending}
      onClick={() => {
        startTransition(async () => {
          await deletePostAction(postId)
        })
      }}
      className="btn btn-outline btn-danger"
    >
      {isPending ? "Deleting" : "Delete"}
    </button>
  )
}
