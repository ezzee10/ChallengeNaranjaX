const Itinerary = require('../database/models/itineraryModel')

const getAllItineraries = async () => await Itinerary.find()
const countItineraries = async () => await Itinerary.count()
const getItinerariesByCity = async id => await Itinerary.find({cityId : id})

module.exports = {
	getAllItineraries,
	countItineraries,
	getItinerariesByCity,
}