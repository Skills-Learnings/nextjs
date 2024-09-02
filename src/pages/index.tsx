import Head from "next/head"

export default function Home() {
  return (
    <>
      <Head>
        <title>This is the title</title>
        <meta property="description" content="Desc 1" key="DEsc"/>
      </Head>
      <h1>Home</h1>
      <NestedComponent/>
    </>
  )
}

function NestedComponent() {
  return (
    <>
      <Head>
        <title>This is the title 2</title>
        <meta property="description" content="Desc 2" key="DEsc"/>
      </Head>
    </>
  )
}