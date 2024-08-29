"use client"

import React from "react"
import { SubmitButton } from "./SubmitButton"
import { useFormState } from "react-dom"

export function TodoForm({ createTodo }: any) {
  const [error, action] = useFormState(createTodo, { errorMessage: "" })

  console.log(error?.errorMessage)

  return (
    <>
      <div>{error?.errorMessage}</div>
      <form
        action={action}
        style={{
          display: "flex",
          gap: ".25rem",
          flexDirection: "column",
          maxWidth: "200px",
        }}
      >
        <label htmlFor="title">Title</label>
        <input type="text" name="title" id="title" />
        <SubmitButton />
      </form>
    </>
  )
}
