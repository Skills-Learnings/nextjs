import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next"
import { useRouter } from "next/router"

export default function TodoDetail({
  todo,
  todoId,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter()

  if (router.isFallback) {
    return <h1>Loading..</h1>
  }

  return <h1>todo - {todoId}</h1>
}

export const getStaticPaths = (async () => {
  return { paths: [{ params: { todoId: "1" } }], fallback: true }
}) satisfies GetStaticPaths

export const getStaticProps = (async ({ params }) => {
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
    revalidate: 10,
  }
}) satisfies GetStaticProps
