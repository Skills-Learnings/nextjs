import React from "react"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <h1>Hi from layout 2 </h1>
      {children}
    </>
  )
}
