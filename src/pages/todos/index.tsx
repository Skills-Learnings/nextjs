import { GetStaticProps, InferGetStaticPropsType } from "next";
import Link from "next/link";
import db from "../../db/db";

export default function Todos({
  todos,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Link href="/todos/new">New</Link>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <Link href={`/todos/${todo.id}`}>{todo.title}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export const getStaticProps = (async () => {
  const data = await db.todo.findMany();

  return {
    props: { todos: data },
  };
}) satisfies GetStaticProps;
