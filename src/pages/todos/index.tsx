import Link from "next/link"

export default function Todo({ todos }: { todos: any[] }) {
  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>
          <Link href={`/todos/${todo.id}`}>{todo.title}</Link>
        </li>
      ))}
    </ul>
  )
}

Todo.getInitialProps = async () => {
  const data = await fetch("https://jsonplaceholder.typicode.com/todos").then(
    (response) => response.json()
  )
  return { todos: data as any }
}
