import { getTodos } from "@/api/api"

export default async function Home() {
  const todos = await getTodos()
  return (
    <>
      <h1>Todo</h1>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </>
  )
}
