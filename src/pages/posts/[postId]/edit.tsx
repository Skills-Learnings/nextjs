import { PostForm } from "@/components/PostForm"
import { getPost } from "@/db/posts"
import { getUsers } from "@/db/users"
import { GetServerSideProps, InferGetServerSidePropsType } from "next"

export default function EditPostPage({
  post,
  users
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <h1 className="page-title">Edit Post</h1>
      <PostForm post={post} users={users}/>
    </>
  )
}

export const getServerSideProps = (async ({ params }) => {
  const postId = params?.postId as string
  const [post, users] = await Promise.all([getPost(postId), getUsers()])

  if (post == null) return { notFound: true }

  return {
    props: {
      post,
      users,
    },
  }
}) satisfies GetServerSideProps
