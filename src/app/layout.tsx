import Link from "next/link"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html>
      <body>
        <nav
          style={{ display: "flex", flexDirection: "column", gap: ".25rem" }}
        >
          <Link href="/">Home</Link>
          <Link href="/test/login">Login</Link>
          <Link href="/test/signup">Signup</Link>
          <Link href="/team">Team</Link>
          <Link href="/test/about">About</Link>
          <Link href="/posts">Posts</Link>
          <Link href="/todos">Todos</Link>
        </nav>
        {children}
      </body>
    </html>
  )
}
