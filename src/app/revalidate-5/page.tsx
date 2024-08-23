import { getTodos } from "@/api/api"

/* This will be a static page becasue we have set the revalidate as 5 which means it will re-render after 5 sec only and not on each request */
export const revalidate = 5

export default async function Reavlidate0() {
  const todos = await getTodos()

  return <h1>Revalidate 5: {todos.length}</h1>
}
