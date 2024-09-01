"use client"

export default function AnalyticsError({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  return (
    <div className="card posts">
      Error:
      <p>{error.message}</p>
      <button onClick={reset}>Try Again</button>
    </div>
  )
}
