import { Suspense } from "react"

async function getTodos() {
  await wait(2000)
  return fetch("https://jsonplaceholder.typicode.com/todos").then((res) =>
    res.json()
  )
}
export default function Home() {
  return (
    <>
      <h1>Todos</h1>
      <Suspense fallback={"Loading..."}>
        <TodoList />
      </Suspense>
    </>
  )
}

async function TodoList() {
  const todos = await getTodos()

  return <p>{todos.length}</p>
}
function wait(duration: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, duration)
  })
}
