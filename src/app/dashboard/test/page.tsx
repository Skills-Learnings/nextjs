import { wait } from "@/lib/wait"

export default async function DashboardTestPage() {
  const dashboardText = await wait(2000, "Test Dashboard")
  return <div className="card main">{dashboardText}</div>
}
