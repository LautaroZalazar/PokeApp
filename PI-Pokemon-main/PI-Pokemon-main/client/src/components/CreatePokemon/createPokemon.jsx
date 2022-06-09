import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getTypes, createPokemon } from "../../redux/actions";
import './createPokemon.css'

export function CreatePokemon(props){
  
    let allTypes = props.types

    const [input, setInput] = useState({
        name: '',
        hp: 0,
        attack: 0,
        defense: 0,
        speed: 0,
        height: 0,
        weight: 0,
        types: []
    })    

    const [errors, setErrors] = useState({})

    function validate(input){
        let errors = {};
        if(!input.name){
            errors.name = 'Se requiere un nombre!'
        }else if(input.name[0] === ' '){
            errors.name = 'El primer caracter no puede ser un espacio vacio'
        }else if(!input.hp){
        errors.hp = 'Se debe ingresar la vida del pokemon'
        } else if(input.hp < 0){
            errors.hp = 'La vida no puede ser negativa'
        } else if(!input.attack){
            errors.attack = 'Se debe ingresar el ataque del pokemon'
        } else if(input.attack < 0){
            errors.attack = 'El ataque no puede ser negativa'
        } else if(!input.defense){
            errors.defense = 'Se debe ingresar la defensa del pokemon'
        } else if(input.defense < 0){
            errors.defense = 'La defensa no puede ser negativa'
        } else if(!input.speed){
            errors.speed = 'Se debe ingresar la velocidad del pokemon'
        } else if(input.speed < 0){
            errors.speed = 'La velocidad no puede ser negativa'
        } else if(!input.height){
            errors.height = 'Se debe ingresar la altura del pokemon'
            } else if(input.height < 0){
            errors.height = 'La altura no puede ser negativa'
        } else if(!input.weight){
            errors.weight = 'Se debe ingresar el peso del pokemon'
            } else if(input.weight < 0){
            errors.weight = 'El peso no puede ser negativa'
        }
        return errors;
    }

    const [button, setButton] = useState({})

    useEffect(() => {
        input.name &&
        input.hp &&
        input.attack &&
        input.defense &&
        input.speed &&
        input.height &&
        input.weight ? 
        setButton(false) :
        setButton(true)
    },[input])    

    function handleDelete(el) {
      setInput({
        ...input,
        types: input.types.filter((t) => t !== el),
      })
    }
    function handleSelect(e) {
      setInput({
        ...input,
        types: [...input.types, e.target.value],
      });
    }

    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name]:  e.target.value 
        })
        setErrors(validate({
            ...input,
            [e.target.name]:  e.target.value 
        }))
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if(input.types.length > 0){
            if(input.types.length < 3){
                props.createPokemon(input)
                alert('Pokemon creado con éxito')
                setInput({
                    name: '',
                    hp: 0,
                    attack: 0,
                    defense: 0,
                    speed: 0,
                    height: 0,
                    weight: 0,
                    types: []        
                })
            } else alert("Se pueden ingresar máximo dos tipos")
        } else alert("Se requiere al menos un tipo")
    }

     useEffect(() => {
      props.getTypes();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); 

    return (
        <>
        <div className='contenedor'>
        <Link to='/home'>
            <button className="back">Home</button>
        </Link>
        <form className="form" onSubmit={(e) => handleSubmit(e)}>
            <h3 className="title">Create pokemon</h3>
                <div className="">
                    <label className='label'>Nombre</label>
                    <input type="text" 
                    value={input.name.toLowerCase()} 
                    onChange={(e) => handleChange(e)} 
                    name='name'/>
                    {errors.name &&(
                    <p>
                        {errors.name}
                    </p>
                    )}
                </div>
                <div>
                    <label className='label'>HP</label>
                    <input type="number" 
                    onChange={e => handleChange(e)} 
                    value={input.hp} 
                    name='hp'/>
                    {errors.hp &&(
                    <p>
                        {errors.hp}
                    </p>
                    )}
                </div>
                <div>
                    <label className='label'>Attack</label>
                    <input type="number" 
                    onChange={e => handleChange(e)} 
                    value={input.attack} 
                    name='attack'/>
                    {errors.attack &&(
                    <p>
                        {errors.attack}
                    </p>
                    )}
                </div>
                <div>
                    <label className='label'>Defense</label>
                    <input type="number" 
                    onChange={e => handleChange(e)} 
                    value={input.defense} 
                    name='defense'/>
                    {errors.defense &&(
                    <p>
                        {errors.defense}
                    </p>
                    )}
                </div>
                <div>
                    <label className='label'>Speed</label>
                    <input type="number" 
                    onChange={e => handleChange(e)} 
                    value={input.speed} 
                    name='speed'/>
                    {errors.speed &&(
                    <p>
                        {errors.speed}
                    </p>
                    )}
                </div>
                <div>
                    <label className='label'>Height</label>
                    <input type="number" 
                    onChange={e => handleChange(e)} 
                    value={input.height} 
                    name='height'/>
                    {errors.height &&(
                    <p>
                        {errors.height}
                    </p>
                    )}
                </div>
                <div>
                    <label className='label'>Weight</label>
                    <input type="number" 
                    onChange={e => handleChange(e)} 
                    value={input.weight} 
                    name='weight'/>
                    {errors.weight &&(
                    <p>
                        {errors.weight}
                    </p>
                    )}
                </div>
            <div>
            <div>
          <label className='label'>Types</label>
          <select className="select" onChange={(e) => handleSelect(e)}>
              <option hidden>Select almost one</option>
            {allTypes.map((t) => (
              <option key={t.ID} value={t.name}>
                {t.name}
              </option>
            ))}
          </select>
        </div>
        {input.types.map((t, index) => (
          <div key={index}>
            <p>{t}</p>
            <button type='button' className="create" onClick={() => handleDelete(t)}>
              X
            </button>
          </div>
        ))}
            </div>
            <button disabled={button} className="create" type="submit">Create</button>
        </form>
        </div>
        </>
    )
}



function mapStateToProps(state){
    return {
        types: state.types
    }
}

function mapDispatchToProps(dispatch){
    return{
        createPokemon: (body) => dispatch(createPokemon(body)),
        getTypes: () => dispatch(getTypes())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreatePokemon)