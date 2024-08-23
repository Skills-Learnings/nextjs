/* This will be a dynamic page because we are passing in todoId which will be different in each request */
export default function TodoPage({
  params: { todoId },
}: {
  params: { todoId: string }
}) {
  return <h1>Todo: {todoId}</h1>
}
