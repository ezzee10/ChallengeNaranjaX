const express = require ("express");
const cors = require("cors");
const conectarDB = require("./config/db");

const app = express();

app.use(express.json({ extended: true }));

app.use(cors());

conectarDB();

const port = process.env.PORT || 5000;

app.use('/cities', require('./routes/cities'));

app.listen (port, () => {

 console.log ("El servidor se está ejecutando en el puerto " + port);

});