const mongoose = require('mongoose');
require('dotenv').config({ path: '.env' });

const conectarDB = async () => {
    try {
        await mongoose.connect(process.env.DB_MONGO, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useUnifiedTopology: true
        });
        console.log('Conexión a MongoDB establecida');
    } catch (error) {
        console.log(error);
        process.exit(1); // Detener la app
    }
}

module.exports = conectarDB;