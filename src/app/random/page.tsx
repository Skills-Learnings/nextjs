/* Example of opting in full page as dynamic by declaring the dynamic constant as "force-dynamic" */
export const dynamic = "force-dynamic"

export default function Random() {
  /* If we dont specifically declar this page as dynamic then it would be considered static in production  because next.js will consider it never updates its value as it is calling same function.  */
  return <h1>{Math.random()}</h1>
}
