const get = require('./getCities/getCities')
const post = require('./createCity/createCity')
const put = require('./updateCity/updateCity')
const remove = require('./deleteCity/deleteCity')


module.exports = {
	get,
	post,
	put,
	remove
}