export default function tLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <h1>Individual Todo</h1>
      {children}
    </>
  );
}
