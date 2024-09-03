import { Roboto, Inter } from "next/font/google"
import localFont from "next/font/local"


export const inter = Inter({ subsets: ["latin"] })

export const roboto = localFont({
  src: [
    {path: "./fonts/Roboto-Medium.ttf", weight: "500", style: "normal"},
    {path: "./fonts/Roboto-MediumItalic.ttf", weight: "500", style: "italic"},
    {path: "./fonts/Roboto-Bold.ttf", weight: "700", style: "normal"},
    {path: "./fonts/Roboto-BoldItalic.ttf", weight: "700", style: "italic"},
  ]
})