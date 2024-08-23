import { getTodos } from "@/api/api"

export const dynamic = "force-dynamic"

export default async function Dynamic() {
  const todos = await getTodos()

  return <h1>Dynamic: {todos.length}</h1>
}
