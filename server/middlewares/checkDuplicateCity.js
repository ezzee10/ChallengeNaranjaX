const cityRepository = require('../repositories/cityRepository')

const checkDuplicateCity = async (req, res, next) => {

	let { name } = req.body

	try {
		const emailDb = await cityRepository.getCityByName(name)
		if (emailDb)
			return res.status(400).json({ 
				ok: false, 
				message: 'There is already a city with that name' 
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
	checkDuplicateCity
}