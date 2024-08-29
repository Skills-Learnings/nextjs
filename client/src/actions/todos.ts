"use server"

import { revalidatePath } from "next/cache"


export async function toggleTodo(id: number, completed: boolean) {
  await wait(2000)
  await fetch(`http://localhost:3001/todos/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      completed
    }),
  }).then((res) => res.json())

  revalidatePath("/")
}

export async function wait(duration:number) {
  return new Promise(resolve => setTimeout(resolve, duration))
}