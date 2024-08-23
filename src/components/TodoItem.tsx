"use client"

import { ReactNode } from "react"
import { Child } from "./Child"

type Props = {
  title: string
  children: ReactNode
}

export default function TodoItem({ title, children }: Props) {
  console.log("Todo Items")
  return (
    <>
      <li onClick={() => alert(title)}>
        {title}
        {/* Example of rendering server comp as a server comp in the client components by passing as children. */}
        {children}
        {/* This child component will be considered as client component because it being rendered in  client component now, althought it is a server component. */}
        {/* <Child /> */}
      </li>
    </>
  )
}
