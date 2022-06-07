import SearchBar from "../SearchBar/searchBar"
import Filter from "../Filter/filter"
import Order from "../Order/order"
import { NavLink } from "react-router-dom"
import './navBar.css'

export default function NavBar(props){

    return(
        <div className="navBarContainer">
                <NavLink to={'/home'} className="homeClass">Home</NavLink>
                <NavLink to={'/CreatePokemon'} className='createClass'>Create Pokemon</NavLink>
            <div className="">
                <div className="orderClass">
                    <Order cont={props.cont} setCont={props.setCont}/>
                </div>
                <div className='filterClass'>
                    <Filter/>
                </div>
                <div className='sbClass'>
                    <SearchBar/>
                </div>
            </div>
        </div>
    )
}