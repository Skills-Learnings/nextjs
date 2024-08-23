import { headers } from "next/headers"
import Link from "next/link"

export default function Page() {
  const h = headers().get("user-agent")
  console.log(h)
  return (
    <>
      <h1>Headers page</h1>
      <p>Check in server console for user-agent value fetched via builtin headers function</p>
      <Link href="/">Home</Link>
    </>
  )
}
