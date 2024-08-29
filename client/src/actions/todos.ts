"use server"

import { revalidatePath } from "next/cache"

/* Example of server action functions */

// Example of accepting formData object in the server actions.
/* export async function createTodo(formData: FormData) { */

// Example of directly accepting in the single data value in server actions
export async function createTodo(title: string) {
  await fetch("http://localhost:3001/todos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      completed: false,
    }),
  }).then((res) => res.json())
  revalidatePath("/")
}
