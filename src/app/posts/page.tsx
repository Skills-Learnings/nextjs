import { getPosts } from "@/db/posts"
import { PostCard, SkeletonPostCard } from "@/components/PostCard"
import { SkeletonList } from "@/components/Skeleton"
import { Suspense } from "react"
import SearchForm from "./searchForm"
import { getUsers } from "@/db/users"

type PostsPageProps = {
  searchParams: { query?: string; userId?: string }
}

export default function PostsPage({
  searchParams: { userId = "", query = "" },
}: PostsPageProps) {
  return (
    <>
      <h1 className="page-title">Posts</h1>

      <SearchForm userOptions={<UserSelect />} />

      <div className="card-grid">
        <Suspense
          fallback={
            <SkeletonList amount={6}>
              <SkeletonPostCard />
            </SkeletonList>
          }
        >
          <PostGrid query={query} userId={userId} />
        </Suspense>
      </div>
    </>
  )
}

type PostGridProps = {
  query?: string
  userId?: string | number
}

async function PostGrid({ query, userId }: PostGridProps) {
  const posts = await getPosts({ query, userId })
  return posts.map((post) => <PostCard key={post.id} {...post} />)
}

async function UserSelect() {
  const users = await getUsers()

  return (
    <>
      <option value="">Any</option>
      {users.map((user) => (
        <option key={user.id} value={user.id}>
          {user.name}
        </option>
      ))}
    </>
  )
}
