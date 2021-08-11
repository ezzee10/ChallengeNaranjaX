const { Router } = require('../cases/userCase/userModule')
const router = new Router()
const { get, post } = require('../cases/userCase/userController')
const { checkDuplicateUser } = require('../middlewares/checkDuplicateEmail')
const { check } = require('express-validator')
const passport = require('../passport')

/* Get user by ID */
router.get('/:id', 
	passport.authenticate('jwt', {session: false}),
	get.getUserById
)

/* Register a new user */
router.post('/signup', 
	[   
		check('firstName', 'First name is required and cannot be empty').not().isEmpty(),
		check('lastName', 'Last name is required and cannot be empty').not().isEmpty(),
		check('email', 'Must be a valid email').isEmail(),
		check('password', 'The password must have a minimum of 6 characters').isLength({ min: 6 }),
		check('country', 'Country is required and cannot be empty').not().isEmpty(),
		checkDuplicateUser
	],
	post.signUp
)

/* Login user*/
router.post('/signin', 
	[
		check('email', 'Must be a valid email').isEmail(),
		check('password', 'Password cannot be empty').not().isEmpty()
	],
	post.signIn
)

module.exports = router
