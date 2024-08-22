import { cache } from "react"

type Todo = {
  id: number
  title: string
  completed: boolean
}

type User = {
  id: number
  name: string
  email: string
  website: string
  address: {
    city: string
    street: string
    zipcode: string
    suite: string
  }
  company: {
    name: string
  }
}

export function getTodos() {
  return fetch(`${process.env.API_URL}/todos`, { next: { tags: ["todo"] } })
    .then((res) => res.json())
    .then((data) => data as Todo[])
}

export function getUsers() {
  return fetch(`${process.env.API_URL}/users`, { next: { tags: ["user"] } })
    .then((res) => res.json())
    .then((data) => data as User[])
}

export function getTodosLimited() {
  // Example of time based cache revalidation
  /* return fetch(`${process.env.API_URL}/todos/1`, { next: { revalidate: 10 } }) */

  // Example of tag based cache revalidation tags are defined to this request and to revalidate based on tags revalidateTag() function is called .
  /* return fetch(`${process.env.API_URL}/todos/1`, { next: {tags: ["todo", "1"]}}) */

  return fetch(`${process.env.API_URL}/todos/1`)
    .then((res) => res.json())
    .then((data) => data as Todo[])
}
