type TodoItemProps = {
  completed: boolean,
  title: string
}

export default function TodoItem({ completed, title }: TodoItemProps) {
  return <li className={completed ? "strike-through" : undefined}>{title}</li>
}
