const {response} = require('../userModule')
const userRepository = require('../../../repositories/userRepository')

/* Get users */
const getUsers = async (req, res = response) => {

	try {
		const usersFound = await userRepository.getAllUsers()
  
		if(usersFound.length === 0){
			return res.status(400).json({
				ok:false,
				message: 'No registered users found'
			})
		}
    
		return res.status(200).json({
			ok: true,
			message: 'Users found',
			response: usersFound
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
	getUsers
}