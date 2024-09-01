import React, { ReactNode } from "react"

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <h1>Auth layout</h1>
      {children}
    </>
  )
}
