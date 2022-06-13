import React from "react";
import { connect } from "react-redux";
import { orderPokemon} from "../../redux/actions/index"
import './order.css'

export function Order(props){
    
    function handleOrder(e){
        props.orderPokemon(e.target.value, props.pokemon)
        props.setCont(props.cont + 1)
        props.setPage(1)
    }

    return(
        <div className="orderStyle">
            <label>Orden</label>
            <select name= "Orden" onChange={e => handleOrder(e)}>
                <option hidden>Order</option>
                <option value="">Default</option>
                <option value="ASCALF">A-Z</option>
                <option value="DESALF">Z-A</option>
                <option value="FASD">Fuerza ascendente</option>
                <option value="FDES">Fuerza descendente</option>
            </select>
        </div>
    )
}

function mapStateToProps(state){
    return {pokemon: state.pokemon}
}

function mapDispatchToProps(dispatch){
    return {
        orderPokemon: (order, pokemon) => dispatch(orderPokemon(order, pokemon)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Order)