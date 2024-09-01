import { wait } from "@/lib/wait"
import Link from "next/link"
import { ReactNode, Suspense } from "react"

export default function DashboardLayout({
  children,
  analytics,
  posts,
  admin,
}: {
  children: ReactNode
  analytics: ReactNode
  posts: ReactNode
  admin: ReactNode
}) {
  const user = getUser()

  return (
    <>
    <nav className="nav">
      <Link href="/dashboard">Prod</Link>
      <Link href="/dashboard/test">Test</Link>
    </nav>
    <div className="dashboard-grid">
      {children}
      {analytics}
      {posts}
      {user.isAdmin && admin}
    </div>
    </>
  )
}

function getUser() {
  return { isAdmin: false, isLoggedIn: true }
}
