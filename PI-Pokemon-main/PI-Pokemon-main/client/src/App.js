import React from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import './App.css';

import Home from './components/Home/home.jsx'
import LandingPage from './components/LandingPage/landingPage.jsx'
import PokemonDetail from './components/PokemonDetail/pokemonDetail.jsx'
import CreatePokemon from './components/CreatePokemon/createPokemon.jsx'


export default function App() {
  return (
    <Router>
        <Routes>
          <Route exact path= '/' element={<LandingPage/>}/>
          <Route path= '/home' element={<Home/>}/>
          <Route path= '/CreatePokemon' element={<CreatePokemon/>}/>
          <Route path= '/PokemonDetail/:idPokemon' element={<PokemonDetail/>}/>
        </Routes>
    </Router>
  );
}
