import prisma from "./db"

export default async function getTodos() {
    await wait(2000);

    return prisma.todo.findMany()
  }

function wait(duration: number) {
  return new Promise(resolve => {
    setTimeout(resolve, duration)
  })
}
