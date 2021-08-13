const get = require('./getItineraries/getItineraries')
const post = require('./createItinerary/createItinerary')
const comment = require('./commentsItinerary/commentsItinerary')
const like = require('./likesItinerary/likesItinerary')
const checkUser = require('./checkUserItinerary/checkUserItinerary')

module.exports = {
	get,
	post,
	comment,
	like,
	checkUser
}