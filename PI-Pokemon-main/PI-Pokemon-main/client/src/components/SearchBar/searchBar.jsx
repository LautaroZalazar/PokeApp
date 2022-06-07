import React, {useState} from "react";
import {connect} from 'react-redux'
import {getPokeByName} from '../../redux/actions/index'
import lupasb from '../../Resources/lupasb.png'
import './searchBar.css'

export function SearchBar(props){
    const [input, setInput] = useState({name:''})

    function handleSubmit(e){
        e.preventDefault()
        if(input.name) {
            props.getPokeByName(input.name)
        } else{
            if(!input.name) alert('Inserte un nombre')
        }
    }

    function handleChange(e){
        e.preventDefault()
        setInput({name: e.target.value})
    }

    return(
        <div className="sbStyle">
            <form onSubmit={(e)=>handleSubmit(e)}>
                <input className='sbInput' type="text" value={input.name} placeholder="Buscar pokemon" onChange={(e)=> handleChange(e)}/>
                <button className="sbButton" type="submit" onClick={e => handleSubmit(e)}><img className="lupeimg" src={lupasb} alt='lupe'></img></button>
            </form>
        </div>
    )
}

function mapStateToProps(state){
    return {pokemon: state.pokemon}
}

function mapDispatchToProps(dispatch){
    return {
        getPokeByName: name => dispatch(getPokeByName(name))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar)