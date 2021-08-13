const { User, response } = require('../userModule')
const { validationResult } = require('express-validator')
const userRepository = require('../../../repositories/userRepository')
const jwt = require('jsonwebtoken')

/* Register User*/

const signUp = async (req, res = response) =>  {

	let { firstName, lastName, email, password, userPic, country } = req.body

	//Check errorrs
	const errors = validationResult(req)
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() })
	}

	try {

		//Create a new user
		let newUser = new User({ 
			firstName, 
			lastName, 
			email, 
			password: await userRepository.encryptPassword(password), //Hash the password
			userPic, 
			country 
		})

		//Saving user in mongoDB
		let savedUser = await newUser.save()

		const {id: idNewUser, firstName: nameNewUser, userPic: picNewUser} = savedUser

		//Create a payload
		const payload = {
			id: idNewUser,
			email: nameNewUser,
			avatarPicture: picNewUser
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
						response: { token, userPic: picNewUser, firstName: firstName} 
					})
				}
			}
		)

	} catch (err) {
		res.status(500).json({
			success: false,
			message: 'An error occurred while creating a user',
			err
		})
	}
}

module.exports = {
	signUp
}