import { Metadata } from "next"

/* export const metadata: Metadata = {
  title: "About",
} */

// Example generateMetadata function for generating dynamic metadata
export async function generateMetadata({ params }): Promise<Metadata> {
  return { title: "users name" }
}

export default function About() {
  return <h1>About</h1>
}
