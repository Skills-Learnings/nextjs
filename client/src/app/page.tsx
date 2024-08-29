import TodoForm from "@/components/TodoForm"
import { revalidatePath } from "next/cache"

type Todo = {
  id: string
  title: string
  completed: boolean
}

function getTodos() {
  return fetch("http://localhost:3001/todos")
    .then((res) => res.json())
    .then((data) => data as Todo[])
}


export default async function Home() {
  const todos = await getTodos()

  return (
    <>
      <h1>Todo List</h1>
      {/* Example of server actions with form in server components */}
      {/* <form
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
      </form> */}

      {/* Example of server actions with form in client components */}
      <TodoForm />
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </>
  )
}
