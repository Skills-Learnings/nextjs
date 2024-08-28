"use client"

import { FormGroup } from "@/components/FormGroup"
import { usePathname, useSearchParams, useRouter } from "next/navigation"
import { FormEvent, ReactNode, Suspense, useRef } from "react"

type SearchFromProps = {
  userOptions: ReactNode
}

export default function SearchForm({ userOptions }: SearchFromProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const queryRef = useRef<HTMLInputElement>(null)
  const userRef = useRef<HTMLSelectElement>(null)
  const query = searchParams.get('query') || ""
  const userId = searchParams.get('userId') || ""

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const params = new URLSearchParams(searchParams)
    params.set("query", queryRef.current?.value || "")
    params.set("userId", userRef.current?.value || "")

    router.push(`${pathname}?${params.toString()}`)
  }

  return (
    <form onSubmit={handleSubmit} className="form mb-4">
      <div className="form-row">
        <FormGroup>
          <label htmlFor="query">Query</label>
          <input type="search" name="query" id="query" ref={queryRef} defaultValue={query} />
        </FormGroup>
        <FormGroup>
          <label htmlFor="userId">Author</label>
          <select name="userId" id="userId" ref={userRef} defaultValue={userId}>
            <Suspense fallback={<option value="">Loading...</option>}>
              {userOptions}
            </Suspense>
          </select>
        </FormGroup>
        <button className="btn">Filter</button>
      </div>
    </form>
  )
}
