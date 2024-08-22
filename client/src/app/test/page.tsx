import { getTodos } from "@/api/api"

export default async function Page() {
  // Full route cache also caches the fetch requests.
  const todos = await getTodos()

  console.log("Rendering")

  return (
    <>
      <h1>Test static page</h1>
    </>
  )
}
