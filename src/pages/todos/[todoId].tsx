import { GetServerSideProps, InferGetServerSidePropsType } from "next"

export default function TodoDetail({
  todo,
  todoId,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return <div>todo - {todoId}</div>
}

export const getServerSideProps = (async ({ params }) => {
  const todoId = params?.todoId
  const data = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${todoId}`
  ).then((res) => res.json())
  if (data.id == null) {
    //return { notFound: true }
    return { redirect: { destination: "/", permanent: false } }
  }
  return {
    props: { todo: data, todoId },
  }
}) satisfies GetServerSideProps
