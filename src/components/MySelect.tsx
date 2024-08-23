"use client"

import Select from "react-select"

export default function MySelect() {
  return (
    <Select
      options={[
        { value: "1", label: "1" },
        { value: "2", label: "2" },
      ]}
    />
  )
}
