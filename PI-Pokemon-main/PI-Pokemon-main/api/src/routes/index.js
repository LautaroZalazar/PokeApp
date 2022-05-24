const {Op} = require('sequelize')
const Axios = require('axios')

const { Router, response } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authR'ERR_HTTP_HEADERS_SENT'outer);

const {Pokemon, Types} = require('../db');

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
                type: pok.data.types.map(t => {return t.type.name})
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

const findPokeApi = async (attribute) => {
    let res = await Axios.get(`https://pokeapi.co/api/v2/pokemon/${attribute}`)
    if(res){let pokemon = {
            ID: res.data.id,
            nombre: res.data.name,
            vida: res.data.stats[0].base_stat,
            ataque: res.data.stats[1].base_stat,
            defensa: res.data.stats[2].base_stat,
            velocidad: res.data.stats[5].base_stat,
            altura: res.data.height,
            peso: res.data.weight,
            tipo: res.data.types.map(t =>{return t.type.name})
    }
    return pokemon
    }
    return false
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

const getTypes = async() => {
    try {
        let tipos = await Axios.get('https://pokeapi.co/api/v2/type')
        let arrTypes = tipos.data.results
        for(let i = 0; i < arrTypes.length; i++){
            let name = arrTypes[i].name
            await Types.create({
                name
            })
        }
    } catch (error) {
    }
}


router.get('/pokemons', async (req, res) => {
    const {name} = req.query
    try {
        if(name){
            let pokeDb = await findPokeDb(name)
            if(pokeDb) return res.json(pokeDb)

            let pokeApi = await findPokeApi(name)
            if(pokeApi) return res.json(pokeApi)
        }
        let pokeList = await allPokemon()
        res.status(200).json(pokeList)
    } catch (error) {
        res.status(404).json({error: "El pokemon con el nombre solicitado no existe"})
    }

})

router.get('/pokemons/:idPokemon', async (req, res) => {
    const {idPokemon} = req.params
    try {
        let pokeApi = await findPokeApi(idPokemon)
        if(pokeApi) return res.json(pokeApi)

        let pokeDB = await Pokemon.findByPk({
            where:{
                ID: idPokemon
            },
            includes:{
                model: Types,
                attributes: ['name'],
                through:{
                    attributes: []
                }
            }
        })
    } catch (error) {
        res.status(404).json({error: "El pokemon con el id solicitado no existe"})
    }
})

router.post('/pokemons', async(req, res) => {
    const {name, hp, attack, defense, speed, height, weight, types} = req.body
    try {
        let pokemon = await Pokemon.create({
            name,
            hp,
            attack,
            defense,
            speed,
            height,
            weight
        })
        // console.log("Soy el pokemon", pokemon)
        // console.log("Soy el type", type)
        // console.log("Soy el pokemon", pokemon)
        types.forEach(async element => {
            await pokemon.addType(element)
        });

        res.send({msg: "Pokemon creado"})
    } catch (error) {
        res.status(404).json({error: "El pokemon no pudo ser creado"})
    }
})

router.get('/types', async (req, res) => {
    try {
        await getTypes()
        let allTypes = await Types.findAll() //Llamo los tipos que tengo en mi base de datos
        res.json(allTypes)
    } catch (error) {
        res.status(404).json({error:"No se pudieron obtener los tipos de la base de datos"})
    }
})

module.exports = router;