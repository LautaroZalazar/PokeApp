<p align='left'>
    <img src='https://static.wixstatic.com/media/85087f_0d84cbeaeb824fca8f7ff18d7c9eaafd~mv2.png/v1/fill/w_160,h_30,al_c,q_85,usm_0.66_1.00_0.01/Logo_completo_Color_1PNG.webp' </img>
</p>

# Individual Project - Henry Pokemon

<p align="left">
  <img height="150" src="./pokemon.png" />
</p>

Landing Page: En la landin page se cuenta con una imagen de fondo y con un botón el cual nos da ingreso a la página. Comienza tu aventura!!!

<p align="center">
  <img src="./Landing.png">
</p>

Home: En home podemos encontrar una navBar, que nos permite ordenar, filtrar, buscar o dirigirnos hacia el creador de pokemon. Además se pueden ver las tarjetas de los pokémon.

<p align="center">
  <img src="./Home.png">
</p>

Detail: En detail se cuenta con la imagen del pokémon y a su alrededor todas su estadísiticas, como así también su tipo y ID.

<p align="center">
  <img src="./PokeDetail.png">
</p>

Form: En form podremos crear un pokémon a nuestro gusto.

<p align="center">
  <img src="./Form.png">
</p>

### Quick Start 

1. Fork the repository to have a copy of it in your accounts
2. Clone the repository on your computers to start working


Currently the required versions are:

 * __Node__: 12.18.3 or older
 * __NPM__: 6.14.16 or older

In `api` create a file called: `.env` that has the following form:

```
DB_USER=usuariodepostgres
DB_PASSWORD=passwordDePostgres
DB_HOST=localhost
```

Replace `postgresuser` and `postgrespassword` with your own credentials to connect to postgres

Additionally, it will be necessary to create a database called `pokemon` from psql

* Run the next commands in file root:

* npm install

* npm start

* Open http://localhost:3000 in your browser

The `client` content was created using: Create React App.


#### Credits:
- React
- Redux
- Express
- Sequelize - Postgres