import { connect} from "react-redux";
import { getAllPokemon } from "../../redux/actions";
import { useEffect } from "react";
import PokemonCard from '../PokemonCard/pokemonCard'
import './pokemonCards.css'
import gif from '../../Resources/pikachu.gif'

export function PokemonCards(props){
    
    /* const [page, setPage] = useState(1) */

    const group = 12
    const finalPage = props.page * group
    const initialPage = finalPage - group

    const pokemon = props.pokemon.slice(initialPage, finalPage)

    useEffect(()=>{
        props.getAllPokemon()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if(props.page < 1) {
        props.setPage(1)
        return
    }

    if(props.page > 10) {
        props.setPage(10)
        return
    }
    return(
        <div>
            <div id="pokemonCards">
                {pokemon[0]? pokemon.map(p => 
                    <div className="PokeCardStyle" key={p.ID}>
                        <PokemonCard
                        idPokemon ={p.ID}
                        Name={p.name}
                        Image={p.image}
                        Type={p.type?p.type:p.types.map(t => (
                            t.name
                ))}
                        />
                    </div>
                ): (
                    <div>
                        <p className="loading">Cargando</p>
                        <img src={gif} alt="Loading"/>
                    </div>)}
            </div>
            <div className="Paginado">
                <button onClick={()=> props.setPage(props.page - 1)}> atras </button>
                <h3 className="Num">Page: {props.page}</h3>
                <button onClick={() => props.setPage(props.page + 1)}> adelante </button>
            </div>

        </div>
    )
}

function mapStateToProps(state){
    return {pokemon: state.pokemon,
        unfilteredPokemon: state.unfilteredPokemon}
}

function mapDispatchToProps(dispatch){
    return {
        getAllPokemon:() => dispatch(getAllPokemon())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PokemonCards)