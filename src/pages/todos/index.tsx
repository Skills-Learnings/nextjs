import { GetServerSideProps, InferGetServerSidePropsType } from "next"
import Link from "next/link"

export default function Todo({ todos }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <h1>Todos - {todos.length}</h1>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <Link href={`/todos/${todo.id}`}>{todo.title}</Link>
          </li>
        ))}
      </ul>
    </>
  )
}

export const getServerSideProps = (async () => {
  const data = await fetch("https://jsonplaceholder.typicode.com/todos").then(
    (res) => res.json()
  )
  return {
    props: { todos: data as any[] },
  }
}) satisfies GetServerSideProps
