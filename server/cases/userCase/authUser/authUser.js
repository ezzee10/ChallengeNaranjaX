const { User, response } = require('../userModule')
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const userRepository = require('../../../repositories/userRepository')

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

		res.status(201).json({
			success: true,
			message: 'The user was created successfully',
			response: savedUser
		})
	} catch (err) {
		res.status(500).json({
			success: false,
			message: 'An error occurred while creating a user',
			err
		})
	}
}

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
				ok: false,
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
		
		// Firmo el token
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
						response: { token } //Lo guardo como objeto ya que lo requiere el front en localStorage 
					})
				}
			}
		)
	} catch (err) {
		return res.status(500).json({
			ok: false,
			message: 'Failed to authenticate user',
			err
		})
	}
}


module.exports = {
	signUp,
	signIn
}