const { Itinerary, response } = require('../itineraryModule')

const createItinerary = async (req, res = response) =>  {

	let body = req.body

	const newItinerary = new Itinerary(body)

	try {
		const itinerary = await newItinerary.save()
		res.status(201).json({
			ok: true,
			message: 'The itinerary was created correctlyy',
			response: itinerary
		})
	} catch (err) {
		res.status(500).json({
			ok: false,
			message: 'Internal Server Error',
			err
		})
	}
}

module.exports  = {
	createItinerary
}