import { Metadata } from "next"
import React from "react"

export const metadata: Metadata = {
  description: "About Desc",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <h1>About layout</h1>
      {children}
    </>
  )
}
