import { wait } from "@/lib/wait"

export default async function AnalyticsPage() {
  const analyticsText = await wait(3000, "Analytics Default")
  /* throw new Error("Hi") */
  return <div className="card analytics">{analyticsText}</div>
}
