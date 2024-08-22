import { getTodos, getUsers } from "@/api/api"
import TodoList from "@/components/TodoList"

export default async function Home() {
  const todos1 = await getTodos()
  const todos2 = await getTodos()
  const users = await getUsers()

  return (
    <>
    <h1>Todo Count: {todos1.length}</h1>
    <h1>Users Count: {users.length}</h1>
    <TodoList />
    </>
  )
}
