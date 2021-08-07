const User = require('../database/models/User')

const getAllUsers = async () => await User.find()
const getUserById = async id => await User.findById(id)
const getUserByEmail = async email => await User.find({email: email})

module.exports = {
	getAllUsers,
	getUserById,
	getUserByEmail
}