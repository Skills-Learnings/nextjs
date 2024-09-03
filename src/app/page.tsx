import { roboto } from "@/fonts"
import Image from "next/image"
import MountainImage from "../imgs/mountain.jpg"

export default function Home() {
  /* Example of rendering local image  */
  /* return (
    <div style={{ width: "500px", height: "500px", position: "relative" }}>
      <Image placeholder="blur" fill src={MountainImage} alt="Image" />
    </div>
  ) */

  /* Example of rendering remote image  */
  return (
    <Image width={500} height={500} alt="remote image" src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
  )
}
