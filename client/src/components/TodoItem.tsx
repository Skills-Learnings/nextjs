"use client"

import { toggleTodo } from "@/actions/todos"
import { useTransition } from "react"

export function TodoItem({
  id,
  title,
  completed,
}: {
  id: number
  title: string
  completed: boolean
}) {
  const [isPending, startTransition] = useTransition()

  return (
    <li>
      <label>
        <input
          type="checkbox"
          disabled={isPending}
          checked={completed}
          onChange={(e) => {
            startTransition(async() => {
              await toggleTodo(id, e.target.checked)
            })
          }}
        />
        {title}
      </label>
    </li>
  )
}
