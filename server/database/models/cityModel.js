const mongoose = require('mongoose')

const citySchema = new mongoose.Schema ({

	name: { 
		type: String,
		unique: true, 
		required: true,
		trim: true,
	},
	country: { 
		type: String, 
		required: true ,
		trim: true
	},
	img: { 
		type: String, 
		required: true,
		trim: true
	},
})

module.exports = mongoose.model('City', citySchema)