import { Fragment, ReactNode, Suspense } from "react"

type SkeletonProps = {
  short?: boolean,
  inline?: boolean
}

export function Skeleton({ short, inline }: SkeletonProps) {
  return (
    <div
      className="skeleton"
      style={{
        width: short ? "15em" : undefined,
        display: inline ? "inline-block" : undefined,
      }}
    />
  )
}

export function SkeletonButton() {
  return <div className="skeleton skeleton-btn" />
}

export function SkeletonInput() {
  return <div className="skeleton skeleton-input" />
}

type SkeletonListProps = {
  amount: number,
  children: ReactNode
}

export function SkeletonList({ amount, children }: SkeletonListProps) {
  return (
    <>
      {Array.from({ length: amount }).map((_, i) => (
        <Fragment key={i}>{children}</Fragment>
      ))}
    </>
  )
}
