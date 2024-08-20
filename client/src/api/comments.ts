import { wait } from "./base"

type Comment = {
  postId: number
  id: number
  name: string
  email: string
  body: string
}

export async function getComments(postId: number) {
  await wait(2000)
  return fetch(`${process.env.API_URL}/posts/${postId}/comments`).then(res => res.json()).then(data => data as Comment[])
}
