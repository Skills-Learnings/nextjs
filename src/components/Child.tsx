import { getTodos } from "@/api/api"

export async function Child() {
  console.log("Child")
  const todos = await getTodos()
  return (
    <p>Child: {todos.length}</p>
  )
}
