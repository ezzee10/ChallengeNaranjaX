const { Router } = require('../cases/userCase/userModule')
const router = new Router()
const { get, login, register } = require('../cases/userCase/userController')
const { checkDuplicateUser } = require('../middlewares/checkDuplicateEmail')
const { check } = require('express-validator')
const passport = require('../passport')

/* Get users by ID */
router.get('/all', 
	passport.authenticate('jwt', {session: false}),
	get.getUsers
)

/* Register a new user */
router.post('/signup', 
	[   
		check('firstName', 'First name is required and cannot be empty').not().isEmpty(),
		check('lastName', 'Last name is required and cannot be empty').not().isEmpty(),
		check('email', 'Must be a valid email').isEmail(),
		check('password', 'The password must have a minimum of 6 characters').isLength({ min: 6 }),
		check('country', 'Country is required and cannot be empty').not().isEmpty(),
		check('userPic', 'UserPic is required and cannot be empty').not().isEmpty(),
		checkDuplicateUser
	],
	register.signUp
)

/* Login user*/
router.post('/signin', 
	[
		check('email', 'Must be a valid email').isEmail(),
		check('password', 'Password cannot be empty').not().isEmpty()
	],
	login.signIn
)

/* Login Ls*/ 
router.get('/signinls', passport.authenticate('jwt', {session: false}), login.signInLs)

module.exports = router
