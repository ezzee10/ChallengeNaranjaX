const express = require ('express')
const cors = require('cors')
const conectarDB = require('./config/db')

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())

conectarDB()

const port = process.env.PORT || 4000

app.use('/api/cities', require('./routes/cities'))
app.use('/api/itineraries', require('./routes/itineraries'))

module.exports = {
	port,
	app
}