export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  console.log("Layout")
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
