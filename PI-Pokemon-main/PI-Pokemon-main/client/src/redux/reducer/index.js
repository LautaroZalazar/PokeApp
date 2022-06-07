import {GET_ALL_POKEMON, GET_POKE_BY_ID, GET_POKE_BY_NAME, CREATE_POKEMON, GET_TYPES, ORDER_POKEMON, FILTER_POKEMON, FILTER_POKEMON_BY_TYPE, REFRESH} from '../actions'

const initialState = {
    pokemon: [],
    unfilteredPokemon: [],
    pokemonDetail: undefined,
    types: [],
}

const rootReducer = (state = initialState, action)=>{
    switch (action.type){
        case GET_ALL_POKEMON:{
            return ({...state, pokemon: action.payload, unfilteredPokemon: action.payload})
        }
        case ORDER_POKEMON:{
            return{...state, pokemon: action.payload}
        }
        case FILTER_POKEMON:{
            return{...state, pokemon: action.payload}
        }
        case FILTER_POKEMON_BY_TYPE:{
            return{...state, pokemon: action.payload}
        }
        case GET_POKE_BY_ID:{
            return ({...state, pokemonDetail: action.payload})
        }
        case REFRESH:{
            return({...state, pokemonDetail: undefined})
        }
        case GET_POKE_BY_NAME:{
            return ({...state, pokemon:action.payload})
        }
        case CREATE_POKEMON:{
            return{...state}
        }
        case GET_TYPES:{
            return({...state, types: action.payload})
        }
        default: return state
    }
}

export default rootReducer