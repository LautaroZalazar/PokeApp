import { connect } from "react-redux"
import { filterPokemon, filterPokemonByType } from "../../redux/actions"
import './filter.css'

export function Filter(props){

    let allTypes = props.types

    const handleFilter = (e) => {
        props.filterPokemon(e.target.value, props.pokemon, props.unfilteredPokemon)
    }

    const handleFilterTwo = (e) => {
        props.filterPokemonByType(e.target.value, props.pokemon, props.unfilteredPokemon)
    }

    return(
        <div className="filterStyle">
            <div className="filterBox">
                <label >Filtros</label>
                <select name= "Filtros" onChange={e => handleFilter(e)}>
                    <option hidden>Filter</option>
                    <option value="">All pokemon</option>
                    <option value="API">Pokemon PokeApi</option>
                    <option value="DB">Pokemon creados</option>
                </select>
            </div>
            <div className="filterBox">
                <label>Filtrar por tipo</label>
                {<select name="FiltrarPorTipo" onChange={e => handleFilterTwo(e)}>
                    <option hidden>Types</option>
                    <option value="allTypes">All types</option>
                {allTypes?.map(t => {
                    return(
                        <option key={t.ID} value={t.name}>{t.name}</option>
                        )})}
                </select>}
            </div>
        </div>
    )
}

function mapStateToProps(state){
    return{
        pokemon: state.pokemon,
        unfilteredPokemon: state.unfilteredPokemon,
        types: state.types
    }
}

function mapDispatchToProps(dispatch){
    return{
        filterPokemon:(filter, pokemon, unfilteredPokemon) => dispatch(filterPokemon(filter, pokemon, unfilteredPokemon)),
        filterPokemonByType: (type, pokemon, unfilteredPokemon) => dispatch(filterPokemonByType(type, pokemon, unfilteredPokemon))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Filter)