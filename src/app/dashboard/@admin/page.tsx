import { wait } from "@/lib/wait"

export default async function AdminPage() {
  const adminText = await wait(1000, "Admin")
  return <div className="card admin">{adminText}</div>
}
