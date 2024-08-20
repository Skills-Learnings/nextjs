import { getTodos } from "@/api/todos"
import { Skeleton, SkeletonList } from "@/components/Skeleton"
import TodoItem from "@/components/TodoItem"
import React, { Suspense } from "react"

export default async function Page() {
  return (
    <>
      <h1 className="page-title">Todos</h1>
      <ul>
        <Suspense
          fallback={
            <SkeletonList amount={10}>
              <li>
                <Skeleton short />
              </li>
            </SkeletonList>
          }
        >
          <Todos />
        </Suspense>
      </ul>
    </>
  )
}

async function Todos() {
  const todos = await getTodos()
  return todos.map((todo) => <TodoItem key={todo.id} {...todo} />)
}
