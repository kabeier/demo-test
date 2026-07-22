import { useState } from "react"

export default function ErrorPage() {
const [userExplanation, setUserExplanation] = useState("")

 const handleSubmit=(e)=>{
    e.preventDefault()
    console.log(userExplanation)
 }

  return (
    <>
      <h1>You Broke it!!!</h1>
      <h3>Sorry there was a 500 error</h3>
      <form onSubmit={(e)=>handleSubmit(e)}>
        <textarea
           rows={25}
           value={userExplanation}
           onChange={(e)=>setUserExplanation(e.target.value)}
           ></textarea>
        <input type="submit"/>
      </form>

    </>

  )
}