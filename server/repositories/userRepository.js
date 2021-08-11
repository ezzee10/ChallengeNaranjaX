const User = require('../database/models/userModel')
const bcrypt = require('bcryptjs')

const getAllUsers = async () => await User.find()
const getUserById = async id => await User.findById(id)
const getUserByEmail = async email => await User.findOne({ email })
const encryptPassword = async password => {
	return bcrypt.hashSync(password,  10)
} 
const comparePassword = async (password, receivedPassword) => {
	return await bcrypt.compare(password, receivedPassword)
}

module.exports = {
	getAllUsers,
	getUserById,
	getUserByEmail,
	encryptPassword,
	comparePassword
}