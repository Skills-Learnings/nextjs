import { getTodos } from "@/api/api"

/* This will be a dynamic becasue we have set the revalidate as 0 which means it will re-render on every request */
export const revalidate = 0

export default async function Reavlidate0() {
  const todos = await getTodos()

  return <h1>Revalidate 0: {todos.length}</h1>
}
