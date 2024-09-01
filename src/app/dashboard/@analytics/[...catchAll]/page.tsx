import { wait } from "@/lib/wait"

export default async function AnalyticsCatchAllPage() {
  const analyticsText = await wait(3000, "Analytics CA")
  return <div className="card analytics">{analyticsText}</div>
}
