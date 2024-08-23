import { getTodos } from "@/api/api"
import TodoItem from "./TodoItem"
import { Child } from "./Child"

export default async function TodoList() {
  const todos = await getTodos()
  console.log("Todo list")
  return (
    <>
      {/* This child component will be considered as server component because it being rendered in the server component now, and it is a server component. */}
      {/* <Child /> */}
      <ul>
        {todos.slice(0, 2).map((todo) => (
          <TodoItem key={todo.id} {...todo}>
            {/* Example of rendering server comp as a server comp in the client components by passing as children. */}
            <Child />
          </TodoItem>
        ))}
      </ul>
    </>
  )
}
