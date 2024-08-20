import { wait } from "./base"

type Post = {
  id: number
  title: string
  body: string
  userId: number
}

export async function getPosts() {
  await wait(2000)
  return fetch(`${process.env.API_URL}/posts`)
    .then((res) => res.json())
    .then((data) => data as Post[])
}

export async function getPost(postId: number) {
  await wait(2000)
  return fetch(`${process.env.API_URL}/posts/${postId}`)
    .then((res) => res.json())
    .then((data) => data as Post)
}

export async function getUserPosts(userId: number) {
  await wait(2000)
  return fetch(`${process.env.API_URL}/posts?userId=${userId}`)
    .then((res) => res.json())
    .then((data) => data as Post[])
}

