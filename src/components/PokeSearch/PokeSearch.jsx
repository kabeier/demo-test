import axios from "axios";
import PokeContainer from "./PokeContainer";
import PokeForm from "./PokeForm";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";

export default function PokeSearch() {
  const [pokemonName, setPokemonName] = useState("")
  const {pokemonList, setPokemonList} = useOutletContext()


 useEffect(
   ()=>{
        if (pokemonList.length > 0) return
        const getStartingPokemon=async ()=>{
        const response = await axios.get("https://pokeapi.co/api/v2/pokemon/pikachu")
        setPokemonList([response.data])
        }
      getStartingPokemon();
    }
    ,[pokemonList.length]
  )
  useEffect(
    ()=>{
      console.log("pokemon list has changed (or ths is the first mount)")
      console.log(pokemonList)
    },[pokemonList]
  )

  const addPokemonData =(data)=>{
    setPokemonList([...pokemonList, data])
  }

  const rmData =(id)=>{
    setPokemonList(pokemonList.filter((pokemon)=>pokemon.id!==id))

  }


  const getPokemonData = async () =>{
    const requestURL = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
    try{
      let response = await axios.get(requestURL)
      console.log(response)
      addPokemonData(response.data)
    }catch(err){
      console.log(err)
      alert("Pokemon Does not Exist")
    }finally{
      console.log("thats all folks")
    }   

  }

  const handleSubmit=(event)=>{
    event.preventDefault()
    getPokemonData()
    setPokemonName("")

  }

  return (
    <>
        <PokeForm handleSubmit={handleSubmit} setPokemonName={setPokemonName} pokemonName={pokemonName}/>
        <PokeContainer
          pokemonList={pokemonList} 
          rmData={rmData} 
          />
    </>
  )
}