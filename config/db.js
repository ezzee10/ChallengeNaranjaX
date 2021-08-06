const mongoose = require('mongoose')
require('dotenv').config({ path: '.env' })

const conectarDB = async () => {
	try {
		await mongoose.connect(process.env.DB_MONGO, {
			useNewUrlParser: true,
			useCreateIndex: true,
			useUnifiedTopology: true
		})
		console.log('Conexión a MongoDB establecida')
	} catch (error) {
		console.log('Conexión a MongoDB rechazada \n' + error)
	}
}

module.exports = conectarDB