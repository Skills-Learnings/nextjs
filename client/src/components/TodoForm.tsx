"use client"

import React, { useRef } from "react"
import { createTodo } from "@/actions/todos"

export default function TodoForm() {
  const inputRef = useRef<HTMLInputElement>(null)
  return (
    <form
      action={async (formData) => {
        if (inputRef.current != null) {
          inputRef.current.value = ""
        }

        // Example of passing in formData object in the server actions.
        /* await createTodo(formData) */

        // Example of directly passing in the single data value in server actions.
        await createTodo(formData.get('title') as string)
      }}
      style={{
        display: "flex",
        gap: ".25rem",
        flexDirection: "column",
        maxWidth: "200px",
      }}
    >
      <label htmlFor="title">Title</label>
      <input type="text" name="title" id="title" ref={inputRef} />
      <button>Add</button>
    </form>
  )
}
