import { PostForm } from "@/components/PostForm"
import { getPost } from "@/db/posts"
import { notFound } from "next/navigation"
import { UserSelectOptions } from "../../userSelectOptions"
import { getUsers } from "@/db/users"

export default async function NewPostPage({
  params: { postId },
}: {
  params: { postId: number }
}) {
  const [post, users] = await Promise.all([getPost(postId), getUsers()])

  if (post == null) return notFound()

  return (
    <>
      <h1 className="page-title">Edit Post</h1>
      <PostForm post={post} userSelectOptions={<UserSelectOptions users={users}/>} />
    </>
  )
}
