const City = require('../database/models/cityModel')

const getAll = async () => await City.find()
const count = async () => await City.count()
const getOne = async id => await City.findById(id)
const getCityByName = async name => await City.findOne({ name })
const updateCity = async ( id, city ) => await City.findOneAndUpdate({ _id: id }, city, {new: true})
const deleteCity = async id  => await City.findByIdAndDelete(id)


module.exports = {
	count,
	getAll,
	getOne,
	getCityByName,
	updateCity,
	deleteCity
}