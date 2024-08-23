"use client"

import { useSearchParams } from "next/navigation"

export function Form() {
  const searchParams = useSearchParams()

  return (
    <input value={searchParams.get("q")!} onChange={() => console.log("test")} />
  )
}
