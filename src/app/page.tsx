import Link from "next/link";

export default function Home() {
  return (
    <>
      <h1>Home page</h1>
      <Link href="/headers">Headers</Link>
      <br/>
      <Link href="/cookies">Cookies</Link>
      <br/>
      <Link href="/searchparams">Search params</Link>
    </>
  )
}