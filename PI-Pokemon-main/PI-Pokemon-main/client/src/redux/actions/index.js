import axios from 'axios'

export const GET_ALL_POKEMON = 'GET_ALL_POKEMON'
export const GET_POKE_BY_ID = 'GET_POKE_BY_ID'
export const GET_POKE_BY_NAME = 'GET_POKE_BY_NAME'
export const CREATE_POKEMON = 'CREATE_POKEMON'
export const GET_TYPES = 'GET_TYPES'
export const FILTER_TYPE = 'FILTER_TYPE'
export const ORDER_POKEMON = 'ORDER_POKEMON'
export const FILTER_POKEMON = 'FILTER_POKEMON'
export const FILTER_POKEMON_BY_TYPE = "FILTER_POKEMON_BY_TYPE"
export const REFRESH = 'REFRESH'

export const getAllPokemon = () => {
    return async(dispatch) => {
        let res = await axios.get('/pokemons')
        return dispatch({type: GET_ALL_POKEMON, payload: res.data})
    }
}

export const orderPokemon = (order, pokemon)=>{
        return( (dispatch) =>{
        let poke2 = [...pokemon]
       if(order === "ASCALF"){
            poke2 = pokemon.sort((a, b)=>{
                if(a.name < b.name) return -1
                if(a.name > b.name) return 1
                return 0
            })}
        else{
            if(order === "DESALF"){
            poke2 = pokemon.sort((a, b) =>{
                if(a.name > b.name) return -1
                if(a.name < b.name) return 1
                return 0
            })}
            else{
                if(order === "FASD"){
                    poke2 = pokemon.sort((a, b) => {
                        if(a.attack < b.attack) return -1
                        if(a.attack > b.attack) return 1
                        return 0
                    })
                }
                else{
                    if(order === "FDES"){
                        poke2 = pokemon.sort((a, b) => {
                            if(a.attack > b.attack) return -1
                            if(a.attack < b.attack) return 1
                            return 0
                        })}
                        else{
                            poke2 = pokemon.sort((a, b) => {
                            if(a.ID < b.ID) return -1
                            if(a.ID > b.ID) return 1
                            return 0
                            })}}}}
        return (dispatch({type:ORDER_POKEMON, payload:poke2}))
        })}

export const filterPokemon = (filter, pokemon, unfilteredPokemon) => {
    return((dispatch)=>{
    if(pokemon !== unfilteredPokemon) pokemon = unfilteredPokemon
    let pokefilter = []
    if(filter === 'API'){
        pokefilter = pokemon.filter(p => (typeof p.ID) === 'number' )
    } else{
        if(filter === 'DB'){
            pokefilter = pokemon.filter(p => (typeof p.ID) === 'string' )
        } else pokefilter = pokemon
    }
    return dispatch({type: FILTER_POKEMON, payload:pokefilter})
})}

export const filterPokemonByType = (type, pokemon, unfilteredPokemon) =>{
    return((dispatch)=>{
        if(pokemon !== unfilteredPokemon) pokemon = unfilteredPokemon
        let pokefilter = []
        if(type === 'allTypes'){
            pokefilter = unfilteredPokemon
        } else{
            pokefilter = pokemon.filter(p => p.type?
                p.type.includes(type)
                :p.types?p.types[0].name === type || (p.types[1] && p.types[1].name === type)
                :undefined)
        }
        return dispatch({type: FILTER_POKEMON_BY_TYPE, payload: pokefilter})
    })
}

export const getPokeById = (idPokemon) => {
    return async(dispatch) => {
        let res = await axios.get(`/pokemons/${idPokemon}`)
        return dispatch({type: GET_POKE_BY_ID, payload: res.data})
    }
}

export const refresh = () => {
    return async(dispatch) => {
        dispatch({type: 'REFRESH'})
    }
}

export const getPokeByName = (name) => {
    return async(dispatch) => {
        /* let poke = [] */
        /* let res = */ 
        await axios.get(`/pokemons?name=${name}`)
        .then(res=>{window.location.href=`/PokemonDetail/${res.data.ID}`})
/*         poke.push(res.data)
        return dispatch({type:GET_POKE_BY_NAME, payload: poke}) */
    }
}

export const createPokemon = (body) => {
    return async(dispatch) => {
        let res = await axios.post(`/pokemons`, body)
        return res
    }
}

export const getTypes = () => {
    return async(dispatch) => {
        let res = await axios.get('/types')
        return dispatch({type: GET_TYPES, payload: res.data})
    }
}


