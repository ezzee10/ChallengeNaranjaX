const { City, response } = require('../cityModule')
const { validationResult } = require('express-validator')

const createCity = async (req, res = response) =>  {

	let { name, country, img } = req.body

	//Check errorrs
	const errors = validationResult(req)
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() })
	}

	const newCity = new City({ name, country, img })

	try {
		const city = await newCity.save()
		res.status(201).json({
			ok: true,
			message: 'The city was created successfully',
			response: city
		})
	} catch (err) {
		res.status(500).json({
			ok: false,
			message: 'Internal Server Error',
			err
		})
	}
}

module.exports  = {
	createCity
}
