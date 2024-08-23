import { getTodo } from "@/api/api"

type Params = {
  params: { todoId: string }
}

export const dynamicParams = false

export async function generateStaticParams() {
  return [{ todoId: "1" }, { todoId: "2" }]
}

export default async function page({ params: { todoId } }: Params) {
  const todo = await getTodo(todoId)
  console.log(todo.id)
  return <h1>Todo: {todo.title}</h1>
}
