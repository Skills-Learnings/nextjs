import { Form } from "@/components/Form"
import Link from "next/link"

export default function Page({ searchParams }: { searchParams: any }) {
  return (
    <>
      <h1>Search params page</h1>
      <p>
        Add a <strong>q</strong> searchParam with random value in the route then
        you will get that value printed below in the input and header fetched
        from the searchParams.
      </p>
      <h2>{searchParams.q}</h2>
      <Form />
      <br />
      <br />
      <Link href="/">Home</Link>
    </>
  )
}
