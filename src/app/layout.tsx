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
          <Link href="/team">Team</Link>
        </nav>
        {children}
      </body>
    </html>
  )
}
