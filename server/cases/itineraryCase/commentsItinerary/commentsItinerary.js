const { response } = require('../itineraryModule')
const itineraryRepository = require('../../../repositories/itineraryRepository')

/* Add new comment in itinerary */
const createComment = async (req, res = response) => { 

	const { id: idItinerary } = req.params

	const { _id: userId, firstName, lastName, userPic } = req.user

	const { text } = req.body

	try {

		const userName = firstName + '' + lastName

		const itineraryUpdate = await itineraryRepository.createComment(idItinerary, userId, userName, userPic, text)

		let arrayOwnerCheck = itineraryUpdate.comments.map(comment => {
			if(comment.userId.toString() === userId.toString()) {
				return comment._id
			}
		})

		return res.status(200).json({
			success: true,
			response: itineraryUpdate?.comments, arrayOwnerCheck
		}) 

	}catch (err) {
		return res.status(500).json({
			ok:false,
			message: 'Internal Server Error',
			err
		})
	}
}

/* Edit comment */
const updateComment = async (req, res = response) => {

	const { id: idComment } = req.params

	const { _id: idUser } = req.user

	const { text } = req.body

	try {
		const itinerary = await itineraryRepository.getItineraryComment(idComment, idUser)
		
		if (!itinerary) {

			return res.status(401).json({
				success:false,
				message: 'Itinerary not found',
			})

		}
			
		const newCommentItinerarie = await itineraryRepository.updateCommentItinerary(idComment, text)

		return res.status(200).json({
			success: true,
			message: 'Comments',
			response: newCommentItinerarie.comments
		}) 

	} catch (err) {
		return res.status(500).json({
			success: false,
			message: 'Internal Server Error',
			err
		})
	}
}

/* Delete comment */
const deleteComment = async (req, res = response) => {

	const { id } = req.params

	const { _id } = req.user

	try {

		const itinerary = await itineraryRepository.getItineraryComment(id, _id)
		
		if (!itinerary) {

			return res.status(401).json({
				success:false,
				message: 'Itinerary not found',
			})

		}

		const commentItinerarie = await itineraryRepository.updateAndDelete(id)

		return res.status(200).json({
			success: true,
			response: commentItinerarie.comments
		}) 

	} catch (err) {
		return res.status(500).json({
			success: false,
			message: 'Internal Server Error',
			err
		})
	}
}

module.exports = {
	createComment,
	updateComment,
	deleteComment
}