export default function TeamIdPage({
  params: { id },
}: {
  params: { id: string }
}) {
  return <h1>Team {id}</h1>
}
