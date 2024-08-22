export default async function Page({params: {id}}: any) {
  // Full route cache will not work on this page becasue this is dyamic page and we are getting dynamic params
  console.log("Dynamic Rendering", id);
  return (
    <>
      <h1>Test dynamic page</h1>
    </>
  )
}
