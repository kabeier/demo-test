import { useEffect, useState } from "react"

export default function Heading() {
  const [heading, setHeading] = useState("Dakota:Pokemon Project")

  useEffect(()=>{
        console.log("heading changed")
        console.log(heading)
        },[heading]
    )
  
  return (
    <header className="rounded-xl bg-slate-900 p-6 text-white shadow-lg tracking-widest">
      <p className="mb-2 text-sm font-semibold text-sky-300 uppercase ">Tailwind CSS</p>
      <h1 className="text-4xl font-bold">{heading}</h1>
      <button 
        onClick={ ()=>{setHeading("Dakota:Pokemon Project Part 2")} }
        className="mt-5 rounded-md bg-sky-500 px-4 py-2 font-semibold text-white hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-300"
      >Change Title</button>
    </header>
  )
}