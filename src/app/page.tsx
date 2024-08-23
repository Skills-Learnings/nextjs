import RandomNumber from "@/components/RandomNumber";

export default async function Home() {
  /* This page will be rendered as dynamic because we have used unstable_noStore in RandomNumber component */
  return <RandomNumber/>
}
