const { City, response } = require('../cityModule')
const cityRepository = require('../../repositories/cityRepository')

const createCity = async (req, res = response) =>  {

	let { name, country, img } = req.body

	//Reviso primero si ya existe una ciudad con ese nombre
	const cityDb = await cityRepository.getCityByName( name )

	if(cityDb) {
		return res.status(400).json({ 
			ok: false,
			message: 'There is already a city with that name' 
		})
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
