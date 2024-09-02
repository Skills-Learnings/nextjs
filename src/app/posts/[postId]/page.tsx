export default function PostPage({ params }: { params: { postId: string } }) {
  return <h1>Post {params.postId}</h1>
}
