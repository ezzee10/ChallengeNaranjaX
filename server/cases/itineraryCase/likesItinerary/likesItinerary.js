const itineraryModel = require('../../../database/models/itineraryModel')
const {response} = require('../itineraryModule')

/*Like itinerary */
const likeItinerary = async (req, res = response) => {

	const { id: idItinerary } = req.params

	const { _id: idUser } = req.user

	try {
		
		const itinerary = await itineraryModel.findOne({'_id': idItinerary, 'usersLike': idUser})
		
		const action = itinerary ? '$pull' : '$push'

		const liked = itinerary ? false : true

		const itineraryWithLiked = await itineraryModel.findOneAndUpdate({ '_id': idItinerary }, { [action]: { 'usersLike': idUser } }, { new: true })

		let amountLikes = parseInt(itineraryWithLiked.likes)

		const itineraryFinish = await itineraryModel.findOneAndUpdate({ '_id': idItinerary }, { $set: { 'likes': amountLikes += liked ? 1 : -1 }}, { new: true })


		return res.status(200).json({
			success: true,
			message: 'Likes',
			response: {
				likes: itineraryFinish.likes,
				liked
			}
		})  
  
	} catch (err) {
		res.status(500).json({
			ok:false,
			message: 'Internal Server Error',
			err
		})
	}
}

module.exports = {
	likeItinerary
}