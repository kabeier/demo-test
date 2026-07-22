import axios from "axios";
import { useEffect, useState } from "react"
import { Card, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom"

export default function PokemonDetailsPage() {

    const [pokemon, setPokemon] = useState(null);
    const { id } = useParams()


    useEffect(
        ()=>{
            const fetchPokemon=async ()=>{
                try{
                    const response= await axios.get(
                        `https://pokeapi.co/api/v2/pokemon/${id}`
                    );
                    setPokemon(response.data)

                }catch(err){
                    console.log(err)
                }

            }
            fetchPokemon()

        },[id]
    )

    if (!pokemon){
        return (
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading</span>
            </Spinner>
        )

    }

  return (
    <Card style={{width:"33vw"}}>
       <Card.Img variant="top" src={pokemon.sprites.front_default}/>
       <Card.Title>{pokemon.name}</Card.Title>
       <Card.Body>
                <ol className="list-disc pl-6">
                    Game Indices
                    {pokemon.game_indices.map((indice,i)=>(
                        <li key={i}>{indice.version.name}</li>
                    ))}

                </ol>
       </Card.Body>

    </Card>

  )
}