import { wait } from "@/lib/wait"

export default async function PostsPage() {
  const postsText = await wait(1000, "Posts")
  /* throw new Error("Hi") */
  return <div className="card posts">{postsText}</div>
}
