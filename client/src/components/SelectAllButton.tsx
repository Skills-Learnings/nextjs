"use client"

import { toggleTodo } from "@/actions/todos"
import { useTransition } from "react"

export default function SelectAllButton({ ids }: { ids: number[] }) {
  const [isPending, startTransition] = useTransition()

  return (
    <button
      disabled={isPending}
      onClick={() => {
        startTransition(async () => {
          await Promise.all(ids.map((id) => toggleTodo(id, true)))
        })
      }}
    >
      {isPending ? "Loading" : "Select All"}
    </button>
  )
}
