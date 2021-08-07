const mongoose = require('mongoose')

const userSchema = new mongoose.Schema ({

	firstName: { 
		type: String,
		required: true,
		trim: true,
	},
	lastName: { 
		type: String, 
		required: true ,
		trim: true
	},
	mail: {
		type: String,
		unique: true,
		required: true,
		trim: true
	},
	password: { 
		type: String, 
		required: true,
		trim: true
	},
	userPic: { 
		type: String, 
		required: true,
		trim: true
	},
	country: { 
		type: String, 
		required: true,
		trim: true
	}
})

module.exports = mongoose.model('User', userSchema)