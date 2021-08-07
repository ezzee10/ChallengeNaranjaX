const mongoose = require('mongoose')
require('dotenv').config({ path: '.env' })

const conectarDB = async () => {
	try {
		await mongoose.connect(process.env.DB_MONGO, {
			useNewUrlParser: true,
			useCreateIndex: true,
			useUnifiedTopology: true
		})
		console.log('Conexión con BD establecida')
	} catch (error) {
		console.log('Conexión con BD rechazada \n' + error)
	}
}

module.exports = conectarDB