import Link from "next/link"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <nav style={{ display: "flex", flexDirection: "column" }}>
          <Link href="/">Home</Link>
          <Link href="/users">Users</Link>
        </nav>
        {children}
      </body>
    </html>
  )
}
