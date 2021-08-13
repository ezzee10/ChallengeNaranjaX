const bcrypt = require('bcryptjs')

const encryptPassword = async password => { 
	return bcrypt.hashSync(password,  10)
}

module.exports = {
	encryptPassword
}