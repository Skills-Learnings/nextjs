import { wait } from "@/lib/wait"

export default async function DashboardPage() {
  const dashboardText = await wait(2000, "Main Dashboard")
  return <div className="card main">{dashboardText}</div>
}
