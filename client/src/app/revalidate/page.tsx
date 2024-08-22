import { revalidatePath, revalidateTag } from "next/cache"

export default function Revalidate() {
  // Ravalidate data cache of a particulare page using the its path
  /* revalidatePath("/test") */

  // Revalidate data cache of based on tags where ever a particular tag is use.
  revalidateTag("todo")
  return <h1>Revalidate test route</h1>
}