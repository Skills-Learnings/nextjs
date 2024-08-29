import SelectAllButton from "@/components/SelectAllButton"
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

async function createTodo(formData: FormData) {
  "use server"

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

      <form
        action={createTodo}
        style={{
          display: "flex",
          gap: ".25rem",
          flexDirection: "column",
          maxWidth: "200px",
        }}
      >
        <label htmlFor="title">Title</label>
        <input type="text" name="title" id="title" />
        <button>Add</button>
      </form>

      <SelectAllButton ids={todos.map(todo => todo.id)}/>
      <ul>
        {todos.map((todo) => (
          <TodoItem key={todo.id} {...todo} />
        ))}
      </ul>
    </>
  )
}
