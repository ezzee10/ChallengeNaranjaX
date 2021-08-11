const {response} = require('../userModule')
const userRepository = require('../../../repositories/userRepository')

/* Get info user by email */
const getUserById = async (req, res = response) => {

	const { id } = req.params
  
	try {
		const userFound = await userRepository.getUserById(id)
  
		if(!userFound){
			return res.status(400).json({
				ok:false,
				message: 'The user is not found'
			})
		}
    
		return res.status(200).json({
			ok: true,
			message: 'User found',
			response: userFound
		})  
  
	} catch (err) {
		return res.status(500).json({
			ok:false,
			message: 'Internal Server Error',
			err
		})
	}
}

module.exports = {
	getUserById
}