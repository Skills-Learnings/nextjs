import Link from "next/link"

export default async function Page() {
  console.log("Rendering test")
  return (
    <>
      <h1>Page test</h1>
      <Link href="/">Home</Link>
    </>
  )
}
