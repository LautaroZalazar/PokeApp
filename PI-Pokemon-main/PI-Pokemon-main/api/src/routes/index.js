const {Op} = require('sequelize')
const Axios = require('axios')

const { Router, response } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const {Pokemon, Types} = require('../db');
const { default: axios } = require('axios');

const getPokes = async () => {
    try {
        let response = await Axios.get('https://pokeapi.co/api/v2/pokemon'+'?limit=40')
        let pokes = await Promise.all(response.data.results.map(async p => {
            let pok = await Axios.get(p.url)
            return {
                ID: pok.data.id,
                name: pok.data.name,
                hp: pok.data.stats[0].base_stat,
                attack: pok.data.stats[1].base_stat,
                defense: pok.data.stats[2].base_stat,
                speed: pok.data.stats[5].base_stat,
                height: pok.data.height,
                weight: pok.data.weight,
                type: pok.data.types.map(t => {t.type.name})
            }
        }))
        return pokes
    } catch (error) {
        return (error)
    }
}
const getPokesDb = async () => {
    let pokes = await Pokemon.findAll({
        includes:{
            model: Types,
            attributes: ['name'],
            through:{
                attributes: []
            }
        }
    })
    return pokes
}

const findPokeApi = async (name) => {
    let res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
    let pokemon = {
            ID: res.data.id,
            name: res.data.name,
            hp: res.data.stats[0].base_stat,
            attack: res.data.stats[1].base_stat,
            defense: res.data.stats[2].base_stat,
            speed: res.data.stats[5].base_stat,
            height: res.data.height,
            weight: res.data.weight,
            type: res.data.types.map(t => {t.type.name})
    }
    return pokemon
}

const findPokeDb = async(name) => {
    let res = await Pokemon.findOne({
        where: {
            name:{
                [Op.like]:`%${name}`
            }
        },
        includes:{
            model: Types,
            attributes: ['name'],
            through:{
                attributes: []
            }
        }
    })
    return res
}

const allPokemon = async() => {
    let pokesApi = await getPokes();
    let pokesDb = await getPokesDb();
    let pokeList = pokesApi.concat(pokesDb)
    return pokeList
}

router.get('/pokemons', async (req, res) => {
    const {name} = req.query

    try {
        if(name){
            
        }
    } catch (error) {
        
    }

})

router.get('/pokemons/:idPokemon', (req, res) => {
    const {idPokemon} = req.params
    let pokes = allPokemon()
    try {
        let pokemon = pokes.find(p => p.ID == idPokemon)
        res.json(pokemon)
    } catch (error) {
        res.status(404).json(error)
    }
})

router.post('/pokemons', async(req, res) => {
    try {
        await Pokemon.create(req.body)
        res.send({msg: "Pokemon creado"})
    } catch (error) {
        res.status(404).json(error)
    }
})

module.exports = router;