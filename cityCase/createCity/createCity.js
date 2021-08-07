const { City, response } = require('../cityModule')

const createCity = async (req, res = response) =>  {

	let { name, country, img }  = req.body

	//Reviso primero si ya existe una ciudad con ese nombre
	const cityDb = await City.findOne({ name })

	if(cityDb) {
		return res.status(400).json({ msg: 'Ya existe una ciudad con ese nombre' })
	}

	const newCity = new City({
		name: name,
		country: country,
		img:  img
	})

	try {
		const city = await newCity.save()
		res.send(201).json({
			ok: true,
			message: 'La ciudad se creó correctamente',
			city
		})
	} catch (err) {
		res.status(500).json({
			ok: false,
			message: 'Error al crear una nueva ciudad',
			err
		})
	}
}

module.exports  = {
	createCity
}
