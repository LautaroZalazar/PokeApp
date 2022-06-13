import NavBar from '../Nav/navBar'
import PokemonCards from '../PokemonCards/pokemonCards'
import igIcon from '../../Resources/logo-instagram.svg'
import twIcon from '../../Resources/logo-twitter.svg'
import fbIcon from '../../Resources/logo-facebook.svg'
import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { getTypes, refresh } from '../../redux/actions'
import './home.css'

export function Home(props){

    const [cont, setCont] = useState(0)
    const [page, setPage] = useState(1)

    useEffect(()=>{
        props.refresh()
        props.getTypes()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    return (
        <div className='homeContainer'>
                {<NavBar cont={cont} setCont={setCont} setPage={setPage}/>}
                <h1 className='titleHome'> Pokedex </h1>
                <div>
                    {<PokemonCards cont={cont} page={page} setPage={setPage}/>}
                </div>
            <footer className='footer'>
                <a href="https://www.instagram.com/pokemon/" target="_blank" rel="noreferrer"> <img src={igIcon} alt='ig icon' className='img' /> </a>
                <a href="https://twitter.com/Pokemon" target="_blank" rel="noreferrer"> <img src={twIcon} alt='tw icon' className='img' /> </a>
                <a href="https://www.facebook.com/PokemonOficialLatAm/?brand_redir=230809307041021" target="_blank" rel="noreferrer"> <img src={fbIcon} alt='fb logo' className='img' /> </a>
                </footer>
        </div>
    )
}

function mapStateToProps(state){
    return {
        types: state.types
    }
}

function mapDispatchToProps(dispatch){
    return{
        getTypes: () => dispatch(getTypes()),
        refresh: () => dispatch(refresh())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)