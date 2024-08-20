import { wait } from "./base"

type User = {
  id: number
  name: string
  username: string
  email: string
  address: {
    street: string
    suite: string
    city: string
    zipcode: string
    geo: {
      lat: string
      lng: string
    }
  }
  phone: string
  website: string
  company: {
    name: string
    catchPhrase: string
    bs: string
  }
}
export async function getUsers() {
  await wait(2000)
  return fetch(`${process.env.API_URL}/users`)
    .then((res) => res.json())
    .then((data) => data as User[])
}

export async function getUser(userId: number) {
  await wait(2000)
  return fetch(`${process.env.API_URL}/users/${userId}`)
    .then((res) => res.json())
    .then((data) => data as User)
}
