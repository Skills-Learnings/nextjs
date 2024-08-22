import { cache } from "react";

type Todo = {
  id: number
  title: string
  completed: boolean
};

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
};

export function getTodos() {
  // To disable the request memoization cache use the AbortController and send a signal with fetch request like below example
  /* const controller = new AbortController()
  return fetch(${process.env.API_URL}/todos, { signal: controller.signal }) */
  return fetch(`${process.env.API_URL}/todos`)
    .then((res) => res.json())
    .then((data) => data as Todo[])
}

export function getUsers() {
  return fetch(`${process.env.API_URL}/users`)
    .then((res) => res.json())
    .then((data) => data as User[])
}

// Request memoization only works with fetch request by default to implement it in other functions then use cache function available in react.
export const getData = cache(() => {
  console.log("Cache function called");
  return Promise.resolve({data: "This is some data", data2: "This is some data2"})
})