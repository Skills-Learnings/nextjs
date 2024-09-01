export function wait(duration: number, message: string): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(message)
    }, duration)
  })
}
