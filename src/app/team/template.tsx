"use client"

import { ReactNode, useEffect } from "react"

export default function Template({ children }: { children: ReactNode }) {
  // console.log will be executed each time because templates are re-rendered on each request
  useEffect(() => {
    console.log("Template")
  }, [])
  return (
    <>
      <h1>Template</h1>
      {children}
    </>
  )
}
