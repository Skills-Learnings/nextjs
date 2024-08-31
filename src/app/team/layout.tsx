"use client"

import Link from "next/link"
import { useEffect } from "react"

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // console.log will be executed on first time because layouts are no re-rendered on each request
  useEffect(() => {
    console.log("Layout")
  }, [])
  return (
    <>
      <nav
        style={{
          display: "flex",
          flexDirection: "column",
          gap: ".25rem",
          paddingTop: ".25rem",
        }}
      >
        <Link href="/team/1">Team One</Link>
        <Link href="/team/2">Team Two</Link>
      </nav>
      {children}
    </>
  )
}
