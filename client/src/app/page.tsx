import { wait } from "@/actions/todos"
import { TodoForm } from "@/components/TodoForm"
import { TodoItem } from "@/components/TodoItem"
import { revalidatePath } from "next/cache"

type Todo = {
  id: number
  title: string
  completed: boolean
}

function getTodos() {
  return fetch("http://localhost:3001/todos")
    .then((res) => res.json())
    .then((data) => data as Todo[])
}

async function createTodo(prevState: unknown, formData: FormData) {
  "use server"

  await wait(2000)

  formData.get("title")
  const title = formData.get("title") as string

  if (title === "") {
    return { errorMessage: "No title was given" }
  }

  await fetch("http://localhost:3001/todos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: formData.get("title"),
      completed: false,
    }),
  }).then((res) => res.json())
  revalidatePath("/")
}

export default async function Home() {
  const todos = await getTodos()

  return (
    <>
      <h1>Todo List</h1>

      <TodoForm createTodo={createTodo} />

      <ul>
        {todos.map((todo) => (
          <TodoItem key={todo.id} {...todo} />
        ))}
      </ul>
    </>
  )
}
