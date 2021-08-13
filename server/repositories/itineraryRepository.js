const Itinerary = require('../database/models/itineraryModel')

const getAllItineraries = async () => await Itinerary.find()
const countItineraries = async () => await Itinerary.count()
const getItinerariesByCity = async id => await Itinerary.find({cityId : id})
const getItineraryById = async id => await Itinerary.findOne({_id: id})
const updateCommentItinerary = async (id, text) => await Itinerary.findOneAndUpdate({'comments._id': id}, {
	$set: { 'comments.$.text': text } } , { new : true })
const getItineraryComment = async (idComment, idUser) => await Itinerary.findOne({'comments._id': idComment, 'comments.userId': idUser})
const createComment = async (idItinerary, userId, userName, userPic, text) => await Itinerary.findOneAndUpdate({_id: idItinerary}, {
	$push: { comments: { userId , userName, userPic, text}}}, {new :true})
const updateAndDelete = async idComment => await Itinerary.findOneAndUpdate({'comments._id': idComment}, {
	$pull: { 'comments': {'_id' : idComment } } }, {new : true})


module.exports = {
	getAllItineraries,
	countItineraries,
	getItinerariesByCity,
	getItineraryById,
	updateCommentItinerary,
	getItineraryComment,
	createComment,
	updateAndDelete
}