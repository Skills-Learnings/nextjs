type Todo = {
  id: number
  title: string
  completed: boolean
};

export async function getTodos() {
  await wait(2000);
  return fetch(`${process.env.API_URL}/todos`)
    .then(response => response.json())
    .then(data => data as Todo[]);
}

export async function getTodo(todoId: string) {
  await wait(2000);
  return fetch(`${process.env.API_URL}/todos/${todoId}`)
    .then(response => response.json())
    .then(data => data as Todo);
}

function wait(duration: number) {
  return new Promise(resolve => {
    setTimeout(resolve, duration)
  });
}