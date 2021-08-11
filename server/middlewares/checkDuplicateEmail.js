const userRepository = require('../repositories/userRepository')

const checkDuplicateUser = async (req, res, next) => {

	let { email } = req.body

	try {
		const emailDb = await userRepository.getUserByEmail(email)
		if (emailDb)
			return res.status(400).json({ 
				ok: false, 
				message: 'The email already exists' 
			})
		next()
	} catch (err) {
		res.status(500).json({ 
			ok: false,
			message: err 
		})
	}
}

module.exports = {
	checkDuplicateUser
}