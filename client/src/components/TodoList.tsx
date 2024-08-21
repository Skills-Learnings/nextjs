import { getTodos } from "@/api/api"

export default async function TodoList() {
  const todos = await getTodos()

  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>{todo.title}</li>
      ))}
    </ul>
  )
}
