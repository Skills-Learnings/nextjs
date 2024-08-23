import { getTodos } from "@/api/api"
import MySelect from "@/components/MySelect"
import TodoList from "@/components/TodoList"

export default async function Home() {
  const todos1 = await getTodos()
  console.log("Home")
  return (
    <>
      <h1>Todos Count: {todos1.length}</h1>
      <MySelect />
      <TodoList />
    </>
  )
}
