import React from 'react'
import { Link } from 'react-router-dom'
import './pokemonCard.css'
import whoimg from '../../Resources/whosThatPokemon.jpg'

export default function PokemonCard(props){
    return(
        <Link className='linkClass' to={`/PokemonDetail/${props.idPokemon}`}>
            <div className='PokeCard'>
                <div>{props.Name}</div>
                    <img id='pokeImg' src={props.Image || whoimg} alt={`Poke: ${props.Name}`}/>
                <div>Type: {props.Type&&props.Type[0] + ' '}{props.Type&&props.Type[1]&&props.Type[1]}
                </div>
            </div>
        </Link>
    )
}
