import React from "react"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <h1>Team Layout</h1>
      {children}
    </>
  )
}
