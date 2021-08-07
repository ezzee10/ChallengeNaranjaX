const mongoose = require('mongoose')

const itinerarySchema = new mongoose.Schema ({

	title: { 
		type: String,
		required: true,
		trim: true,
	},
	img: { 
		type: String, 
		required: true,
		trim: true
	},
	activities: [{
		name: String,
		img: String
	}],
	authorName: { 
		type: String, 
		required: true,
		trim: true
	},
	authorPic: { 
		type: String, 
		required: true,
		trim: true
	},
	price: { 
		type: Number, 
		required: true,
		min: 1,
		max: 5,
		trim: true
	},
	duration: { 
		type: Number, 
		required: true,
		min: 1,
		trim: true
	},
	likes: { 
		type: Number, 
		default: 0,
		trim: true,
	},
	hashtags : [String],
	usersLike: [String],
	comments:[{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User'
		},
		text: String,
		userName: String,
		userPic: String
	}],
	cityId: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: 'City'
	}
})

module.exports = mongoose.model('Itinerary', itinerarySchema)