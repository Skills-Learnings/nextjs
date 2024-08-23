import { cookies } from "next/headers"
import Link from "next/link"

export default function Cookies() {
  const c = cookies().get("Name")
  console.log(c)
  return (
    <>
      <h1>Cookies page</h1>
      <p>
        Check in server console for the name cookie value fetched via builtin
        cookies function
      </p>
      <Link href="/">Home</Link>
    </>
  )
}
