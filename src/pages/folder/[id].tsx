import Link from "next/link";
import { useRouter } from "next/router";

export default function Dynamic() {
  const router = useRouter()
  console.log(router.query)
  return (
    <>
      <h1>Dynamic</h1>
      <Link href="/">Home</Link>
    </>
  )
}
