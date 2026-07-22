import { useState } from "react"

export default function About() {

    const [shouldCrash, setShouldCrash]=useState(false)
    if (shouldCrash){
        throw new Error ("the about page intentionally crashed")
    }

  return (
    <>
        <h1>About Page</h1>
        <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptate laborum ducimus quas quidem ut sunt eum, ullam consequatur. Eligendi commodi iste dolores unde perspiciatis harum, et aspernatur. Sunt, inventore accusamus!
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptate laborum ducimus quas quidem ut sunt eum, ullam consequatur. Eligendi commodi iste dolores unde perspiciatis harum, et aspernatur. Sunt, inventore accusamus!
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptate laborum ducimus quas quidem ut sunt eum, ullam consequatur. Eligendi commodi iste dolores unde perspiciatis harum, et aspernatur. Sunt, inventore accusamus!
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptate laborum ducimus quas quidem ut sunt eum, ullam consequatur. Eligendi commodi iste dolores unde perspiciatis harum, et aspernatur. Sunt, inventore accusamus!
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptate laborum ducimus quas quidem ut sunt eum, ullam consequatur. Eligendi commodi iste dolores unde perspiciatis harum, et aspernatur. Sunt, inventore accusamus!
        </p>
        <button 
            className="rounded-md bg-sky-500"
            onClick={()=> setShouldCrash(true)}
        >
            Test Error Button
        </button>
    </>
  )
}