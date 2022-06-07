import { connect } from "react-redux"
import React, { useEffect} from 'react'
import { useParams } from "react-router-dom"
import { getPokeById, getPokeByName, getTypes } from "../../redux/actions"
import NavBar from "../Nav/navBar"
import './pokemonDetail.css'
import gif from '../../Resources/pikachu.gif'
import whoimg from '../../Resources/whosThatPokemon.jpg'

function PokemonDetail(props){
    const {idPokemon} = useParams()
    useEffect(()=>{
        props.getPokeById(idPokemon)
        props.getTypes()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return(
        <>
        <NavBar/>
        <div className="PokeDetail">
            {props.pokemonDetail?<>
            <span className="nameClass">Name: {props.pokemonDetail.name}</span>
            {props.pokemonDetail.image?
            <img className="imgClass" src={props.pokemonDetail.image} alt={props.pokemonDetail.name}/>
            :
            <img className="whoClass" src={whoimg} alt={props.pokemonDetail.name} />
            }
            <h3 className="idClass">PokeId:{props.pokemonDetail.ID}</h3>
            <div className="left">
                <div className="statsClass">
                    <h3 className="hp">Hp: {props.pokemonDetail.hp}</h3>
                    <h3 className="atk">Attack: {props.pokemonDetail.attack}</h3>
                    <h3 className="def">Defense: {props.pokemonDetail.defense}</h3>
                </div>
            </div>
            <div className="right">
                <div className="statsClass">
                    <h3 className="spd">Speed: {props.pokemonDetail.speed}</h3>
                    <h3 className="hei">Height: {props.pokemonDetail.height}</h3>
                    <h3 className="wei">Weight: {props.pokemonDetail.weight}</h3>
                </div>
            </div>
            {props.pokemonDetail.type && typeof props.pokemonDetail.type[0] === 'string'?
            <h3 className="typesClass">Type: {props.pokemonDetail.type&&props.pokemonDetail.type[0] + ' '}
            {props.pokemonDetail.type&&props.pokemonDetail.type[1]&&props.pokemonDetail.type[1]}</h3>:
            <h3 className="typesClass">Type: {props.pokemonDetail.types&&props.pokemonDetail.types[0].name + ' '}
            {props.pokemonDetail.types&&props.pokemonDetail.types[1]&&props.pokemonDetail.types[1].name}</h3>}
            </>:(
                    <div className="loadingd">
                        <p className="loadingp">Cargando</p>
                        <img src={gif} alt="Loading"/>
                    </div>)}
        </div>
        </>
    )
}

function mapStateToProps(state){
    return {
        pokemonDetail: state.pokemonDetail
    } 
}

function mapDispatchToProps(dispatch){
    return {
        getPokeById: (idPokemon) => dispatch(getPokeById(idPokemon)),
        getPokeByName: (name) => dispatch(getPokeByName(name)),
        getTypes: () => dispatch(getTypes())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PokemonDetail)