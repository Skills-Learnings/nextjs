import { useRouter } from "next/router";
import { FormEvent, useRef } from "react";

export default function NewTodoPage() {
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    fetch("/api/todos", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({ title : inputRef.current?.value }),
    }).then(response => response.json())
    .then(data => {
      router.push(`/todos/${data.id}`);
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" ref={inputRef} />
      <button>Create</button>
    </form>
  );
}
