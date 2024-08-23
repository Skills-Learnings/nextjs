import { unstable_noStore } from "next/cache"

export default function RandomNumber() {
  unstable_noStore()
  return <h1>{Math.random()}</h1>
}
