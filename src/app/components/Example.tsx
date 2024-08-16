"use client"

import { useParams } from "next/navigation"

export default function Example() {
  const params = useParams()
  return (
    <h1>{params.id}</h1>
  )
}
