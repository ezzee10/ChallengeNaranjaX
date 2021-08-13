const userRepository = require('../../../repositories/userRepository')
const jwt = require('jsonwebtoken')
const { response } = require('../userModule')
const { validationResult } = require('express-validator')


/* Login user */
const signIn = async (req, res = response) => {

	let { email, password } = req.body

	//Check errorrs
	const errors = validationResult(req)
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() })
	}

	try {

		const userFound = await userRepository.getUserByEmail(email)

		if (!userFound) return res.status(400).json({ message: 'Wrong email or password' }) 
	
		const matchPassword = await userRepository.comparePassword(password, userFound.password)

		if (!matchPassword)
			return res.status(401).json({ 		
				success: false,
				message: 'Invalid password',
				token: null
			})

		//Create a payload
		const payload = {
			id: userFound._id,
			email: userFound.email,
			avatarPicture: userFound.userPic
		}	
		
		const options = { expiresIn: 2592000 }

		// Sign the token
		jwt.sign( payload, process.env.SECRET_OR_KEY, options ,
			(err, token) => {
				if(err){
					res.json({
						success: false,
						response: 'There was an error'
					})
				}else {
					res.json({
						success: true,
						response: { token, userPic: userFound.userPic, firstName: userFound.firstName} 
					})
				}
			}
		)

	} catch (err) {
		return res.status(500).json({
			success: false,
			message: 'Failed to authenticate user',
			err
		})
	}
}

/*Login with LocalStorage*/
const signInLs = async (req, res = response) => {

	const { userPic, firstName } = req.user

	try {

		if (!req.user)
			return res.status(401).json({ 		
				success: false,
				message: 'Not info user',
			})
		
		return res.status(200).json({
			success: true,
			response: {
				userPic,
				firstName
			}
		})

	} catch (err) {
		return res.status(500).json({
			success: false,
			message: 'Failed to authenticate user',
			err
		})
	}
}


module.exports = {
	signIn,
	signInLs
}