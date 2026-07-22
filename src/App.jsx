import './App.css'
import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Heading from "./components/Heading";
import NavBar from './components/NavBar';

function App() {
  const [user, setUser ] =useState(null)
  const [pokemonList, setPokemonList] = useState([])
  const [count, setCount] = useState(0)

  useEffect(
    ()=>{console.log(user)}, [user]
  )

  useEffect(
    ()=>{
      console.log("page mounted")
      return ()=>{console.log("page unmounted")}
    },[]
  )

  return (
    <>
      <NavBar/>
      <main className="min-h-screen bg-slate-100 p-8">
        <div className="mx-auto max-w-5xl space-y-8 ">
          <Heading/>
          <Outlet context={ {pokemonList, setPokemonList, count, setCount} }/>
          <button onClick={()=>{setUser("Neil Patrick Harris")}}>
            Set user
          </button>
        </div>
      </main>
    </>
  )
}

export default App
