import { getPosts } from "@/api/posts"
import { PostCard, SkeletonPostCard } from "@/components/PostCard"
import { SkeletonList } from "@/components/Skeleton"
import React, { Suspense } from "react"

export default async function Page() {
  const posts = await getPosts()
  return (
    <>
      <h1 className="page-title">Posts</h1>
      <div className="card-grid">
        {posts.map((post) => (
          <PostCard key={post.id} {...post} />
        ))}
      </div>
    </>
  )
}

async function Posts() {
  return
}
