import Link from "next/link"

export default async function Home() {
  console.log("Rendering home")
  return (
    <>
      <h1>Page Home</h1>
      <Link href="/test">Test</Link>
    </>
  )
}
