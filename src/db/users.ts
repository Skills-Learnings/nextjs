import { cache } from "react"
import prisma from "./db"
import { unstable_cache } from "next/cache"

type GetUsersPops = {
  query: string
  userId: string
}

export const getUsers = unstable_cache(
  cache(async () => {
    await wait(2000)

    return prisma.user.findMany()
  }),
  ["users"]
)

export const getUser = unstable_cache(
  cache(async (userId: string | number) => {
    await wait(2000)
    return prisma.user.findUnique({ where: { id: Number(userId) } })
  }),
  ["user", "userId"]
)

function wait(duration: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, duration)
  })
}
