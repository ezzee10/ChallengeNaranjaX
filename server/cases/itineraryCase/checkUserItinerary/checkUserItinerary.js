const {response} = require('../itineraryModule')
const itineraryRepository = require('../../../repositories/itineraryRepository')

/* Check user by ID itinerarie*/
const checkUser = async (req, res = response) => {

	const { id: idItinerary } = req.params

	const { _id: userId } = req.user

	try {
		
		const itinerary = await itineraryRepository.getItineraryById(idItinerary)

		if (!itinerary) {
			return res.status(400).json({ ok: false, msg: 'No itinerary found' })
		}

		const arrayOwnerCheck = itinerary.comments.filter(comment => comment.userId.toString() === req.user._id.toString()).map(comment => comment._id)

		const likedChek = itinerary.usersLike?.includes(userId)

		return res.status(200).json({
			success: true,
			response: {
				arrayOwnerCheck,
				likedChek
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
	checkUser
}