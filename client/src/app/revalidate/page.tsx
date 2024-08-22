import { revalidatePath, revalidateTag } from "next/cache"

export default function Revalidate() {
  // Example of path based cache revalidation for route cache
  revalidatePath("/test")
  return <h1>Revalidate test route</h1>
}