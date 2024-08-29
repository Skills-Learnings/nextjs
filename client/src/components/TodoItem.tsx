"use client"

import { toggleTodo } from "@/actions/todos"
import { useOptimistic, useTransition } from "react"

export function TodoItem({
  id,
  title,
  completed,
}: {
  id: number
  title: string
  completed: boolean
}) {
  const [optimisticCompleted, setOptimisticCompleted] = useOptimistic(completed)

  return (
    <li>
      <label>
        <input
          type="checkbox"
          checked={optimisticCompleted}
          onChange={async (e) => {
            setOptimisticCompleted(e.target.checked)
            await toggleTodo(id, e.target.checked)
          }}
        />
        {title}
      </label>
    </li>
  )
}
