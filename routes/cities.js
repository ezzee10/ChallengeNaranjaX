const express = require ('express')
const router = express.Router()
const City = require('../models/cityModel')

/* obtiene todas las ciudades */
router.get('/all', async (req, res) => {
	try {
		let cities = await City.find({})
		res.json({cities})
	} catch (e) {
		res.status(500).json('Error del servidor')
	}
})

/* crear una nueva ciudad */
router.post('/', async (req, res) => {

	const name = req.body.name

	//Reviso primero si ya hay una ciudad con ese nombre
	const city_bd = await City.findOne({ name })

	if(city_bd) {
		return res.status(400).json({ msg: 'Ya existe una ciudad con ese nombre' })
	}

	const newCity = new City({
		name: req.body.name,
		country: req.body.country,
		img:  req.body.img
	})

	try {
		const city = await newCity.save()
		res.send(city)
	} catch (e) {
		res.status(500).json('Error del servidor')
	}
})

module.exports = router
