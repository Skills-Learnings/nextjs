"use client"

export default function Home() {
  return (
    <h1 onClick={() => {
      $("h1").text("Bye")
    }}>Hi</h1>
  )
}
