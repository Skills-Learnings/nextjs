import { getTodos, getUsers, getTodosLimited } from "@/api/api"
import TodoList from "@/components/TodoList"

// Declare revalidate const to revlidate the entire page after a duration.
/* export const revalidate = 10 */

export default async function Home() {
  const todos1 = await getTodos()
  const todos2 = await getTodos()
  const users = await getUsers()
  const todosLimitd = await getTodosLimited()

  // Data cache is persistent across page also that needs same data so in this case no new request will be make to API.
  return (
    <>
    <h1>new</h1>
    <h1>Todo Count: {todos1.length}</h1>
    <h1>Users Count: {users.length}</h1>
    <TodoList />
    </>
  )
}
